```javascript
const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    const logDirectory = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }
    this.logFilePath = path.join(logDirectory, 'app.log');
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    fs.appendFileSync(this.logFilePath, logMessage);
  }

  error(message) {
    const errorMessage = `ERROR: ${message}`;
    this.log(errorMessage);
  }

  info(message) {
    const infoMessage = `INFO: ${message}`;
    this.log(infoMessage);
  }

  warn(message) {
    const warnMessage = `WARN: ${message}`;
    this.log(warnMessage);
  }
}

module.exports = new Logger();
```