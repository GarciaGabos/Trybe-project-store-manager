// const chai = require('chai');
// const { expect } = chai;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');

// chai.use(sinonChai);

// const salesService = require('../../../src/services/sales.service');
// const salesController = require('../../../src/controllers/sales.controller');
// const salesFromDB = require('../models/sales.model.mock');

// describe('Testa a camada Sales Controller', function () {

  // it('Busca por todas as vendas', async function () {
  //   const req = {};
  //   const res = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon.stub(salesService, 'getAllSales ').resolves(salesFromDB);
  //   await salesController.getAllSales(req, res);
  //   expect(res.status).to.have.been.calledWith(200);
  //   expect(res.json).to.have.been.calledWith(salesFromDB);
  // });

  // it('Busca pela venda com id', async function () {
  //   const req = { params: 1 };
  //   const res = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon.stub(salesService, 'getSaleById').resolves(salesFromDB[0]);
  //   await salesController.getSaleById(req, res);
  //   expect(res.status).to.have.been.calledWith(200);
  //   expect(res.json).to.have.been.calledWith(salesFromDB[0]);
  // });
//   afterEach(sinon.restore);
// });