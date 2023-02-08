class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "Down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "./Characters/MC/MCSheet.png"
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;

    }

    mount(map){
        console.log("mounting");
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // if behavior, start it with a delay
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10)

    }

    update() {

    }

    // this is an async function. it has an await event inside
    // await pauses function behavior until the await event is finished
    async doBehaviorEvent(map) {

        // short circuit if higher priority event is happening, or no behavior is passed in
        // is standing is also criteria because we don't want the event instance to fire its loop if they
        // are just standing
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding)    {
            return;
        }

        // giving event necessary attributes
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // create event instance
        const eventHandler = new OverworldEvent({ map, event: eventConfig});
        await eventHandler.init();

        // setting next event to fire
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        //recursion
        this.doBehaviorEvent(map);

    }

}