console.log("background.js load");

let draggedText = '';


chrome.runtime.onMessage.addListener(
    /**
     * Waiting for a response from 'content.js'. 
     * 
     * Save the text if the response contains text. 
     * 
     * When the 'getSelectedText' action from 'popup.js' comes in, the saved text is returned via 'sendResponse' callback.
     * @param {object} message The message object received from 'content.js'
     * @param {object} sender The object that provides information about the context from which the message was sent, including the tab and frame id.
     * @param {function} sendResponse The function that can be called to send a response back to the sender of the message
     */
    function(message, sender, sendResponse) {
        if (message.text) {
            draggedText = message.text;
        }

        if (message.action === 'getSelectedText') {
            sendResponse({ text: draggedText });
        }

        console.log(draggedText);
    }
);
