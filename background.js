//console.log("background.js load");

let draggedText = '';


/**
 * Waiting for a response from 'content.js'.  
 * Save the text if the response contains text.  
 * When the 'getSelectedText' action from 'popup.js' comes in, the saved text is returned via 'sendResponse' callback.  
 * 
 * @param {object} message The message object received from 'content.js'.
 * @param {object} sender The object that provides information about the context from which the message was sent, including the tab and frame id.
 * @param {function} sendResponse The function that can be called to send a response back to the sender of the message.
 * @returns void
 */
function handleMessage(message, sender, sendResponse) {
    if (message.text) {
        draggedText = message.text;
    }

    if (message.action === 'getSelectedText') {
        sendResponse({ text: draggedText });
    }

    //console.log(draggedText);
}


/**
 * Creates custom items in the context menu that appears when you right-click on Chrome.  
 * 
 * @param void
 * @return void
 */
function createContextMenuItems() {
    chrome.contextMenus.create({
        'id': 'EncodeBase64',
        'title': 'Encode Base64',
        'contexts': ['selection']
    });

    chrome.contextMenus.create({
        'id': 'DecodeBase64',
        'title': 'Decode Base64',
        'contexts': ['selection']
    });
}


/**
 * Listens for clicks on context menu items and sends messages to 'content.js'.  
 * 
 * @param {object} info Information about the context menu click event.
 * @param {object} tab Information about the active tab.
 * @returns void
 */
function handleContextMenuClick(info, tab) {
    if (info.menuItemId === 'EncodeBase64' && info.selectionText) {
        //console.log('context menu click:', tab.id, info.menuItemId);

        chrome.tabs.sendMessage(tab.id, {
            action: 'encodeBase64',
            text: info.selectionText
        });
    }

    if (info.menuItemId === 'DecodeBase64' && info.selectionText) {
        //console.log('context menu click:', tab.id, info.menuItemId);

        chrome.tabs.sendMessage(tab.id, {
            action: 'decodeBase64',
            text: info.selectionText
        });
    }
}


// Register listeners
chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onInstalled.addListener(createContextMenuItems);
chrome.contextMenus.onClicked.addListener(handleContextMenuClick);