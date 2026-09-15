// Microsoft results integration scaffold.
// Set window.MICROSOFT_RESULTS_ENDPOINT to an Azure Function or Power Automate HTTP endpoint
// after SharePoint/Excel is configured. Until then, the current Google Sheets flow remains active.

(() => {
  const MICROSOFT_QUEUE_KEY = 'ekt_ms_pending_results';

  function getEndpoint() {
    return String(window.MICROSOFT_RESULTS_ENDPOINT || '').trim();
  }

  function queueResult(result) {
    try {
      const rows = JSON.parse(localStorage.getItem(MICROSOFT_QUEUE_KEY) || '[]');
      if (!rows.some(r => r.id === result.id)) rows.push(result);
      localStorage.setItem(MICROSOFT_QUEUE_KEY, JSON.stringify(rows.slice(-200)));
    } catch (_) {}
  }

  function removeQueuedResult(id) {
    try {
      const rows = JSON.parse(localStorage.getItem(MICROSOFT_QUEUE_KEY) || '[]');
      localStorage.setItem(MICROSOFT_QUEUE_KEY, JSON.stringify(rows.filter(r => r.id !== id)));
    } catch (_) {}
  }

  async function sendToMicrosoft(result) {
    const endpoint = getEndpoint();
    if (!endpoint) {
      queueResult(result);
      return { ok: false, queued: true, reason: 'endpoint-not-configured' };
    }

    const payload = {
      attemptId: result.id,
      studentName: result.studentName,
      traineeNumber: result.studentNumber,
      group: result.group || '',
      testDate: result.date,
      testType: result.type || 'Comprehensive Test',
      wpm: Number(result.wpm || 0),
      accuracy: Number(result.accuracy || 0),
      errors: Number(result.errors || 0),
      durationSeconds: Number(result.duration || 0),
      characters: Number(result.characters || 0),
      accuracyScore: Number(result.accuracyPoints || 0),
      speedScore: Number(result.speedPoints || 0),
      finalGrade: Number(result.grade || 0),
      gradeOutOf: 10,
      targetWpm: Number(result.targetWpm || 40)
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      removeQueuedResult(result.id);
      return { ok: true };
    } catch (error) {
      queueResult(result);
      return { ok: false, queued: true, error: String(error) };
    }
  }

  async function flushMicrosoftQueue() {
    if (!getEndpoint()) return;
    let rows = [];
    try { rows = JSON.parse(localStorage.getItem(MICROSOFT_QUEUE_KEY) || '[]'); }
    catch (_) { return; }
    for (const row of rows) await sendToMicrosoft(row);
  }

  window.sendTypingResultToMicrosoft = sendToMicrosoft;
  window.flushTypingMicrosoftQueue = flushMicrosoftQueue;
  window.addEventListener('online', flushMicrosoftQueue);
  window.addEventListener('DOMContentLoaded', flushMicrosoftQueue);
})();
