console.log("popup.js load");


chrome.runtime.sendMessage({ action: 'getSelectedText' }, function(response) {
    updateCoding(response);
});


/**
 * Receive the response to the selected text request and encode/decode the text to base64 and display it in 'popup.html'.
 * @param {object} response Results of 'sendResponse' in 'chrome.runtime.onMessage' in 'background.js'
 * @returns void
 */
function updateCoding(response) {
    if (response && response.text) {

        // select
        let selectedText = response.text;
        document.getElementById('draggedText').textContent = selectedText;
        console.log('Selected Text:', selectedText);

        // encoding
        try {
            let encodedText = encodeText(selectedText);

            console.log('Encoded Text:', encodedText);
            document.getElementById('encodedText').textContent = encodedText;

        } catch (error) {
            console.log('error:',error);
            document.getElementById('encodedText').textContent = 'encoding fail!';

        }

        // decoding
        try {
            let _decodeTest = window.atob(selectedText);

            try {
                let decodedText = decodeText(selectedText);

                console.log('Decoded Text:', decodedText);
                document.getElementById('decodedText').textContent = decodedText;

            } catch (error) {
                console.log('error:', error);
                document.getElementById('encodedText').textContent = 'decoding fail!';

            }

        } catch (error) {
            document.getElementById('decodedText').textContent = 'Not encoded to base64';

        }

    // not selected
    } else {
        document.getElementById('draggedText').textContent = '<Drag text and reopen or enter manually>';
        document.getElementById('encodedText').textContent = '<No text selected>';
        document.getElementById('decodedText').textContent = '<No text selected>';

    }

    console.log(response);
}


/**
 * Encodes a given text string into a base64 encoded string representing its UTF-8 encoding.
 * 
 * This process involves two main steps,
 *   1. converting the input text into UTF-8 byte sequence
 *   2. encoding this byte sequence into a base64 string.
 * @param {string} targetText The text string that will be encoded
 * @returns {string} The base64 encoded string representing the UTF-8 encoding of the input text.
 */
function encodeText(targetText) {
    const encoder = new TextEncoder();

    let utf8EncodedStr = encoder.encode(targetText);
    let encodedText = window.btoa(String.fromCharCode.apply(null, utf8EncodedStr));

    return encodedText;
}


/**
 * Decodes a base64 encoded string back to its original text.
 * 
 * This process involves two main steps,
 *   1. decoding the base64 string to a binary string.
 *   2. converting this binary string into a Uint8Array of UTF-8 byte values.
 *   3. decoding the UTF-8 byte sequence back to
 * @param {string} targetText The base64 encoded string to be decoded back to its original text representation.
 * @returns {string} The original text string that was encoded.
 */
function decodeText(targetText) {
    const decoder = new TextDecoder('utf-8');

    let base64Text = window.atob(targetText);
    let utf8DecodedStr = new Uint8Array([...base64Text].map(char => char.charCodeAt(0)))
    let decodedText = decoder.decode(utf8DecodedStr);

    return decodedText;
}



document.getElementById('copyDraggedText').addEventListener('click', function() {
    copyText('draggedText');
});

document.getElementById('copyEncodedText').addEventListener('click', function() {
    copyText('encodedText');
});

document.getElementById('copyDecodedText').addEventListener('click', function() {
    copyText('decodedText');
});


/**
 * Function that receives an id value and copies the text inside the tag with that id to the clipboard.
 * @param {string} id The id value of tag to want to copy text inside from 'popup.html'
 * @returns void
 */
function copyText(id) {
    let tempText = document.getElementById(id).value;

    navigator.clipboard.writeText(tempText)
        .then(() => {
            console.log('Text copied:', tempText);
        })
        .catch(error => {
            console.log('Copy error:', error);
        });
}


document.getElementById('manualUpdate').addEventListener('click', function() {
    console.log('manual update');

    let selectedText = document.getElementById("draggedText").value;

    console.log('Selected Text:', selectedText);

    // encoding
    try {
        let encodedText = encodeText(selectedText);

        console.log('Encoded Text:', encodedText);
        document.getElementById('encodedText').textContent = encodedText;

    } catch (error) {
        console.log('error:',error);
        document.getElementById('encodedText').textContent = 'encoding fail!';

    }

    // decoding
    try {
        let _decodeTest = window.atob(selectedText);

        try {
            let decodedText = decodeText(selectedText);

            console.log('Decoded Text:', decodedText);
            document.getElementById('decodedText').textContent = decodedText;

        } catch (error) {
            console.log('error:', error);
            document.getElementById('encodedText').textContent = 'decoding fail!';

        }

    } catch (error) {
        document.getElementById('decodedText').textContent = 'Not encoded to base64';

    }

});