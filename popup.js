console.log("!popup!");

chrome.runtime.sendMessage({ action: 'getSelectedText' }, function(response) {
    if (response && response.text) {

        // select
        let selectedText = response.text;
        document.getElementById('draggedText').textContent = selectedText;
        console.log('Selected Text:', selectedText);

        // encoding
        try {
            const encoder = new TextEncoder();
            let utf8EncodedStr = encoder.encode(selectedText);
            
            let encodedText = window.btoa(String.fromCharCode.apply(null, utf8EncodedStr));
            document.getElementById('encodedText').textContent = encodedText;

            console.log('Encoded Text:', encodedText);

        } catch (error) {
            console.log('error:',error);
            document.getElementById('encodedText').textContent = 'encoding fail!';

        }

        // decoding
        try {
            let decodedText = window.atob(selectedText);

            try {
                const decoder = new TextDecoder('utf-8');
                let binArray = new Uint8Array([...decodedText].map(char => char.charCodeAt(0)))
                let utf8DecodedStr = decoder.decode(binArray);

                document.getElementById('decodedText').textContent = utf8DecodedStr;

                console.log('Decoded Text:', utf8DecodedStr);

            } catch (error) {
                console.log('error:',error);
                document.getElementById('encodedText').textContent = 'decoding fail!';

            }

        } catch (error) {
            document.getElementById('decodedText').textContent = 'Not encoded to base64';

        }

    // not selected
    } else {
        document.getElementById('draggedText').textContent = '<No text selected>';
        document.getElementById('encodedText').textContent = '<No text selected>';
        document.getElementById('decodedText').textContent = '<No text selected>';

    }

    console.log(response);
});



document.getElementById('copyDraggedText').addEventListener('click', function() {
    copyText('draggedText');
});

document.getElementById('copyEncodedText').addEventListener('click', function() {
    copyText('encodedText');
});

document.getElementById('copyDecodedText').addEventListener('click', function() {
    copyText('decodedText');
});



function copyText(divId) {
    let tempText = document.getElementById(divId).innerText;

    navigator.clipboard.writeText(tempText)
        .then(() => {
            console.log('Text copied:', tempText);
        })
        .catch(error => {
            console.log('Copy error:', error);
        });
}


/*
// execCommand is Deprecated
function copyText(divId) {
    let tempText = document.getElementById(divId).innerText;

    let tempInput = document.createElement("input");
    tempInput.value = tempText;

    document.body.appendChild(tempInput);
    tempInput.select();

    document.execCommand("copy");

    document.body.removeChild(tempInput);
}
*/