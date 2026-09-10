// Phase 3: 10-exercise row sessions, batch result submission, full-name leaderboard.

const SENT_ATTEMPTS_KEY = 'ekt_sent_attempt_ids';
const COMPLETED_ROWS_KEY = 'ekt_completed_rows';
let rowSessionActive = false;
let rowSessionResults = [];
let rowSessionId = '';

function getSentAttemptIds() {
  try { return new Set(JSON.parse(localStorage.getItem(SENT_ATTEMPTS_KEY) || '[]').map(String)); }
  catch (_) { return new Set(); }
}

function markAttemptSent(id) {
  const ids = getSentAttemptIds();
  ids.add(String(id));
  localStorage.setItem(SENT_ATTEMPTS_KEY, JSON.stringify(Array.from(ids).slice(-1000)));
}

function isAttemptSent(id) {
  return getSentAttemptIds().has(String(id));
}

function completedRowsStorageKey() {
  return `${COMPLETED_ROWS_KEY}_${state.student ? state.student.number : 'guest'}`;
}

function getCompletedRows() {
  try { return new Set(JSON.parse(localStorage.getItem(completedRowsStorageKey()) || '[]')); }
  catch (_) { return new Set(); }
}

function markRowCompleted(key) {
  const rows = getCompletedRows();
  rows.add(key);
  localStorage.setItem(completedRowsStorageKey(), JSON.stringify(Array.from(rows)));
}

// Each keyboard row is one locked session of 10 exercises.
function startLesson(key) {
  state.lessonKey = key;
  state.exerciseIndex = 0;
  state.duration = Number($('durationSelect').value) || 60;
  rowSessionActive = true;
  rowSessionResults = [];
  rowSessionId = `${state.student.number}-${key}-${Date.now()}`;

  const lesson = lessons[key];
  $('lessonLabel').textContent = lesson.label;
  $('lessonTitle').textContent = lesson.title;
  setRowSessionControls();
  pickText();
  resetTyping();
  highlightLessonKeys();
  showView('trainerView');
  setTimeout(() => $('typingInput').focus(), 200);
}

function setRowSessionControls() {
  const back = $('backToDashboard');
  const next = $('newTextBtn');
  if (back) {
    back.disabled = rowSessionActive;
    back.textContent = rowSessionActive ? '🔒 Complete 10 exercises' : '← Dashboard';
    back.title = rowSessionActive ? 'Finish all 10 exercises before leaving this row.' : '';
  }
  if (next) {
    next.disabled = rowSessionActive;
    next.textContent = rowSessionActive ? 'Complete this exercise to continue' : 'Next exercise';
  }
}

// Override dashboard completion: a row counts only after all 10 exercises are finished in one session.
function updateDashboard() {
  const mine = state.results.filter(r => state.student && r.studentNumber === state.student.number);
  $('dashAttempts').textContent = mine.length;
  $('dashBestWpm').textContent = mine.length ? Math.max(...mine.map(r => Number(r.wpm) || 0)) : 0;
  $('dashAccuracy').textContent = (mine.length ? Math.max(...mine.map(r => Number(r.accuracy) || 0)) : 0) + '%';

  const completed = getCompletedRows();
  $('dashCompleted').textContent = `${completed.size}/4`;

  Object.keys(lessons).forEach(key => {
    const row = mine.filter(r => r.lesson === key);
    const best = row.length ? Math.max(...row.map(r => Number(r.wpm) || 0)) : null;
    const bestEl = document.querySelector(`[data-best="${key}"]`);
    const slot = document.querySelector(`[data-done="${key}"]`);
    if (bestEl) bestEl.textContent = `Best: ${best ?? '--'} WPM`;
    if (slot) slot.innerHTML = completed.has(key) ? '<span class="done-dot">✓ 10/10 Completed</span>' : '';
  });

  const challenge = mine.some(r => Number(r.accuracy) >= 95 && Number(r.wpm) >= 20);
  $('challengeBar').style.width = challenge ? '100%' : '35%';
  $('challengeText').textContent = challenge ? 'Challenge completed 🎉' : 'Not completed yet';
}

function finishLesson() {
  if (state.finished) return;
  state.finished = true;
  stopTimer();
  $('typingInput').disabled = true;
  $('typingStatus').textContent = 'Completed';

  const metrics = updateMetrics();
  const typed = $('typingInput').value;
  const seconds = Math.max(1, Math.min(state.duration, Math.round((Date.now() - state.startTime) / 1000)));
  const result = {
    id: `${rowSessionId}-${state.exerciseIndex + 1}`,
    date: new Date().toISOString(),
    studentName: state.student.name,
    studentNumber: state.student.number,
    group: state.student.group || '',
    lesson: state.lessonKey,
    lessonTitle: lessons[state.lessonKey].title,
    exercise: state.exerciseIndex + 1,
    wpm: metrics.wpm,
    accuracy: metrics.accuracy,
    errors: state.errors,
    characters: typed.length,
    duration: seconds,
    rowSessionId
  };

  rowSessionResults.push(result);
  state.results.unshift(result);
  localStorage.setItem('ekt_results', JSON.stringify(state.results));

  const totalExercises = lessons[state.lessonKey].texts.length;
  if (state.exerciseIndex < totalExercises - 1) {
    const finishedNumber = state.exerciseIndex + 1;
    $('typingStatus').textContent = `Exercise ${finishedNumber}/10 complete ✓`;
    toast(`Exercise ${finishedNumber}/10 complete — next exercise`);
    setTimeout(() => {
      state.exerciseIndex += 1;
      pickText();
      resetTyping();
      setRowSessionControls();
      $('typingInput').focus();
    }, 700);
    return;
  }

  rowSessionActive = false;
  markRowCompleted(state.lessonKey);
  setRowSessionControls();
  showRowSessionResult();
  setTimeout(() => showView('resultView'), 300);
}

function showRowSessionResult() {
  const count = rowSessionResults.length || 1;
  const avgWpm = Math.round(rowSessionResults.reduce((s, r) => s + Number(r.wpm || 0), 0) / count);
  const avgAccuracy = Math.round(rowSessionResults.reduce((s, r) => s + Number(r.accuracy || 0), 0) / count);
  const totalErrors = rowSessionResults.reduce((s, r) => s + Number(r.errors || 0), 0);
  const totalChars = rowSessionResults.reduce((s, r) => s + Number(r.characters || 0), 0);
  const totalSeconds = rowSessionResults.reduce((s, r) => s + Number(r.duration || 0), 0);

  $('resultWpm').textContent = avgWpm;
  $('resultAccuracy').textContent = avgAccuracy + '%';
  $('resultErrors').textContent = totalErrors;
  $('resultTyped').textContent = totalChars;
  $('resultIcon').textContent = '🏁';
  $('resultHeading').textContent = 'All 10 exercises completed!';
  $('resultSubtext').textContent = `${lessons[state.lessonKey].title} • 10/10 exercises • ${totalSeconds} seconds total`;

  let medal = { e: '🥉', t: 'Bronze', m: 'Row completed. Keep practicing to improve.' };
  if (avgAccuracy >= 95 && avgWpm >= 30) medal = { e: '🥇', t: 'Gold', m: 'Excellent performance across all 10 exercises!' };
  else if (avgAccuracy >= 90 && avgWpm >= 20) medal = { e: '🥈', t: 'Silver', m: 'Strong performance across the full row.' };
  $('medalEmoji').textContent = medal.e;
  $('medalTitle').textContent = medal.t;
  $('medalText').textContent = medal.m;

  const sendBtn = $('sendResultBtn');
  if (sendBtn) {
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send 10 Results to Trainer';
    sendBtn.onclick = sendRowSessionResults;
  }
  const status = $('syncStatus');
  if (status) status.textContent = 'The row is complete. Send all 10 exercise results to your trainer.';
}

async function sendRowSessionResults() {
  if (!SHEET_WEB_APP_URL || !rowSessionResults.length) return;
  const btn = $('sendResultBtn');
  const status = $('syncStatus');
  const unsent = rowSessionResults.filter(r => !isAttemptSent(r.id));

  if (!unsent.length) {
    if (btn) { btn.disabled = true; btn.textContent = 'All 10 Sent ✓'; }
    if (status) status.textContent = 'All 10 exercise results have already been sent.';
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Sending 10 results…'; }
  if (status) status.textContent = `Sending ${unsent.length} exercise results…`;

  try {
    await fetch(SHEET_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      redirect: 'follow',
      keepalive: true,
      body: JSON.stringify({ batchResults: unsent })
    });
    unsent.forEach(r => markAttemptSent(r.id));
    if (btn) btn.textContent = 'All 10 Sent ✓';
    if (status) status.textContent = 'All 10 exercise results were sent to your trainer.';
    toast('10 results sent to trainer');
  } catch (err) {
    console.warn(err);
    if (btn) { btn.disabled = false; btn.textContent = 'Try Sending 10 Results Again'; }
    if (status) status.textContent = 'Sending failed. Please try again.';
    toast('Could not send results');
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
      <td><strong>${Number(r.rank || 0)}</strong></td>
      <td>${escapeHtml(String(r.studentName || r.initials || 'Trainee'))}</td>
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

  const back = $('backToDashboard');
  if (back) back.onclick = () => {
    if (rowSessionActive) {
      toast('Complete all 10 exercises before leaving this row');
      $('typingInput').focus();
      return;
    }
    stopTimer();
    showView('dashboardView');
    updateDashboard();
  };

  const next = $('newTextBtn');
  if (next) next.onclick = () => {
    if (rowSessionActive) {
      toast('Finish the current exercise to unlock the next one');
      $('typingInput').focus();
    }
  };

  const restart = $('restartLesson');
  if (restart) restart.onclick = () => {
    if (rowSessionActive) {
      resetTyping();
      $('typingInput').focus();
      toast(`Exercise ${state.exerciseIndex + 1}/10 restarted`);
    } else {
      startLesson(state.lessonKey);
    }
  };

  const regPrivacy = document.querySelector('#registerView .privacy-note');
  if (regPrivacy) regPrivacy.textContent = 'Your trainee number remains private. Your full name may appear on the class leaderboard.';
  const boardNote = document.querySelector('.leaderboard-note');
  if (boardNote) boardNote.textContent = 'Full trainee names and group are shown on the class leaderboard. Trainee numbers remain private.';

  window.addEventListener('beforeunload', event => {
    if (!rowSessionActive) return;
    event.preventDefault();
    event.returnValue = '';
  });
});
