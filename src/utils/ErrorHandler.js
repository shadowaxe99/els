```javascript
class ErrorHandler {
  static handleError(res, error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', details: error.errors });
    }

    if (error.name === 'UnauthorizedError') {
      return res.status(401).json({ message: 'Unauthorized', details: error.message });
    }

    if (error.name === 'NotFoundError') {
      return res.status(404).json({ message: 'Not Found', details: error.message });
    }

    if (error.name === 'ConflictError') {
      return res.status(409).json({ message: 'Conflict', details: error.message });
    }

    return res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }

  static throwValidationError(message) {
    const error = new Error(message);
    error.name = 'ValidationError';
    throw error;
  }

  static throwUnauthorizedError(message) {
    const error = new Error(message);
    error.name = 'UnauthorizedError';
    throw error;
  }

  static throwNotFoundError(message) {
    const error = new Error(message);
    error.name = 'NotFoundError';
    throw error;
  }

  static throwConflictError(message) {
    const error = new Error(message);
    error.name = 'ConflictError';
    throw error;
  }
}

module.exports = ErrorHandler;
```