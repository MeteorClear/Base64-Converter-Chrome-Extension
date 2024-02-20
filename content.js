console.log("content.js load");

document.addEventListener('dragstart', function(event) {

    var selectedText = window.getSelection().toString();

    if (selectedText) {
        chrome.runtime.sendMessage({text: selectedText});
    }

});