/**
 * Opens the given URL in the system default browser (outside IDE).
 * Uses OS-native commands so the browser opens as a separate window.
 */
const { execSync } = require('child_process');
const url = process.argv[2] || 'http://localhost:3000';

const isWindows = process.platform === 'win32';

try {
  if (isWindows) {
    // start = opens in system default browser (Edge, Chrome, etc.) - always outside IDE
    execSync(`start "" "${url}"`, { stdio: 'ignore', shell: true });
  } else if (process.platform === 'darwin') {
    execSync(`open "${url}"`, { stdio: 'ignore' });
  } else {
    execSync(`xdg-open "${url}"`, { stdio: 'ignore' });
  }
} catch (err) {
  console.error('Could not open browser:', err.message);
  process.exit(1);
}
