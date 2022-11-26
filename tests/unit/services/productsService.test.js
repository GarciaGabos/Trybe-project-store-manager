const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const productsFromDB = require('../models/products.model.mock');
const productsService = require('../../../src/services/products.service');

describe('Testes de unidade do Service de Produtos', function () {
  it('Listar todos os products', async function () {
    sinon.stub(productsModel, 'listAll').resolves(productsFromDB);
    const result = await productsService.getAllProducts();
    resulWanted = result.message
    expect(resulWanted).to.be.deep.equal(productsFromDB);
  });

  it('Id não existe', async function () {
    const expected = { message: 'Product not found' };
    sinon.stub(productsModel, 'listById').resolves(undefined);
    const result = await productsService.getProductById(98);
    resulWanted = result.message
    expect(resulWanted).to.be.deep.equal(expected);

  });

  it('Busca por um Id que existe', async function () {
    sinon.stub(productsModel, 'listById').resolves(productsFromDB[0]);
    const result = await productsService.getProductById(1);
    resulWanted = result.message
    expect(resulWanted).to.be.deep.equal(productsFromDB[0]);
  });
  afterEach(sinon.restore);
});