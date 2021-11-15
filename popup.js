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
            this.button = document.querySelector('.popup-container-button');
            this.bind();
        }

        bind() {
            this.button.addEventListener('click', () => {
                if (this.state === 0) {
                    sendMessageToContent({ type: 'start' }, res => {
                        if (res === 1) {
                            this.start();
                        }
                    })
                }
                if (this.state === 1) {
                    sendMessageToContent({ type: 'stop' }, res => {
                        if (res === 0) {
                            this.stop();
                        }
                    })
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

        getState() {
            sendMessageToContent({ type: 'state' }, res => {
                if (res === 0) {
                    this.stop();
                }
                if (res === 1) {
                    this.start();
                }
            });
        }
    }

    const state = new State();

    state.getState();
});