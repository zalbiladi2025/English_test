# English Keyboard Trainer

## Live site
https://zalbiladi2025.github.io/English_test/typing-trainer/

## Google Sheets results
Spreadsheet: English Keyboard Trainer - Trainee Results

### One-time Apps Script deployment
1. Open the Google Sheet.
2. Choose Extensions > Apps Script.
3. Replace the default code with the contents of `google-apps-script.gs` from this folder.
4. Click Deploy > New deployment.
5. Select type: Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. Deploy and copy the Web App URL ending in `/exec`.
9. Put that URL in `app.js` in:
   `const SHEET_WEB_APP_URL = "...";`

After this, every completed typing attempt will be written to the `Results` sheet.

### Data columns
Timestamp, Trainee Name, Trainee Number, Group / Class, Keyboard Row, Exercise, WPM, Accuracy %, Errors, Characters, Duration (sec), Attempt ID.

The Apps Script also supports:
`?action=leaderboard`
which returns the current leaderboard as JSON for the website's leaderboard view.
