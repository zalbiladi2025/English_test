const SPREADSHEET_ID = '1geCChxhXgigUpCseEpJXjBp_L_n1R_TECFxu4rHd-vU';
const SHEET_NAME = 'Results';
const TEST_SHEET_NAME = 'Comprehensive Test Results';
const TEST_TARGET_WPM = 40;

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const practiceSheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!practiceSheet) throw new Error('Results sheet not found');

    // تأكد دائمًا أن ورقة الاختبار موجودة قبل استقبال أي نتيجة.
    getOrCreateTestSheet_(spreadsheet);

    if (Array.isArray(data.batchResults)) {
      const results = data.batchResults.slice(0, 20);
      let inserted = 0;
      let duplicates = 0;

      results.forEach(function(item) {
        const outcome = appendPracticeAttemptIfNew_(practiceSheet, item || {});
        if (outcome === 'inserted') inserted++;
        if (outcome === 'duplicate') duplicates++;
      });

      return jsonResponse({
        ok: true,
        batch: true,
        inserted: inserted,
        duplicates: duplicates
      });
    }

    if (isComprehensiveTest_(data)) {
      const testSheet = getOrCreateTestSheet_(spreadsheet);
      const outcome = appendTestAttemptIfNew_(testSheet, data);

      return jsonResponse({
        ok: true,
        type: 'comprehensive-test',
        duplicate: outcome === 'duplicate',
        attemptId: safeText(data.id, 80)
      });
    }

    const outcome = appendPracticeAttemptIfNew_(practiceSheet, data);

    return jsonResponse({
      ok: true,
      type: 'practice',
      duplicate: outcome === 'duplicate',
      attemptId: safeText(data.id, 80)
    });

  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function appendPracticeAttemptIfNew_(sheet, data) {
  const attemptId = safeText(data.id, 80);
  if (!attemptId) throw new Error('Missing attempt ID');

  if (hasAttemptId_(sheet, 12, attemptId)) return 'duplicate';

  sheet.appendRow([
    new Date(),
    safeText(data.studentName, 80),
    safeText(data.studentNumber, 30),
    safeText(data.group, 50),
    safeText(data.lessonTitle || data.lesson, 100),
    safeNumber(data.exercise, 1),
    safeNumber(data.wpm, 0),
    Math.max(0, Math.min(100, safeNumber(data.accuracy, 0))),
    safeNumber(data.errors, 0),
    safeNumber(data.characters, 0),
    safeNumber(data.duration, 0),
    attemptId
  ]);

  return 'inserted';
}

function appendTestAttemptIfNew_(sheet, data) {
  const attemptId = safeText(data.id, 80);
  if (!attemptId) throw new Error('Missing attempt ID');

  if (hasAttemptId_(sheet, 14, attemptId)) return 'duplicate';

  const wpm = Math.max(0, safeNumber(data.wpm, 0));
  const accuracy = Math.max(0, Math.min(100, safeNumber(data.accuracy, 0)));

  const accuracyScore = round1_((accuracy / 100) * 6);
  const speedScore = round1_(Math.min(4, Math.max(0, (wpm / TEST_TARGET_WPM) * 4)));
  const finalGrade = round1_(accuracyScore + speedScore);
  const gradeLevel = gradeLevel_(finalGrade);

  sheet.appendRow([
    new Date(),
    safeText(data.studentName, 80),
    safeText(data.studentNumber, 30),
    safeText(data.group, 50),
    wpm,
    accuracy,
    safeNumber(data.errors, 0),
    safeNumber(data.characters, 0),
    safeNumber(data.duration, 0),
    accuracyScore,
    speedScore,
    finalGrade,
    gradeLevel,
    attemptId
  ]);

  return 'inserted';
}

function getOrCreateTestSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(TEST_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(TEST_SHEET_NAME);
  }

  ensureTestHeaders_(sheet);
  return sheet;
}

function ensureTestHeaders_(sheet) {
  const headers = [
    'Timestamp',
    'Student Name',
    'Trainee Number',
    'Group',
    'WPM',
    'Accuracy %',
    'Errors',
    'Characters',
    'Duration Seconds',
    'Accuracy Score /6',
    'Speed Score /4',
    'Final Grade /10',
    'Grade Level',
    'Attempt ID'
  ];

  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  let needsUpdate = false;

  headers.forEach(function(header, index) {
    if (String(current[index] || '').trim() !== header) needsUpdate = true;
  });

  if (needsUpdate) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

// شغّل هذه الدالة مرة واحدة بعد لصق الكود وقبل الاختبارات.
// ستنشئ ورقة Comprehensive Test Results فورًا بدون انتظار أي اختبار.
function setupTestSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateTestSheet_(spreadsheet);
  return sheet.getName();
}

function hasAttemptId_(sheet, columnNumber, attemptId) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;

  const match = sheet
    .getRange(2, columnNumber, lastRow - 1, 1)
    .createTextFinder(attemptId)
    .matchEntireCell(true)
    .findNext();

  return Boolean(match);
}

function isComprehensiveTest_(data) {
  return String(data.lesson || '').toLowerCase() === 'comprehensive-test' ||
    String(data.type || '').toLowerCase() === 'comprehensive test' ||
    String(data.lessonTitle || '').toLowerCase().indexOf('comprehensive test') !== -1;
}

function round1_(value) {
  return Math.round(Number(value || 0) * 10) / 10;
}

function gradeLevel_(grade) {
  const g = Number(grade || 0);
  if (g >= 9) return 'Excellent - ممتاز';
  if (g >= 8) return 'Very Good - جيد جدًا';
  if (g >= 7) return 'Good - جيد';
  if (g >= 6) return 'Satisfactory - مقبول';
  return 'Needs Practice - يحتاج إلى تدريب إضافي';
}

function doGet(e) {
  try {
    const action = String((e && e.parameter && e.parameter.action) || 'health').toLowerCase();
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // مجرد فتح رابط Web App يضمن وجود ورقة الاختبار مسبقًا.
    getOrCreateTestSheet_(spreadsheet);

    if (action === 'leaderboard') {
      const sheet = spreadsheet.getSheetByName(SHEET_NAME);
      if (!sheet) throw new Error('Results sheet not found');

      const values = sheet.getDataRange().getValues();
      const best = {};

      values.slice(1).forEach(function (r) {
        if (!r[1] || !r[2]) return;

        const key = String(r[2]);
        const wpm = Number(r[6] || 0);
        const accuracy = Number(r[7] || 0);
        const score = wpm * (accuracy / 100);

        const row = {
          studentName: safeText(r[1], 80),
          group: safeText(r[3], 50),
          lessonTitle: safeText(r[4], 100),
          wpm: wpm,
          accuracy: accuracy,
          score: score
        };

        if (!best[key] || score > best[key].score) best[key] = row;
      });

      const leaderboard = Object.keys(best)
        .map(function (key) { return best[key]; })
        .sort(function (a, b) {
          return b.score - a.score || b.accuracy - a.accuracy || b.wpm - a.wpm;
        })
        .slice(0, 30)
        .map(function (r, i) {
          return {
            rank: i + 1,
            studentName: r.studentName,
            group: r.group,
            wpm: r.wpm,
            accuracy: r.accuracy,
            lessonTitle: r.lessonTitle
          };
        });

      return publicResponse({ ok: true, leaderboard: leaderboard }, e);
    }

    return publicResponse({
      ok: true,
      service: 'EnglishTyping',
      status: 'ready',
      testSheet: TEST_SHEET_NAME
    }, e);
  } catch (err) {
    return publicResponse({ ok: false, error: String(err) }, e);
  }
}

function safeText(value, maxLength) {
  let text = String(value == null ? '' : value).trim().slice(0, maxLength || 100);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function safeNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : Number(fallback || 0);
}

function publicResponse(obj, e) {
  const callback = String((e && e.parameter && e.parameter.callback) || '');

  if (callback && /^[A-Za-z_$][0-9A-Za-z_$.]*$/.test(callback)) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(obj) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return jsonResponse(obj);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
