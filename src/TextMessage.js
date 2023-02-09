class TextMessage {
    constructor({text, onComplete}) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement() {
        // making the div
        this.element = document.createElement("div");

        // a standard that the added class matches the class name
        this.element.classList.add("TextMessage");

        // contents of the element are some paragraph of text then a next button
        // BEM style class naming: ComponentName_componentFunction
        this.element.innerHTML = (`
            <p class="TextMessage_p">${this.text}</p>
            <button class="TextMessage_button">Next</button>
        `)

        // Listens in the button for a click event
        this.element.querySelector("button").addEventListener("click", () => {
            // close text
            this.done();
        });

        this.actionListener = new KeypressListener("Enter", () => {
            this.actionListener.unbind();
            this.done();
        })
    }

    done() {
        this.element.remove();
        this.onComplete();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }

}