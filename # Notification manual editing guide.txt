# Notification Containers — Edit Guide

## 🎵 New Songs Added (top-left, cycles with album art)

**Add a song** — open `index.html`, find the `#new-song-notif` block and add a new line:
```html
<div class="notif-entry" data-img="audio_images/FILENAME.jpg" data-title="Artist - Song Title"></div>
```
Replace `FILENAME.jpg` with the actual image filename in the `audio_images/` folder.

**Remove a song** — delete that `notif-entry` line.

---

## 🗑️ Removed Songs (below new songs, cycles with album art)

**Add an entry** — inside `#secondary-notif`, add:
```html
<div class="removed-entry" data-img="audio_images/FILENAME.jpg" data-title="Artist - Song Title"></div>
```

**Remove an entry** — delete that `removed-entry` line.

---

## 💬 New Messages (top-right)

**Change the message text** — find this in `index.html`:
```html
<span id="messages-notif-text">3 new messages added</span>
```
Edit the text between the tags.

**Change the label** — find:
```html
<span id="messages-notif-label">💬 New Messages</span>
```

---

## Hiding / Showing any notification

Add `style="display: none;"` to the container div to hide it:
```html
<div id="new-song-notif" style="display: none;">
<div id="secondary-notif" style="display: none;">
<div id="messages-notif" style="display: none;">
```
Remove that attribute to show it again.

---

## Adding songs to the actual playlist (`mainJS.js`)

Find the `audioFiles` array and add/remove entries:
```js
const audioFiles = [
  "audio_list/Be Brave - Owl City.mp3",
  "audio_list/Your New Song.mp3",  // ← add here
  ...
];
```
Make sure the `.mp3` file is in `audio_list/` and the matching `.jpg` is in `audio_images/` with the exact same filename.
