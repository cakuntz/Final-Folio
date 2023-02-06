class Sprite {
    constructor(config) {

        // set up image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        // shadow
        this.shadow = new Image();
        this.useShadow = true;
        if (this.useShadow) {
            this.shadow.src = "./Characters/MC/shadow.png"
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        // configure initial state of animation
        this.animations = config.animations || {
            "idleUp": [
                [6,0], [7,0], [8,0], [9,0], [10,0], [11,0]
            ],

            "idleLeft": [
                [12,0], [13,0], [14,0], [15,0], [16,0], [17,0]
            ],

            "idleDown": [
                [18,0], [19,0], [20,0], [21,0], [22,0], [23,0]
            ],

            "idleRight": [
                [0,0], [1,0], [2,0], [3,0], [4,0], [5,0]
            ],

            "walkUp": [
                [6,1], [7,1], [8,1], [9,1], [10,1], [11,1]
            ],
            
            "walkLeft": [
                [12,1], [13,1], [14,1], [15,1], [16,1], [17,1]
            ],
            
            "walkDown": [
                [18,1], [19,1], [20,1], [21,1], [22,1], [23,1]
            ],
            
            "walkRight": [
                [0,1], [1,1], [2,1], [3,1], [4,1], [5,1]
            ]



        }
        this.currentAnimation =  "idleDown"; //config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        // these lines (specifically the default value) control speed of animations
        this.animationFrameLimit = config.animationFrameLimit || 16;
        this.animationFrameProgress = this.animationFrameLimit;

        // ref the gameObject
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation] [this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        } 
    }

    updateAnimationProgress() {
        // decrease frame progress if greater than zero, do nothing else
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        //reset counter,add one because subtraction happens first
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;
        
        // comparing to undefined as frame limit to handle different frame counts
        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }

    }

    draw(ct, cameraPerson) {
        const x = this.gameObject.x + utils.withGrid(11.5) - cameraPerson.x;
        const y = this.gameObject.y+ utils.withGrid(5.75) - cameraPerson.y;

        if(this.isShadowLoaded){ ct.drawImage(
            this.shadow, x, y+1  
        )}

        // this is known as destructuring
        const [frameX, frameY] = this.frame;

        if(this.isLoaded){ ct.drawImage(this.image,
            frameX * 32, frameY* 64,
            32, 64,
            x, y,
            32, 64);
        }
        this.updateAnimationProgress();
    }
}