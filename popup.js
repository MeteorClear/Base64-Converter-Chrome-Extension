import * as TextOps from './textOperations.js';

//console.log("popup.js load");


chrome.runtime.sendMessage({ action: 'getSelectedText' }, 
    /**
     * Receives a response to an action and displays text based on the response results
     * @param {object} response The Result of 'sendResponse' in 'chrome.runtime.onMessage' in 'background.js'
     * @returns void
     */
    function(response) {
        if (response && response.text) {
            let selectedText = response.text;

            document.getElementById('draggedText').textContent = selectedText;
            //console.log('Selected Text:', selectedText);

            updateCoding(selectedText);

        } else {
            document.getElementById('draggedText').textContent = '<Drag text and reopen or enter manually>';
            document.getElementById('encodedText').textContent = '<No text selected>';
            document.getElementById('decodedText').textContent = '<No text selected>';

        }

        //console.log(response);
    }
);


/**
 * Receive the string to the selected text request and encode/decode the text to base64 and display it in 'popup.html'.
 * @param {string} selectedText The string to encode/decode
 * @returns void
 */
function updateCoding(selectedText) {
    // encoding
    try {
        let encodedText = TextOps.encodeText(selectedText);

        //console.log('Encoded Text:', encodedText);
        document.getElementById('encodedText').textContent = encodedText;

    } catch (error) {
        console.log('error:', error);
        document.getElementById('encodedText').textContent = 'encoding fail!';

    }

    // decoding
    try {
        let _decodeTest = window.atob(selectedText);

        try {
            let decodedText = TextOps.decodeText(selectedText);

            //console.log('Decoded Text:', decodedText);
            document.getElementById('decodedText').textContent = decodedText;

        } catch (error) {
            console.log('error:', error);
            document.getElementById('encodedText').textContent = 'decoding fail!';

        }

    } catch (error) {
        document.getElementById('decodedText').textContent = 'Not encoded to base64';

    }
}


document.getElementById('copyDraggedText').addEventListener('click', function() {
    let copyTargetText = document.getElementById('draggedText').value;
    TextOps.copyText(copyTargetText);
});

document.getElementById('copyEncodedText').addEventListener('click', function() {
    let copyTargetText = document.getElementById('encodedText').value;
    TextOps.copyText(copyTargetText);
});

document.getElementById('copyDecodedText').addEventListener('click', function() {
    let copyTargetText = document.getElementById('decodedText').value;
    TextOps.copyText(copyTargetText);
});


document.getElementById('manualUpdate').addEventListener('click', 
    /**
     * When clicking the manual button, the value of the textarea of 'draggedText' in 'popup.html' is taken and the encoding/decoding result is updated
     */
    function() {
        //console.log('manual update');

        let selectedText = document.getElementById("draggedText").value;
        //console.log('Selected Text:', selectedText);

        updateCoding(selectedText);

    }
);