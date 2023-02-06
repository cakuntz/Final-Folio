class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        // base layer
        this.underImage = new Image();
        this.underImage.src = config.underSrc;

        // foreground layer
        this.overImage = new Image();
        this.overImage.src = config.overSrc;
    }

    drawUnderImage(ct, cameraPerson) {
        ct.drawImage(this.underImage, utils.withGrid(11.5) - cameraPerson.x,  utils.withGrid(5.75) - cameraPerson.y)
    }

    drawOverImage(ct, cameraPerson) {
        ct.drawImage(this.overImage,  utils.withGrid(11.5) - cameraPerson.x,  utils.withGrid(5.75) - cameraPerson.y)
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
                src: "./Characters/MC/MCIdleWalk.png"
            })
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


