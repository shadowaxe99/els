```javascript
const Logger = require('./Logger');
const ErrorHandler = require('./ErrorHandler');

describe('Utility Functions', () => {
  describe('Logger', () => {
    it('should log messages without throwing an error', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      Logger.log('Test message');
      expect(consoleSpy).toHaveBeenCalledWith('Test message');
    });
  });

  describe('ErrorHandler', () => {
    it('should handle errors and return correct error object', () => {
      const testError = new Error('Test error');
      const handledError = ErrorHandler.handleError(testError);
      expect(handledError).toEqual(expect.any(Object));
      expect(handledError.message).toBe('Test error');
    });

    it('should log the error message', () => {
      const consoleSpy = jest.spyOn(console, 'error');
      const testError = new Error('Test error for logging');
      ErrorHandler.handleError(testError);
      expect(consoleSpy).toHaveBeenCalledWith('Error:', 'Test error for logging');
    });
  });
});
```