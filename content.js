console.log("content.js load");

let selectedText = '';


document.addEventListener('selectionchange', 
    /**
     * Selected text, that is, whenever the dragged text changes, it is taken and saved.
     */
    function(event) {
        selectedText = window.getSelection().toString();
    }
);


document.addEventListener('mouseup', 
    /**
     * When the mouse up, it sends the selected text so far to 'background.js'.
     * 
     * If there is too much text, it sends an alternative text.
     */
    function(event) {
        if (selectedText) {
            if (selectedText.length > 3000) {
                selectedText = 'Over-selected string'
            }

            chrome.runtime.sendMessage({text: selectedText});

            console.log('Message send:', selectedText);
        }
    }
);


chrome.runtime.onMessage.addListener(
    /**
     * Waiting for a response from 'background.js'.
     * 
     * When a contextMenus.onClick event occurs, Receive the action name and selected text information.
     * 
     * Encode or decode according to the action and display the result using by prompt.
     * @param {object} message The message object received from 'background.js'.
     * @param {object} sender The object that provides information about the context from which the message was sent, including the tab and frame id.
     * @param {function} sendResponse The function that can be called to send a response back to the sender of the message.
     */
    function(message, sender, sendResponse) {
        if (message.text) {
            console.log('context menu:', message.action, message.text);

            let codedText = '';

            // encode
            if (message.action === 'encodeBase64') {
                try {
                    codedText = encodeText(message.text);

                } catch (error) {
                    console.log('error:', error);

                }

            // decode
            } else if (message.action === 'decodeBase64') {
                try {
                    let _decodeTest = window.atob(selectedText);

                    try {
                        codedText = decodeText(message.text);

                    } catch (error) {
                        console.log('error:', error);

                    }

                } catch (error) {
                    alert('Not encoded to base64')

                }

            } else {
                console.log('unknown action');

            }

            let copyTargetText = prompt('Click OK to copy to the clipboard.', codedText);
            if (copyTargetText != null) {
                copyText(codedText);

            }
        }
    }
);


/**********************************************************************************************/
// Same as 'textOperations.js'

function encodeText(targetText) {
    const encoder = new TextEncoder();

    let utf8EncodedStr = encoder.encode(targetText);
    let encodedText = window.btoa(String.fromCharCode.apply(null, utf8EncodedStr));

    return encodedText;
}

function decodeText(targetText) {
    const decoder = new TextDecoder('utf-8');

    let base64Text = window.atob(targetText);
    let utf8DecodedStr = new Uint8Array([...base64Text].map(char => char.charCodeAt(0)))
    let decodedText = decoder.decode(utf8DecodedStr);

    return decodedText;
}

function copyText(copyTargetText) {
    navigator.clipboard.writeText(copyTargetText)
        .then(() => {
            console.log('Text copied:', copyTargetText);
        })
        .catch(error => {
            console.log('Copy error:', error);
        });
}
