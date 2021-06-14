/* eslint-disable quotes */
/* eslint-disable no-undef */

const { expect } = require('chai');

describe('SimpleStorage', function () {
  let dev, alice, charlie, bob, SimpleStorage, simplestorage;
  const INIT_STORAGE = 'Hello Hardfork!';
  beforeEach(async function () {
    [dev, alice] = await ethers.getSigners();
    SimpleStorage = await ethers.getContractFactory('SimpleStorage');
    simplestorage = await SimpleStorage.connect(dev).deploy(INIT_STORAGE);
    await simplestorage.deployed()
  })
  it("Should return the inital data : 'Hello Hardfork' ", async function () {
    expect(await simplestorage.getData()).to.equal('Hello Hardfork!');
  });
  it('Should change the value, on signers input', async function () {
    await simplestorage.connect(alice).setData('Hello World');
    expect(await simplestorage.getData()).to.equal('Hello World');
  })
  it('Should emit event on signers input', async function () {
    expect(await simplestorage.connect(alice).setData('Hello World'))
    .to.emit(simplestorage, 'DataSet')
    .withArgs(alice.address, 'Hello World');
  })
});
