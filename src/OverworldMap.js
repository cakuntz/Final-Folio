
class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        // base layer
        this.underImage = new Image();
        this.underImage.src = config.underSrc;

        // foreground layer
        this.overImage = new Image();
        this.overImage.src = config.overSrc;

        this.isCutscenePlaying = false;
    }

    drawUnderImage(ct, cameraPerson) {
        ct.drawImage(this.underImage, utils.withGrid(11.5) - cameraPerson.x,  utils.withGrid(5.75) - cameraPerson.y)
    }

    drawOverImage(ct, cameraPerson) {
        ct.drawImage(this.overImage,  utils.withGrid(11.5) - cameraPerson.x,  utils.withGrid(5.75) - cameraPerson.y)
    }

    isSpaceTaken(currX, currY, direction) {
        const {x,y} = utils.nextPosition(currX, currY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {
            
            let object = this.gameObjects[key];
            object.id = key;

            //TODO: determine if mount should happen
            

            object.mount(this);
        })
    }

    // again, this is an async - await function
    async startCutscene(events) {
        this.isCutscenePlaying = true;

        // start loop of async events
        for (let i=0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;

        // reset NPCs
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))

    }

    checkForActionCutscene() {
        const MC = this.gameObjects["MC"];
        const nextCoords = utils.nextPosition(MC.x, MC.y, MC.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
    }

    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x,y) {
        delete this.walls[`${x},${y}`];
    }

    moveWall(prevX, prevY, direction) {
        this.removeWall(prevX, prevY, direction);
        const {x,y} = utils.nextPosition(prevX,prevY, direction);
        this.addWall(x,y);
    }

}

window.OverworldMaps = {
    DemoRoom: {
        underSrc: "./Maps/Demo/DemoRoom.png",
        overSrc: "./Maps/Demo/DemoRoomFG.png",
        gameObjects: {
            MC: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                isPlayerControlled: true,
                src: "./Characters/MC/MCIdleWalk.png"
            }),
            npc1: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(4),
                src: "./Characters/MC/MCIdleWalk.png",
                behaviorLoop: [
                    { type: "stand", direction: "Left", time: 700},
                    { type: "stand", direction: "Up", time: 1100},
                    { type: "stand", direction: "Right", time: 500},
                    { type: "stand", direction: "Up", time: 100},
                ],
                talking: [{
                    events: [
                        { type: "textMessage", text: "HOLY S***, IS THAT ME?!?!", faceMC: "npc1"},
                        { type: "textMessage", text: "ohgodohgodohgodohgodohgodohgod..."},
                        { who: "MC", type: "walk", direction: "Right"}
                    ]
                }]
            }),
            // npc2: new Person({
            //     x: utils.withGrid(7),
            //     y: utils.withGrid(4),
            //     src: "./Characters/MC/MCIdleWalk.png",
            //     behaviorLoop: [
            //         { type: "walk", direction: "Left"},
            //         { type: "stand", direction: "Up", time: 800 },
            //         { type: "walk", direction: "Up"},
            //         { type: "walk", direction: "Right"},
            //         { type: "walk", direction: "Down"},
            //     ]
            // })
        },
        walls: {
            // these are denoted as dynamic keys
            // if you don't know the exact value of what you're putting in, use this notation
            [utils.asGridCoord(4,1)] : true,
            [utils.asGridCoord(5,1)] : true,
            [utils.asGridCoord(6,1)] : true,
            [utils.asGridCoord(7,1)] : true,
            [utils.asGridCoord(8,1)] : true,
        }
    },

    Pregen: {
        underSrc: "./Maps/Pregen Home/PregenBG.png",
        overSrc: "./Maps/Pregen Home/PregenFG.png",
        gameObjects: {
            MC: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(3),
                src: "./Characters/MC/MCIdleWalk.png"
            }),
            npc1: new GameObject({
                x: utils.withGrid(10),
                y: utils.withGrid(5),
                src: "./Characters/MC/MCIdleWalk.png"
            }),
            npc2: new GameObject({
                x: utils.withGrid(7),
                y: utils.withGrid(4),
                src: "./Characters/MC/MCIdleWalk.png"
            })
        }
    }
}


