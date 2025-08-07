document.getElementById('generateQuote').addEventListener('click', async function () {
  try {
    const response = await fetch('/api/quote');
    const data = await response.json();
    document.getElementById('quote').textContent = data.quote;
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
});
