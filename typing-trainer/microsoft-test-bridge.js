// Sends comprehensive test results to Microsoft when an endpoint is configured.
(() => {
  function wireMicrosoftSave() {
    const btn = document.getElementById('saveTestResultBtn');
    if (!btn || btn.dataset.microsoftWired === '1') return;
    btn.dataset.microsoftWired = '1';

    btn.addEventListener('click', async () => {
      const result = window.__ektCurrentTestResult;
      if (!result || typeof window.sendTypingResultToMicrosoft !== 'function') return;

      const msResult = await window.sendTypingResultToMicrosoft(result);
      const status = document.getElementById('testSaveStatus');
      if (!status) return;

      if (msResult && msResult.ok) {
        status.textContent = `Saved to Microsoft records — Grade ${Number(result.grade || 0).toFixed(1)}/10`;
      } else if (msResult && msResult.queued) {
        status.textContent = window.MICROSOFT_RESULTS_ENDPOINT
          ? 'Microsoft connection is temporarily unavailable. The result is queued on this device and will retry automatically.'
          : 'Result saved with the current system. Microsoft/SharePoint connection is ready to activate after the endpoint is configured.';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(wireMicrosoftSave, 0));
  } else {
    setTimeout(wireMicrosoftSave, 0);
  }
})();
