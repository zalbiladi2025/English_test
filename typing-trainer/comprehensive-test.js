// اختبار شامل للكتابة: جميع صفوف لوحة المفاتيح + درجة من 10
// الدرجة = 60% للدقة + 40% للسرعة. الدرجة الكاملة للسرعة عند 40 WPM.

(() => {
  const TEST_STORAGE_KEY = 'ekt_comprehensive_test_results';
  const TEST_DURATION = 600;
  const TARGET_WPM = 40;

  // نص مبسط مناسب للصف الأول الثانوي، مع تغطية صفوف الحروف والأرقام.
  const passageBlocks = [
    'Students use computers every day. Good typing helps them write homework, search for information, and finish school tasks.',
    'Keep your hands relaxed and look at the screen. Use the correct finger for each key and return your fingers to the home row.',
    'The top row has q w e r t y u i o p. The home row has a s d f g h j k l. The bottom row has z x c v b n m.',
    'Numbers are useful in school and computer work. Practice 1 2 3 4 5 6 7 8 9 0 and type 2026 100 250 500 750 900.',
    'Accuracy is more important than speed at first. Type calmly, keep a steady rhythm, and try to make fewer mistakes.',
    'Practice helps you improve. A good typist can write emails, reports, notes, and simple computer commands faster.'
  ];

  // طول مناسب لاختبار عشر دقائق للطلاب المبتدئين والمتوسطين.
  const testText = Array.from({ length: 4 }, () => passageBlocks.join(' ')).join(' ');

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
        <span class="eyebrow">الاختبار النهائي للكتابة</span>
        <h3>اختبار لوحة المفاتيح الشامل</h3>
        <p>يشمل الصف العلوي وصف الارتكاز والصف السفلي وصف الأرقام. الدرجة تعتمد على السرعة والدقة.</p>
      </div>
      <div class="challenge-progress test-launch-box">
        <strong>10 دقائق • الدرجة من 10</strong>
        <button id="comprehensiveTestBtn" class="primary-btn" type="button">ابدأ الاختبار الشامل</button>
      </div>`);
    dashboard.appendChild(testCard);

    const main = document.querySelector('main');
    const testView = el('section', { id: 'comprehensiveTestView', class: 'view' }, `
      <div class="trainer-header">
        <button id="testBackBtn" class="ghost-btn" type="button">← العودة للوحة الرئيسية</button>
        <div>
          <span class="eyebrow">الاختبار الشامل</span>
          <span class="exercise-counter">جميع صفوف لوحة المفاتيح</span>
          <h2>اختبار الكتابة النهائي</h2>
        </div>
        <div class="trainer-actions"><span class="status-chip">10 دقائق</span></div>
      </div>
      <div class="metrics-row">
        <div class="metric"><span>الوقت</span><strong id="testTime">600</strong></div>
        <div class="metric"><span>كلمة/دقيقة</span><strong id="testWpm">0</strong></div>
        <div class="metric"><span>الدقة</span><strong id="testAccuracy">100%</strong></div>
        <div class="metric"><span>الأخطاء</span><strong id="testErrors">0</strong></div>
      </div>
      <section class="typing-card test-typing-card">
        <div class="typing-card-top"><span id="testStatus" class="status-chip">جاهز</span><strong>اكتب النص الإنجليزي كما يظهر أمامك</strong></div>
        <div id="testPrompt" class="text-prompt test-prompt-window" dir="ltr"></div>
        <label class="test-input-label" for="testInput">اكتب هنا:</label>
        <input id="testInput" dir="ltr" type="text" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="ابدأ الكتابة هنا..." />
        <div class="progress-track"><div id="testProgress" class="progress-fill"></div></div>
      </section>
      <section class="panel test-rules">
        <strong>طريقة احتساب الدرجة</strong>
        <p>مدة الاختبار 10 دقائق. الدقة = 60% من الدرجة، والسرعة = 40%. الحصول على 40 كلمة في الدقيقة يمنح الدرجة الكاملة للسرعة.</p>
      </section>`);

    const resultView = el('section', { id: 'comprehensiveTestResultView', class: 'view' }, `
      <div class="result-card card">
        <div class="result-icon">📝</div>
        <span class="eyebrow">نتيجة الاختبار النهائي</span>
        <h2>اختبار لوحة المفاتيح الشامل</h2>
        <p id="testResultSummary"></p>
        <div class="test-grade-circle"><strong id="testGrade">0.0</strong><span>/10</span></div>
        <div class="result-grid">
          <div><strong id="testResultWpm">0</strong><span>كلمة/دقيقة</span></div>
          <div><strong id="testResultAccuracy">0%</strong><span>الدقة</span></div>
          <div><strong id="testAccuracyPoints">0</strong><span>درجة الدقة /6</span></div>
          <div><strong id="testSpeedPoints">0</strong><span>درجة السرعة /4</span></div>
        </div>
        <div class="medal-box"><span>🎓</span><div><strong id="testLevel">النتيجة</strong><p id="testFeedback"></p></div></div>
        <div class="result-actions">
          <button id="saveTestResultBtn" class="primary-btn" type="button">حفظ النتيجة</button>
          <button id="retryTestBtn" class="secondary-btn" type="button">إعادة الاختبار</button>
          <button id="testResultBackBtn" class="ghost-btn" type="button">العودة للوحة الرئيسية</button>
        </div>
        <p id="testSaveStatus" class="privacy-note">النتيجة جاهزة للحفظ في سجل المدرب.</p>
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
      toast('سجّل بياناتك أولاً');
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
    document.getElementById('testStatus').textContent = 'جاهز';
    renderPrompt('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => input.focus({ preventScroll: true }), 200);
  }

  function startTimer() {
    if (test.started) return;
    test.started = true;
    test.startTime = Date.now();
    document.getElementById('testStatus').textContent = 'جاري الاختبار';
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
      return `<span class="${cls}" data-index="${i}">${ch === ' ' ? '&nbsp;' : escapeHtml(ch)}</span>`;
    }).join('');

    // إبقاء الحرف الحالي مرئياً داخل نافذة النص دون تحريك الصفحة كلها.
    const current = target.querySelector('.char.current');
    if (current) {
      const wanted = current.offsetTop - (target.clientHeight / 2) + (current.offsetHeight / 2);
      target.scrollTop = Math.max(0, wanted);
    }
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
    document.getElementById('testResultSummary').textContent = `${result.studentName} • ${result.duration} ثانية • ${result.characters} حرفًا`;

    let level = 'يحتاج إلى تدريب إضافي';
    let feedback = 'ركز على الدقة أولاً ثم زد السرعة تدريجيًا.';
    if (result.grade >= 9) { level = 'ممتاز'; feedback = 'أداء ممتاز في السرعة والدقة.'; }
    else if (result.grade >= 8) { level = 'جيد جدًا'; feedback = 'أداء قوي ومتوازن في الكتابة.'; }
    else if (result.grade >= 7) { level = 'جيد'; feedback = 'نتيجة جيدة ويمكن تحسين السرعة أو الدقة أكثر.'; }
    else if (result.grade >= 6) { level = 'مقبول'; feedback = 'نتيجة مقبولة، والتدريب المنتظم سيرفع مستواك.'; }
    document.getElementById('testLevel').textContent = level;
    document.getElementById('testFeedback').textContent = feedback;
    document.getElementById('testSaveStatus').textContent = 'النتيجة جاهزة للحفظ في سجل المدرب.';
    const btn = document.getElementById('saveTestResultBtn');
    btn.disabled = false;
    btn.textContent = 'حفظ النتيجة';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function saveCurrentResult() {
    const result = window.__ektCurrentTestResult;
    if (!result) return;
    const rows = JSON.parse(localStorage.getItem(TEST_STORAGE_KEY) || '[]');
    if (!rows.some(r => r.id === result.id)) rows.unshift(result);
    localStorage.setItem(TEST_STORAGE_KEY, JSON.stringify(rows.slice(0, 100)));

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
      grade: result.grade,
      accuracyPoints: result.accuracyPoints,
      speedPoints: result.speedPoints
    };

    const btn = document.getElementById('saveTestResultBtn');
    const status = document.getElementById('testSaveStatus');
    btn.disabled = true;
    btn.textContent = 'جارٍ الحفظ…';
    fetch(SHEET_WEB_APP_URL, { method: 'POST', mode: 'no-cors', keepalive: true, body: JSON.stringify(payload) })
      .then(() => {
        btn.textContent = 'تم الحفظ ✓';
        status.textContent = `تم الحفظ — الدرجة ${result.grade.toFixed(1)}/10`;
        toast('تم حفظ نتيجة الاختبار');
      })
      .catch(() => {
        btn.disabled = false;
        btn.textContent = 'إعادة محاولة الحفظ';
        status.textContent = 'تعذر إرسال النتيجة. ما زالت محفوظة على هذا الجهاز.';
      });
  }

  function attemptLeaveTest() {
    if (test.active && !test.finished) {
      toast('أكمل الاختبار الشامل قبل المغادرة');
      document.getElementById('testInput').focus({ preventScroll: true });
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