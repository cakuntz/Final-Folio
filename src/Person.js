
class Person extends GameObject {
    constructor(config){
        super(config);
        this.movingProgressRemaining = 0;
        this.isStanding = false;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "Up": ["y", -2],
            "Left": ["x", -2],
            "Down": ["y", 2],
            "Right": ["x", 2],
        }
    }
        
    update(state) {
        if(this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {

            // Insert more cases for movement start

            // case: no cutscene AND player can input AND movement key is pressed
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow){
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
        this.updateSprite(state);
        }
    }

    startBehavior(state, behavior) {

        // set char direction to passed in behavior
        this.direction = behavior.direction;
        if(behavior.type === "walk") {

            // Break loop if space is taken
            if(state.map.isSpaceTaken(this.x, this.y, this.direction)) {

                // if behavior retry flag is up, start behavior again
                behavior.retry && setTimeout(() => {
                    this.startBehavior(state, behavior);
                }, 10)

                return;
            }

        // commence walk and reserve movement space via wall
        state.map.moveWall(this.x, this.y, this.direction);
        this.movingProgressRemaining = 32;
        this.updateSprite(state);
        }

        if(behavior.type === "stand") {
            this.isStanding = true;
            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", {
                    whoId: this.id
                })
                this.isStanding = false;
            }, behavior.time)
        }

    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 2;

        if (this.movingProgressRemaining === 0) {
            // walking finished
            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            })
        }
        
    }

     updateSprite() {

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk"+this.direction)
            return;
        }
        this.sprite.setAnimation("idle"+this.direction);

    }
    
}

