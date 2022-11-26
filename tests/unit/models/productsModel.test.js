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

  it('Listar products por ID', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    const result = await productsModel.listById(1);
    expect(result).to.be.deep.equal(productsFromDB[0]);
  });
  afterEach(sinon.restore);
});
