const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const productsFomDB = require('../models/products.model.mock');

describe('Testa a camada Products Controller', function () {

  it('Busca por todos os produtos', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAllProducts').resolves({ tupe: null, message: productsFomDB });
    await productsController.listAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFomDB);

  });

  it('Busca pelo produto por id', async function () {
    const req = { params: 1 };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductById').resolves({ tupe: null, message: productsFomDB[0] });
    await productsController.listById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFomDB[0]);
  });
  afterEach(sinon.restore);
});