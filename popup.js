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
    
    sendMessageToContent({ type: 'uifriend-start' });

})