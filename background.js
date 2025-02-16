// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showLoadingScreen") {
      // No action needed here in this specific design.  The content script directly adds the loader.
    } else if (message.action === "hideLoadingScreen") {
       // No action needed here in this specific design. Content Script directly removes the element
    }
  });