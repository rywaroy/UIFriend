const ACTIVE_KEY_CODE = 17;

class CurrentElement {
    constructor(element) {
        this.element = element;
        this.rect = element.getBoundingClientRect();
    }

    create() {
        this.container = document.createElement('div');
        this.container.classList.add('ui-friend__current-element-container');
        const { top, left, width, height } = this.rect;
        this.container.style.top = `${top - 1}px`;
        this.container.style.left = `${left - 1}px`;
        this.container.style.width = `${width - 2}px`;
        this.container.style.height = `${height - 2}px`;
        document.body.appendChild(this.container);

        this.tag = document.createElement('span');
        this.tag.classList.add('ui-friend__current-element-tag');
        this.tag.innerText = `${Math.round(width)}px × ${Math.round(height)}px`;
        this.container.appendChild(this.tag);
    }

    remove() {
        if (this.container) {
            this.container.remove();
        }
        return null;
    }
}

class TargetElement {
    constructor(element) {
        this.element = element;
        this.rect = element.getBoundingClientRect();
    }

    create() {
        this.container = document.createElement('div');
        this.container.classList.add('ui-friend__target-element-container');
        const { top, left, width, height } = this.rect;
        this.container.style.top = `${top - 1}px`;
        this.container.style.left = `${left - 1}px`;
        this.container.style.width = `${width - 2}px`;
        this.container.style.height = `${height - 2}px`;
        document.body.appendChild(this.container);

        this.tag = document.createElement('span');
        this.tag.classList.add('ui-friend__target-element-tag');
        this.tag.innerText = `${Math.round(width)}px × ${Math.round(height)}px`;
        this.container.appendChild(this.tag);
    }

    remove() {
        if (this.container) {
            this.container.remove();
        }
        return null;
    }
}

class UIFriend {
    constructor() {
        this.active = false;
        this.currentElement = null;
        this.targetElement = null;
    }

    createCurrentElement() {
        const elements = document.querySelectorAll(':hover');
        const element = elements[elements.length - 1];

        if (element && (element !== (this.currentElement ? this.currentElement.element : null))) {
            this.currentElement = new CurrentElement(element);
            this.currentElement.create();
        }
    }

    createTargetElement() {
        const elements = document.querySelectorAll(':hover');
        const element = elements[elements.length - 1];
        
        if (element && 
            (element !== (this.currentElement ? this.currentElement.element : null)) &&
            (element !== (this.targetElement ? this.targetElement.element : null))
        ) {
            if (this.targetElement) {
                this.targetElement.remove();
            }
            this.targetElement = new TargetElement(element);
            this.targetElement.create();
        }
    }

    onKeyDown(e) {
        if (e.keyCode === ACTIVE_KEY_CODE && !this.active) {
            e.preventDefault();
            this.active = true;
            this.createCurrentElement();
        }
    }

    onKeyUp(e) {
        if (e.keyCode === ACTIVE_KEY_CODE) {
            this.active = false;
            if (this.currentElement) {
                this.currentElement.remove();
                this.currentElement = null;
            }
            if (this.targetElement) {
                this.targetElement.remove();
                this.targetElement = null;
            }
        }
    }

    onMounseMove() {
        if (this.active) {
            this.createTargetElement();
        }
    }

    start() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener('mousemove', this.onMounseMove.bind(this));
        this.addStyle();
    }

    stop() {
        window.removeEventListener('keydown', this.onKeyDown.bind(this));
        window.removeEventListener('keyup', this.onKeyUp.bind(this));
        window.removeEventListener('mousemove', this.onMounseMove.bind(this));
    }

    addStyle() {
        let styleElement = document.getElementById('ui-friend-style');

        if (!styleElement) {
            const styleElement = document.createElement('link')
            const file = chrome.extension.getURL('src/index.css');
            styleElement.id = 'ui-friend-style';
            styleElement.type = 'text/css';
            styleElement.href = file;
            styleElement.rel = 'stylesheet';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }
    }

    removeStyle() {
        const styleElement = document.getElementById('ui-friend-style');
        if (styleElement) {
            styleElement.remove();
        }
    }
}

const work = new UIFriend();

work.start();

