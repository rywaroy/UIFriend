const script = document.createElement('script');
const file = chrome.extension.getURL('src/UIFriend.js');
script.type = "text/javascript";
script.src = file;
script.async = true;
const s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(script, s);