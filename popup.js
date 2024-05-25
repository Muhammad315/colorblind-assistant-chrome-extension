document.getElementById('apply').addEventListener('click', () => {
    const type = document.getElementById('colorblind-type').value;
    chrome.storage.sync.set({ colorblindType: type }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      });
    });
  });
  
  document.getElementById('remove').addEventListener('click', () => {
    chrome.storage.sync.set({ colorblindType: 'none' }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      });
    });
  });
  