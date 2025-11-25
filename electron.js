const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 550,   // Adjusted width for a better slot machine fit
    height: 900,  // Taller height so it fits without scrolling
    resizable: false,      // LOCKS the window size
    autoHideMenuBar: true, // REMOVES the "File Edit View" bar
    // frame: false,       // Uncomment this line if you want to remove the title bar (Minimize/Close buttons) too
    icon: path.join(__dirname, 'public/favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile(path.join(__dirname, 'dist/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});