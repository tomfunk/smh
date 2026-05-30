# Steal My Heart — Setup Guide

## Free Hosting Options (pick one)

### Option A: GitHub Pages (easiest, zero config)
1. `git init && git add . && git commit -m "launch"`
2. Push to a GitHub repo
3. Settings → Pages → Deploy from branch `main` → `/root`
4. Live at `https://yourusername.github.io/smh`

### Option B: Netlify Drop (literally drag and drop)
1. Go to netlify.com/drop
2. Drag the project folder onto the page
3. Done. You get a URL like `smh-loving-panda-123.netlify.app`
4. Optionally link a GitHub repo for auto-deploy on push

### Option C: Cloudflare Pages (also free, also easy)
1. Push to GitHub
2. cloudflare.com/pages → connect repo → deploy
3. Custom subdomain at `*.pages.dev`

---

## Google Sheets Backend Setup

### Step 1 — Create the Spreadsheet
1. Go to sheets.google.com → New spreadsheet
2. Name it "Steal My Heart Database" or whatever
3. Copy the spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/THIS_PART_HERE/edit`

### Step 2 — Create the Apps Script
1. In the spreadsheet: Extensions → Apps Script
2. Delete the placeholder `myFunction()` code
3. Paste the contents of `Code.gs`
4. Save (Cmd+S)

### Step 3 — Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone** (this is the insecure part, congrats)
5. Click Deploy → Authorize → Copy the Web App URL

### Step 4 — Wire it up
Open `index.html` and replace line 1 of the script section:
```js
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```
with your actual URL.

### Step 5 — Make the sheet public (for the bit)
1. In your Google Sheet: Share → Change to "Anyone with the link can view"
2. Optionally paste the share link in the footer of `index.html` for full commitment to the bit

---

## What happens when someone submits
- Their data goes into the "Victims" sheet
- The app looks for anyone else with the same last-4 SSN digits
- Matches are returned and displayed with a HeartSync™ compatibility percentage
- The sheet is publicly viewable by anyone with the link (this is the joke)

## Notes
- The site works in demo mode even without the Apps Script configured — it just won't persist data or find real matches
- The footer has a small disclaimer that this is satire — keep it there
