// good

class DirectionInput {
    constructor() {
        this.heldDirections = [];

        // mapping the movement keys to more friendly values
        this.map = {
            "ArrowUp": "Up",
            "KeyW": "Up",
            "ArrowLeft": "Left",
            "KeyA": "Left",
            "ArrowDown": "Down",
            "KeyS": "Down",
            "ArrowRight": "Right",
            "KeyD": "Right"

        }

    }

    // get method for the primary direction 
    get direction() {
        return this.heldDirections[0];
    }

    init() {
        // listens for a key to be pressed, passes it into a function
        document.addEventListener("keydown", e => {
            
        // translates the keydown to the map array defined above
        const dir = this.map[e.code];
        // if dir has a value AND that value isn't in the array, add it to directions currently held
        if (dir && this.heldDirections.indexOf(dir) === -1) {
            this.heldDirections.unshift(dir);
        }
        });

        // listens for key up, translates to mapped value, finds it's index if present in the held array, 
        // removes it from array if present
        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
        })
    }
}