console.log("content.js load");

let selectedText = '';

document.addEventListener('selectionchange', function(event) {
    selectedText = window.getSelection().toString();
    //console.log('Selected text:', selectedText);
});

document.addEventListener('mouseup', function(event) {
    if (selectedText) {
        if (selectedText.length > 3000) {
            selectedText = 'Over-selected string'
        }
        chrome.runtime.sendMessage({text: selectedText});
        console.log('Message send:', selectedText);
    }
});


/* 
// not working
document.addEventListener('dragstart', function(event) {

    var selectedText = window.getSelection().toString();

    if (selectedText) {
        chrome.runtime.sendMessage({text: selectedText});
    }

});
*/


/* 
// working but not intended
window.addEventListener('selectstart', function(event) {
    var selectedText = window.getSelection().toString();

    if (selectedText) {
        chrome.runtime.sendMessage({text: selectedText});
    }

    console.log(selectedText);
});
*/


/* 
// sample
chrome.runtime.sendMessage({
    key: value
    },function(response) {
        console.log(response.res);
});	
*/