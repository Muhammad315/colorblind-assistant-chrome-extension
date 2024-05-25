// Listen for changes to the storage
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.colorblindType) {
      // Get the current active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          // Execute the content script to apply the new filter
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
          });
        }
      });
    }
  });
  
  // When the active tab changes, apply the filter
  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.storage.sync.get('colorblindType', (data) => {
      chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        files: ['content.js']
      });
    });
  });
  
  // When the tab updates (e.g., new URL), apply the filter
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.storage.sync.get('colorblindType', (data) => {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['content.js']
        });
      });
    }
  });
  