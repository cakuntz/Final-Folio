class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ct = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

            // clear the canvas of old image
            this.ct.clearRect(0,0, this.canvas.width, this.canvas.height);

            // declare camera person
            const cameraPerson = this.map.gameObjects.MC;

            // update all objects before the character
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })

            // draw the base image
            this.map.drawUnderImage(this.ct, cameraPerson);

            // draw all objects
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ct, cameraPerson);
            })

            //draw the FG
            this.map.drawOverImage(this.ct, cameraPerson);

            // take step when animation frame recieved
            requestAnimationFrame(() => {
                step();
            })
        }
    step();
}

    bindActionInput() {
        new KeypressListener("Enter", () => {
            this.map.checkForActionCutscene()
        })
    }

    init() {

        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();

        this.bindActionInput();

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();

        //this.map.startCutscene([
            //{type: "textMessage", text: "WAKEUPWAKEUPWAKEUP"}
            // {who: "MC", type: "walk", direction: "Left"},
            // {who: "MC", type: "walk", direction: "Left"},
            // {who: "MC", type: "walk", direction: "Left"},
            // {who: "npc1", type: "walk", direction: "Left"},
            // {who: "npc1", type: "stand", direction: "Up", time: 800}
        //])
    }
}