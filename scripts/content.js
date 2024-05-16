
async function scrapeAndSummarize(apiUrl, apiKey) {
    let textContent = Array.from(document.querySelectorAll('p')).map(p => p.textContent).join(' ');
    
    try {
      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ inputs: textContent })
      });
  
      if (response.ok) {
        let result = await response.json();
        return result[0].summary_text;
      } else {
        console.error('Failed to summarize text:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapeAndSummarize') {
      scrapeAndSummarize(request.apiUrl, request.apiKey).then(summary => {
        sendResponse({ summary });
      });
      return true;
    }
  });
  