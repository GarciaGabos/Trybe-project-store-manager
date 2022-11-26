const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const productsFromDB = require('./products.model.mock');

describe('Testes de unidade do model de Produtos', function () {
  it('Listar todos os products', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    const result = await productsModel.listAll();
    expect(result).to.be.deep.equal(productsFromDB);
  });
  afterEach(sinon.restore);
});