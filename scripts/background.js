chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapeAndSummarize
    });
  });
  
  async function scrapeAndSummarize() {
    let textContent = Array.from(document.querySelectorAll('p')).map(p => p.textContent).join(' ');
  
    // Replace with your actual API endpoint and key
    const apiUrl = 'https://api-inference.huggingface.co/models/Falconsai/text_summarization';
    const apiKey = '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';
  
    try {
      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ text: textContent })
      });
  
      if (response.ok) {
        let result = await response.json();
        alert(`Summary: ${result.summary}`);
      } else {
        console.error('Failed to summarize text:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  