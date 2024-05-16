chrome.action.onClicked.addListener((tab) => {
  const apiUrl = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
  const apiKey = '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';

  chrome.tabs.sendMessage(tab.id, {
    action: 'scrapeAndSummarize',
    apiUrl: apiUrl,
    apiKey: apiKey
  }, (response) => {
    if (response && response.summary) {
      alert(`Summary: ${response.summary}`);
    } else {
      console.error('Failed to get summary.');
    }
  });
});
