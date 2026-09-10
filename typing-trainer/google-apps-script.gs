const SPREADSHEET_ID = '1geCChxhXgigUpCseEpJXjBp_L_n1R_TECFxu4rHd-vU';
const SHEET_NAME = 'Results';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Results sheet not found');

    sheet.appendRow([
      new Date(),
      data.studentName || '',
      String(data.studentNumber || ''),
      data.group || '',
      data.lessonTitle || data.lesson || '',
      Number(data.exercise || 1),
      Number(data.wpm || 0),
      Number(data.accuracy || 0),
      Number(data.errors || 0),
      Number(data.characters || 0),
      Number(data.duration || 0),
      String(data.id || '')
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Results sheet not found');

    const values = sheet.getDataRange().getValues();
    const rows = values.slice(1).filter(r => r[1] && r[2]).map(r => ({
      timestamp: r[0],
      studentName: r[1],
      studentNumber: String(r[2]),
      group: r[3],
      lessonTitle: r[4],
      exercise: Number(r[5] || 1),
      wpm: Number(r[6] || 0),
      accuracy: Number(r[7] || 0),
      errors: Number(r[8] || 0),
      characters: Number(r[9] || 0),
      duration: Number(r[10] || 0),
      id: String(r[11] || '')
    }));

    const action = (e.parameter.action || 'results').toLowerCase();
    if (action === 'leaderboard') {
      const best = {};
      rows.forEach(r => {
        const key = r.studentNumber;
        const score = r.wpm * (r.accuracy / 100);
        if (!best[key] || score > best[key].score) best[key] = { ...r, score };
      });
      const leaderboard = Object.values(best)
        .sort((a, b) => b.score - a.score || b.accuracy - a.accuracy || b.wpm - a.wpm)
        .slice(0, 50)
        .map((r, i) => ({ rank: i + 1, studentName: r.studentName, studentNumber: r.studentNumber, group: r.group, wpm: r.wpm, accuracy: r.accuracy, lessonTitle: r.lessonTitle }));
      return jsonResponse({ ok: true, leaderboard });
    }

    return jsonResponse({ ok: true, results: rows });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
