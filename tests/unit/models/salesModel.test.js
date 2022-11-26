const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const salesFromDB = require('./sales.model.mock');

describe('Testes de unidade do model de Sales', function () {
  it('Listar todos os products', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    const result = await salesModel.listAll();
    expect(result).to.be.deep.equal(salesFromDB);
  });

  afterEach(sinon.restore);
});
