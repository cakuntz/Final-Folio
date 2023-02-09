class OverworldEvent {
    constructor({map, event}) {
        this.map = map;
        this.event = event;
    }

    // pass in resolver to tell handler that the event has finished
    // used especially for the async-await functions
    stand(resolve) {
        const who = this.map.gameObjects[ this.event.who];
        who.startBehavior({map: this.map}, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        const completeHandler = e => {
            // making sure the right person called complete
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonStandComplete", completeHandler)
    }

    walk(resolve){
        const who = this.map.gameObjects[ this.event.who];
        who.startBehavior({map: this.map}, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        const completeHandler = e => {
            // making sure the right person called complete
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)

    }

    textMessage(resolve) {

        if (this.event.faceMC) {
            const obj = this.map.gameObjects[this.event.faceMC];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["MC"].direction);
        }

        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve()
        })
        message.init(document.querySelector(".game-container"))
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }

}