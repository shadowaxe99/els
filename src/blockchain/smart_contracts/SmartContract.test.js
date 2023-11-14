```javascript
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NFTContract', function () {
  let NFTContract;
  let nftContractInstance;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    NFTContract = await ethers.getContractFactory('NFTContract');
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    nftContractInstance = await NFTContract.deploy();
    await nftContractInstance.deployed();
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await nftContractInstance.owner()).to.equal(owner.address);
    });

    it('Should mint a new token successfully', async function () {
      const mintTx = await nftContractInstance.connect(addr1).mint(addr1.address);
      await mintTx.wait();

      const balance = await nftContractInstance.balanceOf(addr1.address);
      expect(balance).to.equal(1);
    });
  });

  describe('Transactions', function () {
    it('Should transfer tokens between accounts', async function () {
      const mintTx = await nftContractInstance.connect(addr1).mint(addr1.address);
      await mintTx.wait();

      await expect(() => nftContractInstance.connect(addr1).transferFrom(addr1.address, addr2.address, 1))
        .to.changeTokenBalances(nftContractInstance, [addr1, addr2], [-1, 1]);
    });

    it('Should fail if sender doesn’t have enough tokens', async function () {
      const initialOwnerBalance = await nftContractInstance.balanceOf(owner.address);

      await expect(nftContractInstance.connect(addr1).transferFrom(owner.address, addr2.address, 1))
        .to.be.revertedWith('ERC721: transfer caller is not owner nor approved');

      expect(await nftContractInstance.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});

describe('TransactionContract', function () {
  let TransactionContract;
  let transactionContractInstance;

  beforeEach(async function () {
    TransactionContract = await ethers.getContractFactory('TransactionContract');
    transactionContractInstance = await TransactionContract.deploy();
    await transactionContractInstance.deployed();
  });

  describe('Deployment', function () {
    it('Should have an initial balance of 0', async function () {
      const balance = await transactionContractInstance.getBalance();
      expect(balance).to.equal(0);
    });
  });

  describe('Transactions', function () {
    it('Should accept payments', async function () {
      const [owner] = await ethers.getSigners();
      const paymentAmount = ethers.utils.parseEther('1.0');
      const paymentTx = await owner.sendTransaction({
        to: transactionContractInstance.address,
        value: paymentAmount,
      });
      await paymentTx.wait();

      const newBalance = await transactionContractInstance.getBalance();
      expect(newBalance).to.equal(paymentAmount);
    });
  });
});
```