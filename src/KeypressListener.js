// class that listens for keypresses, and tools for tuning input

class KeypressListener {
    constructor(keyCode, callback) {
        // check bool to ensure no rapid firing by continuous depression of keys
        let keySafe = true;
        // keydown function
        this.keydownfunction = function(event) {
            if (event.code === keyCode) {
                if (keySafe) {
                    keySafe = false;
                    callback();
                }
            }
        };

        // keyword this is important so that it may be unbound later
        this.keyupFunction = function(event) {
            if (event.code === keyCode) {
                keySafe = true;
            }
        };

        document.addEventListener("keydown", this.keydownfunction);
        document.addEventListener("keyup", this.keyupfunction);

        
        }

    unbind() {
        document.removeEventListener("keydown", this.keydownfunction);
        document.removeEventListener("keyup", this.keyupfunction);
    }
}