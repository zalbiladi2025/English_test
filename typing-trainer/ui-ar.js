// Arabic interface localization. English typing content stays LTR.
(() => {
  document.documentElement.lang = 'ar';
  document.documentElement.dir = 'rtl';

  const textById = {
    leaderboardTopBtn: '🏆 لوحة المتصدرين',
    soundToggle: '🔊 الصوت',
    resetApp: 'إعادة ضبط',
    welcomeName: 'اختر صف لوحة المفاتيح للتدريب',
    studentNameMini: 'المتدرب',
    viewLeaderboardBtn: '🏆 لوحة المتصدرين',
    viewResultsBtn: 'سجل المحاولات',
    challengeText: 'لم يكتمل التحدي بعد',
    backToDashboard: 'العودة للوحة الرئيسية ←',
    restartLesson: 'إعادة التمرين',
    newTextBtn: 'التمرين التالي',
    typingStatus: 'جاهز',
    resultHeading: 'أحسنت!',
    sendResultBtn: 'إرسال النتيجة للمدرب',
    retryBtn: 'إعادة المحاولة',
    continueBtn: 'العودة للدروس',
    syncStatus: 'أرسل كل محاولة مكتملة مرة واحدة للمدرب.',
    downloadCsvBtn: 'تصدير CSV',
    resultsBackBtn: 'عودة',
    refreshLeaderboardBtn: 'تحديث',
    leaderboardBackBtn: 'عودة',
    leaderboardStatus: 'جاري تحميل لوحة المتصدرين…'
  };

  const exactMap = {
    'English Keyboard Trainer': 'مدرب الطباعة باللغة الإنجليزية',
    'Touch typing practice for trainees': 'تدريب المتدربين على الطباعة باللمس',
    'TRAIN • PRACTICE • IMPROVE': 'تعلّم • تدرّب • تطوّر',
    'Build typing speed with the correct keyboard rows.': 'طوّر سرعتك في الكتابة باستخدام صفوف لوحة المفاتيح بالطريقة الصحيحة.',
    'Practice the home row, top row, bottom row, and number row with live accuracy, speed, and progress tracking.': 'تدرّب على صف الارتكاز والصف العلوي والسفلي وصف الأرقام مع متابعة السرعة والدقة والتقدم.',
    '⚡ Live WPM': '⚡ السرعة المباشرة',
    '🎯 Accuracy': '🎯 الدقة',
    '🏆 Leaderboard': '🏆 لوحة المتصدرين',
    '📊 Saved results': '📊 النتائج المحفوظة',
    'Trainee Registration': 'تسجيل المتدرب',
    'Enter your details before starting.': 'أدخل بياناتك قبل البدء.',
    'Full name': 'الاسم الكامل',
    'Trainee number': 'رقم المتدرب',
    'Group / class': 'المجموعة / الشعبة',
    'optional': 'اختياري',
    'Start Training →': 'ابدأ التدريب ←',
    'Your trainee number is used for trainer records and is never shown on the public leaderboard.': 'يستخدم رقم المتدرب في سجل المدرب فقط ولا يظهر في لوحة المتصدرين العامة.',
    'WELCOME BACK': 'مرحبًا بك',
    'Choose your training row': 'اختر صف لوحة المفاتيح للتدريب',
    'Select a lesson. Your progress and best results are saved.': 'اختر درسًا. يتم حفظ تقدمك وأفضل نتائجك.',
    'Attempts': 'المحاولات',
    'Best WPM': 'أفضل سرعة',
    'Best Accuracy': 'أفضل دقة',
    'Rows Completed': 'الصفوف المكتملة',
    'MY PROGRESS': 'تقدمي',
    'Choose a keyboard row': 'اختر صفًا من لوحة المفاتيح',
    'DAILY CHALLENGE': 'التحدي اليومي',
    'Accuracy Challenge': 'تحدي الدقة',
    'Complete any row with at least 95% accuracy and 20 WPM.': 'أكمل أي صف بدقة لا تقل عن 95% وسرعة 20 كلمة في الدقيقة.',
    'HOME ROW': 'صف الارتكاز',
    'TOP ROW': 'الصف العلوي',
    'BOTTOM ROW': 'الصف السفلي',
    'NUMBER ROW': 'صف الأرقام',
    'Home Row Practice': 'تدريب صف الارتكاز',
    'Top Row Practice': 'تدريب الصف العلوي',
    'Bottom Row Practice': 'تدريب الصف السفلي',
    'Number Row Practice': 'تدريب صف الأرقام',
    'TIME': 'الوقت',
    'WPM': 'كلمة/دقيقة',
    'ACCURACY': 'الدقة',
    'ERRORS': 'الأخطاء',
    'Ready': 'جاهز',
    'Typing': 'جاري الكتابة',
    'Completed': 'مكتمل',
    'Next exercise': 'التمرين التالي',
    'Restart': 'إعادة التمرين',
    'Place your fingers on the home row.': 'ضع أصابعك على صف الارتكاز.',
    'SESSION COMPLETE': 'اكتملت الجلسة',
    'Great work!': 'أحسنت!',
    'Accuracy': 'الدقة',
    'Errors': 'الأخطاء',
    'Characters': 'الحروف',
    'Bronze': 'برونزي',
    'Silver': 'فضي',
    'Gold': 'ذهبي',
    'Keep practicing.': 'استمر في التدريب.',
    'ATTEMPT HISTORY': 'سجل المحاولات',
    'My results': 'نتائجي',
    'Date': 'التاريخ',
    'Row': 'الصف',
    'Time': 'الوقت',
    'CLASS CHALLENGE': 'تحدي الفصل',
    'Full trainee names and group are shown. Trainee numbers remain private.': 'تظهر أسماء المتدربين والمجموعة، بينما تبقى أرقام المتدربين خاصة.',
    'Rank': 'الترتيب',
    'Trainee': 'المتدرب',
    'Group': 'المجموعة',
    'Best Row': 'أفضل صف',
    'Designed for classroom typing practice': 'مصمم لتدريب الطباعة داخل الفصل'
  };

  const lessonNames = {
    home: ['تدريب صف الارتكاز', 'تدرّب على صف الارتكاز مع إرشاد المفاتيح والتغذية الراجعة المباشرة.'],
    top: ['تدريب الصف العلوي', 'تدرّب على الصف العلوي مع إرشاد المفاتيح والتغذية الراجعة المباشرة.'],
    bottom: ['تدريب الصف السفلي', 'تدرّب على الصف السفلي مع إرشاد المفاتيح والتغذية الراجعة المباشرة.'],
    numbers: ['تدريب صف الأرقام', 'تدرّب على صف الأرقام مع إرشاد المفاتيح والتغذية الراجعة المباشرة.']
  };

  function setStaticText() {
    Object.entries(textById).forEach(([id, text]) => {
      const node = document.getElementById(id);
      if (!node) return;
      if (id === 'welcomeName' && window.state && state.student) {
        node.textContent = `مرحبًا ${state.student.name.split(' ')[0]}، اختر صف التدريب`;
      } else if (!node.textContent || /^[A-Za-z0-9 #🏆🔊🔇←→✓…]+/.test(node.textContent.trim())) {
        node.textContent = text;
      }
    });

    const name = document.getElementById('traineeName');
    const number = document.getElementById('traineeNumber');
    const group = document.getElementById('traineeGroup');
    const typing = document.getElementById('typingInput');
    if (name) name.placeholder = 'مثال: أحمد علي';
    if (number) number.placeholder = 'مثال: 2026001';
    if (group) group.placeholder = 'مثال: الشعبة أ';
    if (typing) { typing.placeholder = 'ابدأ الكتابة هنا...'; typing.dir = 'ltr'; }

    document.querySelectorAll('#durationSelect option').forEach(o => {
      if (o.value === '30') o.textContent = '30 ثانية';
      if (o.value === '60') o.textContent = 'دقيقة واحدة';
      if (o.value === '120') o.textContent = 'دقيقتان';
    });
  }

  function translateTextNodes(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const raw = node.nodeValue;
      const t = raw.trim();
      if (!t) return;
      if (exactMap[t]) node.nodeValue = raw.replace(t, exactMap[t]);
      else if (/^Exercise \d+ of \d+$/.test(t)) {
        const m = t.match(/Exercise (\d+) of (\d+)/);
        node.nodeValue = `التمرين ${m[1]} من ${m[2]}`;
      } else if (/^\d+ exercises$/.test(t)) {
        node.nodeValue = `${parseInt(t, 10)} تمارين`;
      } else if (/^Best:/.test(t)) {
        node.nodeValue = t.replace('Best:', 'الأفضل:');
      }
    });
  }

  function translateLessonCards() {
    document.querySelectorAll('.lesson-card').forEach(card => {
      const key = card.dataset.lesson;
      const info = lessonNames[key];
      if (!info) return;
      const h = card.querySelector('h3');
      const p = card.querySelector('p');
      if (h) h.textContent = info[0];
      if (p) p.textContent = info[1];
    });
  }

  function translateDynamic() {
    setStaticText();
    translateTextNodes();
    translateLessonCards();

    const lessonKey = window.state && state.lessonKey;
    if (lessonKey && lessonNames[lessonKey]) {
      const title = document.getElementById('lessonTitle');
      if (title) title.textContent = lessonNames[lessonKey][0];
    }

    const ex = document.getElementById('exerciseCounter');
    if (ex) {
      const m = ex.textContent.match(/Exercise (\d+) of (\d+)/);
      if (m) ex.textContent = `التمرين ${m[1]} من ${m[2]}`;
    }
  }

  const style = document.createElement('style');
  style.textContent = `
    html[dir="rtl"] body { direction: rtl; text-align: right; }
    html[dir="rtl"] .topbar, html[dir="rtl"] .welcome-row, html[dir="rtl"] .section-title-row,
    html[dir="rtl"] .trainer-header, html[dir="rtl"] .challenge-card { direction: rtl; }
    html[dir="rtl"] #textPrompt, html[dir="rtl"] #typingInput, html[dir="rtl"] #testPrompt,
    html[dir="rtl"] #testInput, html[dir="rtl"] .keys-preview, html[dir="rtl"] .keyboard { direction: ltr; text-align: left; }
    html[dir="rtl"] .trainer-header > div:nth-child(2) { text-align: center; }
    html[dir="rtl"] th, html[dir="rtl"] td { text-align: right; }
    html[dir="rtl"] .medal-box { text-align: right; }
    html[dir="rtl"] .exercise-counter { margin-left: 0; margin-right: 10px; }
  `;
  document.head.appendChild(style);

  function run() {
    translateDynamic();
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        translateDynamic();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(run, 20));
  else setTimeout(run, 20);
})();