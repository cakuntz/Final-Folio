class TextMessage {
    constructor({text, onComplete}) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    createElement() {
        this.element = document.createElement("div");

        // a standard that the added class matches the class name
        this.element.classList.add("TextMessage");

        // contents of the element are some paragraph of text then a next button
        // BEM style class naming: ComponentName_componentFunction
        this.element.innerHTML = (`
            <p class="TextMessage_p">${this.text}</p>
            <button class="TextMessage_button">Next</button>
        `)
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element)
    }

}