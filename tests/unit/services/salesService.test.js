// const { expect } = require('chai');
// const sinon = require('sinon');

// const salesModel = require('../../../src/models/sales.model');
// const salesFromDB = require('../models/sales.model.mock');
// const salesService = require('../../../src/services/sales.service');

// describe('Testes de unidade do model de Sales', function () {
  // it('Listar todas as sales', async function () {
  //   sinon.stub(salesModel, 'listAll').resolves(salesFromDB);
  //   const result = await salesService.getAllSales();
  //   expect(result).to.be.deep.equal(salesFromDB);
  // });

  // it('Id não existe', async function () {
  //   const expected = { message: 'Product not found' };
  //   sinon.stub(salesModel, 'listById').resolves(undefined);
  //   const result = await salesService.getSaleById(98);
  //   resulWanted = result.message
  //   expect(result).to.be.deep.equal(expected);
  // });

  // it('Busca por um Id que existe', async function () {
  //   sinon.stub(salesModel, 'listById').resolves(salesFromDB[0]);
  //   const result = await salesService.getSaleById(1);
  //   resulWanted = result.message
  //   expect(resulWanted).to.be.deep.equal(salesFromDB[0]);
  // });
//   afterEach(sinon.restore);
// });