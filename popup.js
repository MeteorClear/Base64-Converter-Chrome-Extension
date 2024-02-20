console.log("!popup!");

chrome.runtime.sendMessage({ action: 'getDraggedText' }, function(response) {
    if (response && response.text) {
        document.getElementById('draggedText').textContent = response.text;
    } else {
        document.getElementById('draggedText').textContent = 'No text dragged.';
    }
    console.log(response);
});