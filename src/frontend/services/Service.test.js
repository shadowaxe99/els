import { jest } from '@jest/globals';
import AuthService from './AuthService';
import UserService from './UserService';
import PaymentService from './PaymentService';

describe('Service Tests', () => {
  describe('AuthService', () => {
    it('should authenticate a user with valid credentials', async () => {
      const mockCredentials = { username: 'testUser', password: 'testPass' };
      const mockResponse = { authToken: '12345', userProfile: { id: '1', username: 'testUser' } };
      jest.spyOn(AuthService, 'login').mockResolvedValue(mockResponse);

      const response = await AuthService.login(mockCredentials.username, mockCredentials.password);
      expect(response).toEqual(mockResponse);
      expect(AuthService.login).toHaveBeenCalledWith(mockCredentials.username, mockCredentials.password);
    });
  });

  describe('UserService', () => {
    it('should fetch user data for a given user ID', async () => {
      const userId = '1';
      const mockUserData = { id: '1', username: 'testUser', email: 'test@example.com' };
      jest.spyOn(UserService, 'getUserData').mockResolvedValue(mockUserData);

      const userData = await UserService.getUserData(userId);
      expect(userData).toEqual(mockUserData);
      expect(UserService.getUserData).toHaveBeenCalledWith(userId);
    });
  });

  describe('PaymentService', () => {
    it('should process payment for a given user and product', async () => {
      const mockPaymentDetails = { userId: '1', productId: '101', amount: 100 };
      const mockResponse = { success: true, transactionId: 'txn_12345' };
      jest.spyOn(PaymentService, 'processPayment').mockResolvedValue(mockResponse);

      const response = await PaymentService.processPayment(mockPaymentDetails.userId, mockPaymentDetails.productId, mockPaymentDetails.amount);
      expect(response).toEqual(mockResponse);
      expect(PaymentService.processPayment).toHaveBeenCalledWith(mockPaymentDetails.userId, mockPaymentDetails.productId, mockPaymentDetails.amount);
    });
  });
});