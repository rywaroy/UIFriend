document.addEventListener('DOMContentLoaded', function () {
    function sendMessageToContent(object, fn) {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            (tabs) => {
                if (!fn) {
                    fn = function () {};
                }
                chrome.tabs.sendMessage(tabs[0].id, object, fn);
            }
        );
    }

    class State {
        constructor() {
            this.state = 0;
            this.style = 0;
            this.button = document.querySelector('.popup-container-button');
            this.styleSwitch = document.querySelector('.popup-container-style');
            this.bind();
        }

        bind() {
            this.button.addEventListener('click', () => {
                if (this.state === 0) {
                    sendMessageToContent({ type: 'start' }, () => {
                        this.start();
                    });
                    
                }
                if (this.state === 1) {
                    sendMessageToContent({ type: 'stop' }, () => {
                        this.stop();
                    });
                }
            });
            this.styleSwitch.addEventListener('change', () => {
                if (this.style === 0) {
                    sendMessageToContent({ type: 'style-start' }, () => {
                        this.styleStart();
                    });
                }
                if (this.style === 1) {
                    sendMessageToContent({ type: 'style-stop' }, () => {
                        this.styleStop();
                    });
                }
            });
        }

        start() {
            this.button.classList.remove('start');
            this.button.classList.add('stop');
            this.button.innerHTML = '关闭';
            this.state = 1;
        }

        stop() {
            this.button.classList.remove('stop');
            this.button.classList.add('start');
            this.button.innerHTML = '开启';
            this.state = 0;
        }

        styleStart() {
            this.styleSwitch.checked = true;
            this.style = 1;
        }

        styleStop() {
            this.styleSwitch.checked = false;
            this.style = 0;
        }

        getState() {
            sendMessageToContent({ type: 'state' }, res => {
                const { state, style } = res;
                if (state === 0) {
                    this.stop();
                }
                if (state === 1) {
                    this.start();
                }
                if (style === 0) {
                    this.styleStop();
                }
                if (style === 1) {
                    this.styleStart();
                }
            });
        }
    }

    const state = new State();

    state.getState();
});