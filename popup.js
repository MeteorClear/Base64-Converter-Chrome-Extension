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