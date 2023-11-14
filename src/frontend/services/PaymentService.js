```javascript
import axios from 'axios';
import { authToken } from './AuthService'; // Assuming AuthService exports authToken

const PaymentService = {
  // Function to handle product purchases
  handlePurchase: async (productId, quantity) => {
    try {
      const response = await axios.post('/api/payment/purchase', {
        productId,
        quantity,
        authToken
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error processing payment.');
    }
  },

  // Function to handle NFT transactions
  handleNFTPurchase: async (nftId, price) => {
    try {
      const response = await axios.post('/api/payment/nft-purchase', {
        nftId,
        price,
        authToken
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error processing NFT transaction.');
    }
  },

  // Function to retrieve transaction history for a user
  getTransactionHistory: async () => {
    try {
      const response = await axios.get('/api/payment/transaction-history', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error retrieving transaction history.');
    }
  }
};

export default PaymentService;
```