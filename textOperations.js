console.log("textOperations.js load");

/**
 * Encodes a given text string into a base64 encoded string representing its UTF-8 encoding.
 * 
 * This process involves two main steps,
 *   1. converting the input text into UTF-8 byte sequence
 *   2. encoding this byte sequence into a base64 string.
 * @param {string} targetText The text string that will be encoded
 * @returns {string} The base64 encoded string representing the UTF-8 encoding of the input text.
 */
export function encodeText(targetText) {
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
export function decodeText(targetText) {
    const decoder = new TextDecoder('utf-8');

    let base64Text = window.atob(targetText);
    let utf8DecodedStr = new Uint8Array([...base64Text].map(char => char.charCodeAt(0)))
    let decodedText = decoder.decode(utf8DecodedStr);

    return decodedText;
}


/**
 * Receive the string and copy it to the clipboard
 * @param {string} copyTargetText 
 * @returns void
 */
export function copyText(copyTargetText) {
    navigator.clipboard.writeText(copyTargetText)
        .then(() => {
            console.log('Text copied:', copyTargetText);
        })
        .catch(error => {
            console.log('Copy error:', error);
        });
}

