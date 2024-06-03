//console.log("content.js load");

let selectedText = '';


/**
 * Handles the selection change event to update the selected text.
 */
function handleSelectionChange() {
    selectedText = window.getSelection().toString();
}


/**
 * Handles the mouse up event to send the selected text to 'background.js'.
 */
function handleMouseUp() {
    if (selectedText) {
        if (selectedText.length > 3000) {
            selectedText = 'Over-selected string';
        }
        chrome.runtime.sendMessage({ text: selectedText });
        //console.log('Message send:', selectedText);
    }
}


/**
 * Handles incoming messages from 'background.js'.  
 * Encodes or decodes the text based on the action and displays the result using a prompt.  
 * 
 * @param {object} message The message object received from 'background.js'.
 * @param {object} sender The object that provides information about the context from which the message was sent, including the tab and frame id.
 * @param {function} sendResponse The function that can be called to send a response back to the sender of the message.
 */
function handleMessage(message, sender, sendResponse) {
    if (message.text) {
        //console.log('context menu:', message.action, message.text);
        let codedText = '';

        try {
            if (message.action === 'encodeBase64') {
                codedText = encodeText(message.text);

            } else if (message.action === 'decodeBase64') {
                codedText = decodeText(message.text);

            } else {
                console.log('unknown action');

            }
        } catch (error) {
            console.log('error:', error);

            if (message.action === 'decodeBase64') {
                alert('Not encoded to base64');

            }
        }

        let copyTargetText = prompt('Click OK to copy to the clipboard.', codedText);

        if (copyTargetText != null) {
            copyText(codedText);

        }
    }
}


// Register event listeners
document.addEventListener('selectionchange', handleSelectionChange);
document.addEventListener('mouseup', handleMouseUp);
chrome.runtime.onMessage.addListener(handleMessage);


/**********************************************************************************************/
// Same as 'textOperations.js'

function encodeText(targetText) {
    const encoder = new TextEncoder();
    const utf8EncodedStr = encoder.encode(targetText);
    const encodedText = window.btoa(String.fromCharCode.apply(null, utf8EncodedStr));
    return encodedText;
}

function decodeText(targetText) {
    const decoder = new TextDecoder('utf-8');
    const base64Text = window.atob(targetText);
    const utf8DecodedStr = new Uint8Array([...base64Text].map(char => char.charCodeAt(0)))
    const decodedText = decoder.decode(utf8DecodedStr);
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
