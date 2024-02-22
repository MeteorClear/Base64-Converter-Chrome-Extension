console.log("!popup!");

chrome.runtime.sendMessage({ action: 'getDraggedText' }, function(response) {
    if (response && response.text) {

        let selectedText = response.text;
        document.getElementById('draggedText').textContent = selectedText;
        
        let encodedText = window.btoa(selectedText);
        document.getElementById('encodedText').textContent = encodedText;

        try {
            let decodedText = window.atob(selectedText);
            document.getElementById('decodedText').textContent = decodedText;
        } catch (error) {
            document.getElementById('decodedText').textContent = 'Not encoded to base64';
        }

    } else {
        document.getElementById('draggedText').textContent = '<No text selected>';
        document.getElementById('encodedText').textContent = '<No text selected>';
        document.getElementById('decodedText').textContent = '<No text selected>';
    }


    console.log(response);
});