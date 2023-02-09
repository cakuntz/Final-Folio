
const utils = {
    withGrid(n) {
        return n * 32;
    },

    // this is set up to be safe with negative numbers. 
    // comma is delim
    asGridCoord(x,y) {
        return `${x*32},${y*32}`
    },

    nextPosition(initX, initY, direction) {
        let x = initX;
        let y = initY;
        const size = 32;
        if (direction === "Up") {
            y -= size;
        } else if (direction === "Left") {
            x -= size;
        } else if (direction === "Down") {
            y += size;
        } else if (direction === "Right") {
            x += size;
        }
        return {x,y};
    },

    oppositeDirection(direction) {
        if (direction === "Up") { return "Down"};
        if (direction === "Left") { return "Right"};
        if (direction === "Down") { return "Up"};
        return "Left";
    },

    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
            detail
        });
        document.dispatchEvent(event);
    }



};



