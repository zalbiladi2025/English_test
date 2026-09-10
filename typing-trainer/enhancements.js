// Phase 2 enhancements: client-side idempotency + privacy-safe leaderboard UI.
// Privacy-safe Apps Script deployment confirmed by the trainer; public leaderboard is enabled.

const SENT_ATTEMPTS_KEY = 'ekt_sent_attempt_ids';
const PRIVACY_SAFE_LEADERBOARD_ENABLED = true;

function getSentAttemptIds() {
  try { return new Set(JSON.parse(localStorage.getItem(SENT_ATTEMPTS_KEY) || '[]').map(String)); }
  catch (_) { return new Set(); }
}

function markAttemptSent(id) {
  const ids = getSentAttemptIds();
  ids.add(String(id));
  localStorage.setItem(SENT_ATTEMPTS_KEY, JSON.stringify(Array.from(ids).slice(-500)));
}

function isAttemptSent(id) {
  return getSentAttemptIds().has(String(id));
}

function sendToSheet(result) {
  if (!SHEET_WEB_APP_URL || !result) return;
  const btn = $('sendResultBtn');
  const status = $('syncStatus');

  if (isAttemptSent(result.id)) {
    if (btn) { btn.disabled = true; btn.textContent = 'Already Sent ✓'; }
    if (status) status.textContent = 'This attempt has already been sent to your trainer.';
    toast('Attempt already sent');
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  if (status) status.textContent = 'Sending result to trainer…';

  const payload = JSON.stringify(result);
  const finishSuccess = () => {
    markAttemptSent(result.id);
    if (btn) { btn.disabled = true; btn.textContent = 'Sent ✓'; }
    if (status) status.textContent = 'Result sent successfully. This attempt cannot be sent again.';
    toast('Result sent to trainer');
  };
  const finishFailure = () => {
    if (btn) { btn.disabled = false; btn.textContent = 'Try Sending Again'; }
    if (status) status.textContent = 'Send failed. Please try again.';
    toast('Could not send result');
  };

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });
      if (navigator.sendBeacon(SHEET_WEB_APP_URL, blob)) {
        finishSuccess();
        return;
      }
    }
    fetch(SHEET_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      redirect: 'follow',
      keepalive: true,
      body: payload
    }).then(finishSuccess).catch(finishFailure);
  } catch (e) {
    console.warn(e);
    finishFailure();
  }
}

function updateSendButtonForCurrentResult() {
  const btn = $('sendResultBtn');
  const status = $('syncStatus');
  const result = state.results[0];
  if (!btn || !result) return;
  if (isAttemptSent(result.id)) {
    btn.disabled = true;
    btn.textContent = 'Already Sent ✓';
    if (status) status.textContent = 'This attempt has already been sent to your trainer.';
  } else {
    btn.disabled = false;
    btn.textContent = 'Send Result to Trainer';
    if (status) status.textContent = 'Send each completed attempt once to your trainer.';
  }
}

function showLeaderboardView() {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  $('leaderboardView').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  loadLeaderboard();
}

function returnFromLeaderboard() {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = state.student ? $('dashboardView') : $('registerView');
  target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadLeaderboard() {
  const body = $('leaderboardBody');
  const status = $('leaderboardStatus');
  if (!body || !status) return;

  status.textContent = 'Loading leaderboard…';
  body.innerHTML = '';
  const callbackName = '__ektLeaderboardCallback_' + Date.now();
  const script = document.createElement('script');
  const cleanup = () => {
    try { delete window[callbackName]; } catch (_) {}
    if (script.parentNode) script.parentNode.removeChild(script);
  };

  window[callbackName] = data => {
    cleanup();
    if (!data || !data.ok) {
      status.textContent = 'Could not load leaderboard.';
      return;
    }
    const rows = data.leaderboard || [];
    status.textContent = rows.length ? `Showing ${rows.length} ranked trainees` : 'No ranked results yet.';
    body.innerHTML = rows.map(r => `<tr>
      <td><strong>${r.rank}</strong></td>
      <td>${escapeHtml(String(r.initials || 'T.'))}</td>
      <td>${escapeHtml(String(r.group || '—'))}</td>
      <td><strong>${Number(r.wpm || 0)}</strong></td>
      <td>${Number(r.accuracy || 0)}%</td>
      <td>${escapeHtml(String(r.lessonTitle || '—'))}</td>
    </tr>`).join('');
  };

  script.onerror = () => {
    cleanup();
    status.textContent = 'Could not load leaderboard. Please try again.';
  };
  script.src = `${SHEET_WEB_APP_URL}?action=leaderboard&callback=${encodeURIComponent(callbackName)}&t=${Date.now()}`;
  document.body.appendChild(script);
  setTimeout(() => {
    if (window[callbackName]) {
      cleanup();
      status.textContent = 'Leaderboard request timed out. Please refresh.';
    }
  }, 10000);
}

window.addEventListener('DOMContentLoaded', () => {
  const topBtn = $('leaderboardTopBtn');
  const dashBtn = $('viewLeaderboardBtn');
  const backBtn = $('leaderboardBackBtn');
  const refreshBtn = $('refreshLeaderboardBtn');
  if (topBtn) topBtn.addEventListener('click', showLeaderboardView);
  if (dashBtn) dashBtn.addEventListener('click', showLeaderboardView);
  if (backBtn) backBtn.addEventListener('click', returnFromLeaderboard);
  if (refreshBtn) refreshBtn.addEventListener('click', loadLeaderboard);

  const observer = new MutationObserver(() => {
    if ($('resultView') && $('resultView').classList.contains('active')) updateSendButtonForCurrentResult();
  });
  if ($('resultView')) observer.observe($('resultView'), { attributes: true, attributeFilter: ['class'] });
});
