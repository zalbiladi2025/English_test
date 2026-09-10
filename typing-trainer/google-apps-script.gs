const SPREADSHEET_ID = '1geCChxhXgigUpCseEpJXjBp_L_n1R_TECFxu4rHd-vU';
const SHEET_NAME = 'Results';

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const attemptId = safeText(data.id, 80);
    if (!attemptId) return jsonResponse({ ok: false, error: 'Missing attempt ID' });

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Results sheet not found');

    // Server-side idempotency: the same training attempt can never be stored twice.
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const match = sheet
        .getRange(2, 12, lastRow - 1, 1)
        .createTextFinder(attemptId)
        .matchEntireCell(true)
        .findNext();
      if (match) return jsonResponse({ ok: true, duplicate: true, attemptId: attemptId });
    }

    sheet.appendRow([
      new Date(),
      safeText(data.studentName, 80),
      safeText(data.studentNumber, 30),
      safeText(data.group, 50),
      safeText(data.lessonTitle || data.lesson, 80),
      safeNumber(data.exercise, 1),
      safeNumber(data.wpm, 0),
      safeNumber(data.accuracy, 0),
      safeNumber(data.errors, 0),
      safeNumber(data.characters, 0),
      safeNumber(data.duration, 0),
      attemptId
    ]);

    return jsonResponse({ ok: true, duplicate: false, attemptId: attemptId });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function doGet(e) {
  try {
    const action = String((e && e.parameter && e.parameter.action) || 'health').toLowerCase();

    if (action === 'leaderboard') {
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
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
          initials: publicInitials(r[1]),
          group: safeText(r[3], 50),
          lessonTitle: safeText(r[4], 80),
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
            initials: r.initials,
            group: r.group,
            wpm: r.wpm,
            accuracy: r.accuracy,
            lessonTitle: r.lessonTitle
          };
        });

      return publicResponse({ ok: true, leaderboard: leaderboard }, e);
    }

    // Do not expose the private Results sheet through a public GET endpoint.
    return publicResponse({ ok: true, service: 'EnglishTyping', status: 'ready' }, e);
  } catch (err) {
    return publicResponse({ ok: false, error: String(err) }, e);
  }
}

function safeText(value, maxLength) {
  let text = String(value == null ? '' : value).trim().slice(0, maxLength || 100);
  // Prevent spreadsheet formula injection from trainee-entered fields.
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function safeNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : Number(fallback || 0);
}

function publicInitials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (!parts.length) return 'T';
  return parts.map(function (part) { return part.charAt(0).toUpperCase(); }).join('.') + '.';
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
