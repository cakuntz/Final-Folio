class Person extends GameObject {
    constructor(config){
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "Up": ["y", -1],
            "Left": ["x", -1],
            "Down": ["y", 1],
            "Right": ["x", 1],
        }
    }
        
    update(state) {
        this.updatePosition();
        this.updateSprite(state);

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow){
            this.direction = state.arrow;
            this.movingProgressRemaining = 32;
        }
    }

    updatePosition() {
        if(this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }

     updateSprite(state) {
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow){
            this.sprite.setAnimation("idle"+this.direction);
            return;
        }

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk"+this.direction)
        }
    }
    
}

