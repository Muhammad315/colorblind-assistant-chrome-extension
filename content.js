function applyColorblindFilter(type) {
    // Append SVG filters to the document
    if (!document.getElementById('colorblind-filters')) {
      const svgFilters = `
        <svg id="colorblind-filters" xmlns="http://www.w3.org/2000/svg" version="1.1" style="display:none">
          <defs>
            <filter id="protanopia-filter">
              <feColorMatrix type="matrix"
                values="0.567, 0.433, 0,     0, 0
                        0.558, 0.442, 0,     0, 0
                        0,     0.242, 0.758, 0, 0
                        0,     0,     0,     1, 0"/>
            </filter>
            <filter id="deuteranopia-filter">
              <feColorMatrix type="matrix"
                values="0.625, 0.375, 0,     0, 0
                        0.7,   0.3,   0,     0, 0
                        0,     0.3,   0.7,   0, 0
                        0,     0,     0,     1, 0"/>
            </filter>
            <filter id="tritanopia-filter">
              <feColorMatrix type="matrix"
                values="0.95,  0.05,  0,     0, 0
                        0,     0.433, 0.567, 0, 0
                        0,     0.475, 0.525, 0, 0
                        0,     0,     0,     1, 0"/>
            </filter>
          </defs>
        </svg>
      `;
      document.body.insertAdjacentHTML('beforeend', svgFilters);
    }
  
    // Apply the selected filter
    let filter = '';
    switch (type) {
      case 'protanopia':
        filter = 'url(#protanopia-filter)';
        break;
      case 'deuteranopia':
        filter = 'url(#deuteranopia-filter)';
        break;
      case 'tritanopia':
        filter = 'url(#tritanopia-filter)';
        break;
      default:
        filter = 'none';
    }
    document.documentElement.style.filter = filter;
  }
  
  // Listen for storage changes to apply filters dynamically
  chrome.storage.sync.get('colorblindType', (data) => {
    applyColorblindFilter(data.colorblindType);
  });
  
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.colorblindType) {
      applyColorblindFilter(changes.colorblindType.newValue);
    }
  });
  