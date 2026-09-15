// Comprehensive typing test: all keyboard rows + automatic grade out of 10.
// Grade = 60% accuracy + 40% speed. Full speed score is reached at 40 WPM.

(() => {
  const TEST_STORAGE_KEY = 'ekt_comprehensive_test_results';
  const TEST_DURATION = 180;
  const TARGET_WPM = 40;
  const testText = [
    'asdf jkl; sad dad lad ask all fall salad flask',
    'qwerty uiop type write power quiet route upper tower',
    'zxcv bnm,./ zoom van cabin mix banana civic minimum',
    '1234567890 2026 100 250 500 750 900 24680 13579',
    'A skilled trainee types accurately and quickly across every keyboard row in 2026.'
  ].join(' ');

  let test = {
    active: false,
    started: false,
    finished: false,
    startTime: 0,
    timerId: null,
    remaining: TEST_DURATION,
    errors: 0
  };

  function el(tag, attrs = {}, html = '') {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'id') node.id = v;
      else node.setAttribute(k, v);
    });
    node.innerHTML = html;
    return node;
  }

  function installUI() {
    const dashboard = document.getElementById('dashboardView');
    if (!dashboard || document.getElementById('comprehensiveTestBtn')) return;

    const testCard = el('section', { class: 'challenge-card comprehensive-test-card' }, `
      <div>
        <span class="eyebrow">FINAL TYPING TEST</span>
        <h3>Comprehensive Keyboard Test</h3>
        <p>Covers Home, Top, Bottom and Number rows. Final grade is based on speed and accuracy.</p>
      </div>
      <div class="challenge-progress test-launch-box">
        <strong>Grade: /10</strong>
        <button id="comprehensiveTestBtn" class="primary-btn" type="button">Start Comprehensive Test</button>
      </div>`);
    dashboard.appendChild(testCard);

    const main = document.querySelector('main');
    const testView = el('section', { id: 'comprehensiveTestView', class: 'view' }, `
      <div class="trainer-header">
        <button id="testBackBtn" class="ghost-btn" type="button">← Dashboard</button>
        <div>
          <span class="eyebrow">COMPREHENSIVE TEST</span>
          <span class="exercise-counter">All keyboard rows</span>
          <h2>Final Typing Assessment</h2>
        </div>
        <div class="trainer-actions"><span class="status-chip">3 minutes</span></div>
      </div>
      <div class="metrics-row">
        <div class="metric"><span>TIME</span><strong id="testTime">180</strong></div>
        <div class="metric"><span>WPM</span><strong id="testWpm">0</strong></div>
        <div class="metric"><span>ACCURACY</span><strong id="testAccuracy">100%</strong></div>
        <div class="metric"><span>ERRORS</span><strong id="testErrors">0</strong></div>
      </div>
      <section class="typing-card">
        <div class="typing-card-top"><span id="testStatus" class="status-chip">Ready</span><strong>Do not paste text</strong></div>
        <div id="testPrompt" class="text-prompt"></div>
        <input id="testInput" type="text" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="Start typing here..." />
        <div class="progress-track"><div id="testProgress" class="progress-fill"></div></div>
      </section>
      <section class="panel test-rules">
        <strong>Assessment rule</strong>
        <p>Accuracy = 60% of the grade. Speed = 40% of the grade. 40 WPM earns the full speed score.</p>
      </section>`);

    const resultView = el('section', { id: 'comprehensiveTestResultView', class: 'view' }, `
      <div class="result-card card">
        <div class="result-icon">📝</div>
        <span class="eyebrow">FINAL TEST RESULT</span>
        <h2>Comprehensive Keyboard Test</h2>
        <p id="testResultSummary"></p>
        <div class="test-grade-circle"><strong id="testGrade">0.0</strong><span>/10</span></div>
        <div class="result-grid">
          <div><strong id="testResultWpm">0</strong><span>WPM</span></div>
          <div><strong id="testResultAccuracy">0%</strong><span>Accuracy</span></div>
          <div><strong id="testAccuracyPoints">0</strong><span>Accuracy points /6</span></div>
          <div><strong id="testSpeedPoints">0</strong><span>Speed points /4</span></div>
        </div>
        <div class="medal-box"><span>🎓</span><div><strong id="testLevel">Result</strong><p id="testFeedback"></p></div></div>
        <div class="result-actions">
          <button id="saveTestResultBtn" class="primary-btn" type="button">Save Result</button>
          <button id="retryTestBtn" class="secondary-btn" type="button">Retry Test</button>
          <button id="testResultBackBtn" class="ghost-btn" type="button">Back to Dashboard</button>
        </div>
        <p id="testSaveStatus" class="privacy-note">The result is ready to be stored in the trainer records.</p>
      </div>`);

    main.appendChild(testView);
    main.appendChild(resultView);

    document.getElementById('comprehensiveTestBtn').addEventListener('click', startTest);
    document.getElementById('testInput').addEventListener('input', onInput);
    document.getElementById('testInput').addEventListener('paste', e => e.preventDefault());
    document.getElementById('testBackBtn').addEventListener('click', attemptLeaveTest);
    document.getElementById('retryTestBtn').addEventListener('click', startTest);
    document.getElementById('testResultBackBtn').addEventListener('click', backToDashboard);
    document.getElementById('saveTestResultBtn').addEventListener('click', saveCurrentResult);

    renderPrompt('');
  }

  function hideAllViews() {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  }

  function startTest() {
    if (!state.student) {
      toast('Register first');
      return;
    }
    clearInterval(test.timerId);
    test = { active: true, started: false, finished: false, startTime: 0, timerId: null, remaining: TEST_DURATION, errors: 0 };
    hideAllViews();
    document.getElementById('comprehensiveTestView').classList.add('active');
    const input = document.getElementById('testInput');
    input.value = '';
    input.disabled = false;
    document.getElementById('testTime').textContent = TEST_DURATION;
    document.getElementById('testWpm').textContent = '0';
    document.getElementById('testAccuracy').textContent = '100%';
    document.getElementById('testErrors').textContent = '0';
    document.getElementById('testProgress').style.width = '0%';
    document.getElementById('testStatus').textContent = 'Ready';
    renderPrompt('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => input.focus(), 150);
  }

  function startTimer() {
    if (test.started) return;
    test.started = true;
    test.startTime = Date.now();
    document.getElementById('testStatus').textContent = 'Testing';
    test.timerId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - test.startTime) / 1000);
      test.remaining = Math.max(0, TEST_DURATION - elapsed);
      document.getElementById('testTime').textContent = test.remaining;
      updateMetrics();
      if (test.remaining <= 0) finishTest();
    }, 250);
  }

  function onInput() {
    if (test.finished) return;
    startTimer();
    const input = document.getElementById('testInput');
    let typed = input.value;
    if (typed.length > testText.length) {
      typed = typed.slice(0, testText.length);
      input.value = typed;
    }
    test.errors = countErrors(typed);
    renderPrompt(typed);
    updateMetrics();
    document.getElementById('testProgress').style.width = `${Math.min(100, typed.length / testText.length * 100)}%`;
    if (typed.length === testText.length) finishTest();
  }

  function countErrors(typed) {
    let errors = 0;
    for (let i = 0; i < typed.length; i++) if (typed[i] !== testText[i]) errors++;
    return errors;
  }

  function metrics() {
    const typed = document.getElementById('testInput').value;
    const elapsed = Math.max(1, (Date.now() - (test.startTime || Date.now())) / 1000);
    let correct = 0;
    for (let i = 0; i < typed.length; i++) if (typed[i] === testText[i]) correct++;
    const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
    const wpm = Math.max(0, Math.round((correct / 5) / (elapsed / 60)));
    return { typed, correct, accuracy, wpm, elapsed };
  }

  function updateMetrics() {
    const m = metrics();
    document.getElementById('testWpm').textContent = m.wpm;
    document.getElementById('testAccuracy').textContent = `${m.accuracy}%`;
    document.getElementById('testErrors').textContent = test.errors;
    return m;
  }

  function renderPrompt(typed) {
    const target = document.getElementById('testPrompt');
    if (!target) return;
    target.innerHTML = [...testText].map((ch, i) => {
      let cls = 'char';
      if (i < typed.length) cls += typed[i] === ch ? ' correct' : ' incorrect';
      else if (i === typed.length) cls += ' current';
      return `<span class="${cls}">${ch === ' ' ? '&nbsp;' : escapeHtml(ch)}</span>`;
    }).join('');
  }

  function calculateGrade(wpm, accuracy) {
    const accuracyPoints = Math.max(0, Math.min(6, (accuracy / 100) * 6));
    const speedPoints = Math.max(0, Math.min(4, (wpm / TARGET_WPM) * 4));
    const grade = Math.round((accuracyPoints + speedPoints) * 10) / 10;
    return {
      grade,
      accuracyPoints: Math.round(accuracyPoints * 10) / 10,
      speedPoints: Math.round(speedPoints * 10) / 10
    };
  }

  function finishTest() {
    if (test.finished) return;
    test.finished = true;
    test.active = false;
    clearInterval(test.timerId);
    document.getElementById('testInput').disabled = true;
    const m = updateMetrics();
    const score = calculateGrade(m.wpm, m.accuracy);
    const duration = Math.max(1, Math.min(TEST_DURATION, Math.round(m.elapsed)));
    const result = {
      id: `test-${state.student.number}-${Date.now()}`,
      type: 'Comprehensive Test',
      date: new Date().toISOString(),
      studentName: state.student.name,
      studentNumber: state.student.number,
      group: state.student.group || '',
      wpm: m.wpm,
      accuracy: m.accuracy,
      errors: test.errors,
      characters: m.typed.length,
      duration,
      grade: score.grade,
      accuracyPoints: score.accuracyPoints,
      speedPoints: score.speedPoints,
      targetWpm: TARGET_WPM
    };
    window.__ektCurrentTestResult = result;
    showTestResult(result);
  }

  function showTestResult(result) {
    hideAllViews();
    document.getElementById('comprehensiveTestResultView').classList.add('active');
    document.getElementById('testGrade').textContent = result.grade.toFixed(1);
    document.getElementById('testResultWpm').textContent = result.wpm;
    document.getElementById('testResultAccuracy').textContent = `${result.accuracy}%`;
    document.getElementById('testAccuracyPoints').textContent = result.accuracyPoints.toFixed(1);
    document.getElementById('testSpeedPoints').textContent = result.speedPoints.toFixed(1);
    document.getElementById('testResultSummary').textContent = `${result.studentName} • ${result.duration} seconds • ${result.characters} characters`;

    let level = 'Needs Practice';
    let feedback = 'Continue practicing accuracy first, then increase speed.';
    if (result.grade >= 9) { level = 'Excellent'; feedback = 'Outstanding speed and accuracy.'; }
    else if (result.grade >= 8) { level = 'Very Good'; feedback = 'Strong overall keyboard performance.'; }
    else if (result.grade >= 7) { level = 'Good'; feedback = 'Good result with room to improve speed or accuracy.'; }
    else if (result.grade >= 6) { level = 'Satisfactory'; feedback = 'Acceptable result. More practice will raise the score.'; }
    document.getElementById('testLevel').textContent = level;
    document.getElementById('testFeedback').textContent = feedback;
    document.getElementById('testSaveStatus').textContent = 'Result ready to save to trainer records.';
    const btn = document.getElementById('saveTestResultBtn');
    btn.disabled = false;
    btn.textContent = 'Save Result';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function saveCurrentResult() {
    const result = window.__ektCurrentTestResult;
    if (!result) return;
    const rows = JSON.parse(localStorage.getItem(TEST_STORAGE_KEY) || '[]');
    if (!rows.some(r => r.id === result.id)) rows.unshift(result);
    localStorage.setItem(TEST_STORAGE_KEY, JSON.stringify(rows.slice(0, 100)));

    // Temporary compatibility: also save to the current trainer endpoint.
    // Azure/SharePoint will replace this endpoint after Microsoft connection is configured.
    const payload = {
      id: result.id,
      studentName: result.studentName,
      studentNumber: result.studentNumber,
      group: result.group,
      lesson: 'comprehensive-test',
      lessonTitle: `Comprehensive Test — Grade ${result.grade}/10`,
      exercise: 1,
      wpm: result.wpm,
      accuracy: result.accuracy,
      errors: result.errors,
      characters: result.characters,
      duration: result.duration,
      grade: result.grade
    };

    const btn = document.getElementById('saveTestResultBtn');
    const status = document.getElementById('testSaveStatus');
    btn.disabled = true;
    btn.textContent = 'Saving…';
    fetch(SHEET_WEB_APP_URL, { method: 'POST', mode: 'no-cors', keepalive: true, body: JSON.stringify(payload) })
      .then(() => {
        btn.textContent = 'Saved ✓';
        status.textContent = `Saved — Grade ${result.grade.toFixed(1)}/10`;
        toast('Test result saved');
      })
      .catch(() => {
        btn.disabled = false;
        btn.textContent = 'Try Saving Again';
        status.textContent = 'Could not send the result. It is still saved on this device.';
      });
  }

  function attemptLeaveTest() {
    if (test.active && !test.finished) {
      toast('Finish the comprehensive test before leaving');
      document.getElementById('testInput').focus();
      return;
    }
    backToDashboard();
  }

  function backToDashboard() {
    hideAllViews();
    document.getElementById('dashboardView').classList.add('active');
    if (typeof updateDashboard === 'function') updateDashboard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('beforeunload', event => {
    if (!test.active || test.finished) return;
    event.preventDefault();
    event.returnValue = '';
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installUI);
  else installUI();
})();
