console.log("content.js load");

let selectedText = '';

document.addEventListener('selectionchange', 
    /**
     * Selected text, that is, whenever the dragged text changes, it is taken and saved.
     */
    function(event) {
        selectedText = window.getSelection().toString();
    }
);

document.addEventListener('mouseup', 
    /**
     * When the mouse up, it sends the selected text so far to 'background.js'.
     * 
     * If there is too much text, it sends an alternative text.
     */
    function(event) {
        if (selectedText) {
            if (selectedText.length > 3000) {
                selectedText = 'Over-selected string'
            }
            chrome.runtime.sendMessage({text: selectedText});
            console.log('Message send:', selectedText);
        }
    }
);
