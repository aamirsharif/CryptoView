# CryptoView

## Crypto Trading Platform

This is a simple MERN stack application that displays current prices of cryptocurrencies and allows users to trade them.

**Features:**

- **Real-time Cryptocurrency Prices:** Retrieves and displays the latest prices from a trusted cryptocurrency API.
- **Trading Functionality:** Allows users to buy and sell cryptocurrencies.
- **Secure Authentication:** Uses JWT authentication to protect user accounts.
- **User Dashboard:** Displays trading history, portfolio, and other relevant information.

**Getting Started:**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/labs-web3/CryptoView.git
   ```

2. **Install Dependencies:**

   ```bash
   cd CryptoView
   npm install
   ```

3. **Set up Environment Variables:**

   - Create a `.env` file at the root of the project.
   - Add the following environment variables:
     ```
      SECRET=cryptoviewsecret
      MONG_URI=mongodb+srv://cryptoviewuser:xi65HX5e3lRklWw4@cluster0.lxgas.mongodb.net/?retryWrites=true&w=majority&appName=cryptoview
      PORT=4000
      VITE_X_CG_DEMO_API_KEY=CG-1t8kdBZJMA1YUmpjF5nypF6R
      SEPOLIA_RPC_URL=https://eth-sepolia.api.onfinality.io/public
      ETHERSCAN_API_KEY=I9RDFRYTF5HJ2P4YEQN8CGEGCU6HGPHYQX
     ```

4. **Start the Server:**

   ```bash
   npm start
   ```

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:5173`.

### API Endpoints

#### 1. Fetch Recent Transactions
   - **Endpoint:** `GET /api/crypto-transactions/:address`
   - **Description:** Fetches the latest transactions for a given blockchain address.
   - **Example Usage:**
     ```bash
     curl -X GET http://localhost:4000/api/crypto-transactions/0x819e48036d23Be4f3Eb0c8626e5089deCfb2673A
     ```

#### 2. Fetch Transactions by Date Range
   - **Endpoint:** `GET /api/crypto-transactions/:address/:startTimeStamp/:endTimeStamp`
   - **Description:** Fetches transactions for a given address within a specified date range.
   - **Example Usage:**
     ```bash
     curl -X GET http://localhost:4000/api/crypto-transactions/0x819e48036d23Be4f3Eb0c8626e5089deCfb2673A/1717183667/1741967107
     ```

#### 3. Get NFT Metadata
   - **Endpoint:** `GET /api/nfts/metadata/:address/:tokenId`
   - **Description:** Retrieves metadata for a specific NFT.
   - **Example Usage:**
     ```bash
     curl -X GET http://localhost:4000/api/nfts/metadata/0x819e48036d23Be4f3Eb0c8626e5089deCfb2673A/1
     ```

#### 4. Fetch Token Balance
   - **Endpoint:** `GET /api/token-balance/:contractAddress/:walletAddress`
   - **Description:** Fetches the token balance for a specific wallet address.
   - **Example Usage:**
     ```bash
     curl -X GET http://localhost:4000/api/token-balance/0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14/0xD0081080Ae8493cf7340458Eaf4412030df5FEEb
     ```

**Project Structure:**

```
crypto-trading-platform/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.js
│   └── index.js
├── public/
└── server/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── server.js
```

**Technologies Used:**

- **Frontend:** React, Redux, Axios, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, JWT
- **API:** [Cryptocurrency API](https://example.com/api)

**Contributing:**

Contributions are welcome! Please create a pull request with your changes.

**License:**

This project is licensed under the MIT License.
