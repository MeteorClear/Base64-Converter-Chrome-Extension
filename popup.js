import * as TextOps from './textOperations.js';

//console.log("popup.js load");


chrome.runtime.sendMessage({ action: 'getSelectedText' }, handleResponse);


/**
 * Handles the response from the 'getSelectedText' action and updates the UI.
 * 
 * @param {object} response The response object from 'background.js'.
 * @returns void
 */
function handleResponse(response) {
    if (response && response.text) {
        let selectedText = response.text;
        
        document.getElementById('draggedText').textContent = selectedText;
        //console.log('Selected Text:', selectedText);
        updateCoding(selectedText);

    } else {
        resetUI();

    }
}


/**
 * Updates the encoding and decoding of the selected text and displays the results.
 * 
 * @param {string} selectedText selectedText The text to be encoded and decoded.
 * @returns void
 */
function updateCoding(selectedText) {
    updateEncodedText(selectedText);
    updateDecodedText(selectedText);
}


/**
 * Encodes the selected text and updates the UI with the encoded result.
 * @param {string} text The text to be encoded.
 * @returns void
 */
function updateEncodedText(text) {
    try {
        let encodedText = TextOps.encodeText(text);
        //console.log('Encoded Text:', encodedText);

        document.getElementById('encodedText').textContent = encodedText;

    } catch (error) {
        console.log('Encoding error:', error);
        document.getElementById('encodedText').textContent = 'Encoding failed!';

    }
}


/**
 * Decodes the selected text and updates the UI with the decoded result.
 * @param {string} text The text to be decoded.
 * @returns void
 */
function updateDecodedText(text) {
    try {
        let _decodeTest = window.atob(text);
        let decodedText = TextOps.decodeText(text);
        //console.log('Decoded Text:', decodedText);

        document.getElementById('decodedText').textContent = decodedText;

    } catch (error) {
        console.log('Decoding error:', error);
        document.getElementById('decodedText').textContent = 'Decoding failed!';

    }
}


/**
 * Resets the UI when no text is selected.
 * @returns void
 */
function resetUI() {
    document.getElementById('draggedText').textContent = '<Drag text and reopen or enter manually>';
    document.getElementById('encodedText').textContent = '<No text selected>';
    document.getElementById('decodedText').textContent = '<No text selected>';
}


/**
 * Copies the text from the specified element to the clipboard.
 * @param {string} elementId The ID of the element containing the text to be copied.
 * @returns void
 */
function copyTextFromElement(elementId) {
    let copyTargetText = document.getElementById(elementId).value;
    TextOps.copyText(copyTargetText);
}


/**
 * Handles the manual update button click event to update encoding/decoding results.
 * @returns void
 */
function handleManualUpdate() {
    //console.log('manual update');
    let selectedText = document.getElementById("draggedText").value;
    //console.log('Selected Text:', selectedText);
    updateCoding(selectedText);
}


// Register event listeners
document.getElementById('copyDraggedText').addEventListener('click', () => copyTextFromElement('draggedText'));
document.getElementById('copyEncodedText').addEventListener('click', () => copyTextFromElement('encodedText'));
document.getElementById('copyDecodedText').addEventListener('click', () => copyTextFromElement('decodedText'));
document.getElementById('manualUpdate').addEventListener('click', handleManualUpdate);