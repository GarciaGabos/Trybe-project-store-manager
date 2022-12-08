const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesFromDB = require('../models/sales.model.mock');
const salesService = require('../../../src/services/sales.service');

describe('Testes de unidade do model de Sales', function () {

  it('Id não existe', async function () {
    const expected = { message: 'Sale not found' };
    sinon.stub(salesModel, 'listById').resolves([]);
    const result = await salesService.getSaleById(98);
    resulWanted = result.message
    expect(resulWanted).to.be.deep.equal(expected);
  });
  afterEach(sinon.restore);
});