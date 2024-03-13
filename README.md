# Base64 Converter Chrome Extension

## Overview
The Base64 Converter Chrome Extension is a simple tool designed to encode or decode selected text to and from Base64. This extension is perfect for developers, testers, and anyone needing quick and easy Base64 conversion directly within the browser.

## Features
- **Text Selection Conversion:** Automatically detects and converts selected text on any webpage to Base64 or from Base64. Of course, it supports Unicode as well as ASCII.
- **Manual Text Entry:** Allows for manual entry of text to be encoded or decoded, catering to all user needs.
- **Clipboard Integration:** Offers convenient copy buttons to easily transfer the converted text to the clipboard.

## How It Works
1. **Text Selection:** Simply select text on any webpage. The extension captures and processes this selection for conversion. By default, this extension detects a user's drag or selection change. When mouse input is finished (mouseup), it converts the finally selected text.
2. **Manual Entry:** Alternatively, manually input the text you wish to convert in the extension's popup window.
3. **Conversion:** The conversion is done automatically by default. Selected texts are automatically detected, and the selected texts will be converted when you click Extension to open the popup page. If you enter manually, click the "Convert" button to encode or decode the input text. The result is immediately displayed within the popup.
4. **Copy to Clipboard:** Use the provided copy buttons to copy the converted text to the clipboard with ease.

## Installation
- **Installation using the Chrome Web Store**
  1. Open the Webstore link to this extension 
    https://chromewebstore.google.com/detail/base64-converter/phnfdgkebnhlkphdjnhmbahgpbdlfpla?hl=en
  2. Click "Add to Chrome"

- **Manual Installation**
  1. Clone this repository or download the extension package.
  2. Open Chrome and navigate to `chrome://extensions/`.
  3. Enable "Developer mode" at the top right corner.
  4. Click "Load unpacked" and select the folder containing the extension files.
  5. The Base64 Converter extension icon will now appear in your toolbar for easy access.

## Usage
- **Encoding:** Select text on any page or enter it manually in the extension popup, then click "Convert" to encode the text to Base64.
- **Decoding:** To decode, enter a Base64 encoded string and click "Convert". The decoded text will be displayed if the string is valid Base64.
- **Clipboard Copy:** Use the "Copy" buttons next to each output field to copy the encoded or decoded text to your clipboard.
