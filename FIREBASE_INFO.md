# Firebase Login Tracker — Access Info

## Database URL
https://qr-logintracker-default-rtdb.asia-southeast1.firebasedatabase.app/

## How to view login data
1. Go to https://console.firebase.google.com
2. Sign in with your Google account
3. Select project: **qr-logintracker**
4. Click **Realtime Database** in the left sidebar
5. Click the **Data** tab
6. Expand the `logins` node to see all entries

## What each entry contains
- `t` — timestamp of the login (ISO format, e.g. `2026-03-30T14:23:00.000Z`)
- `d` — device type (`mobile` or `desktop`)

## Security Rules (set this if not done yet)
Go to Realtime Database → Rules tab and paste:
```json
{
  "rules": {
    "logins": {
      ".read": false,
      ".write": true
    }
  }
}
```
This makes the data write-only from the outside — only you can read it via the console.

## How it works
Every successful login silently sends a POST request to Firebase.
No SDK, no extra libraries — just a single fetch call in mainJS.js inside the `_unlock()` function.
If Firebase is unreachable, the login still works normally — no errors shown to the user.
