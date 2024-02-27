console.log("background.js load");

let draggedText = '';


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.text) {
        draggedText = message.text;
    }

    if (message.action === 'getSelectedText') {
        sendResponse({ text: draggedText });
    }

    console.log(draggedText);
});