const AWS = require('aws-sdk-mock');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { save, handler } = require('../src/caller');

chai.use(chaiAsPromised);
chai.should();

describe("Test DynamoDB", () => {

  beforeEach(() => {
    AWS.restore();
  });

  it ("Should save an object with an id", () => {
    const value = {};
    AWS.mock('DynamoDB', 'putItem', function (params, callback) {
      params.should.have.property('TableName', 'Example');
      params.should.have.property('Item');
      params.Item.should.have.property('id');
      params.Item.id.should.have.property('N', '2');
      params.Item.should.have.property('name');
      params.Item.name.should.have.property('S', 'Curtis');
      
      callback(null, value);
    });
    
    return save({ id: 2, name: 'Curtis' })
      .should
      .eventually
      .equal(value);
  });
  
  it ("Should fail when an error occurs", () => {
    const err = {};
    AWS.mock('DynamoDB', 'putItem', function (params, callback) {
      callback(err);
    });
    
    return save({ id: 2, name: 'Curtis' })
      .should
      .be
      .rejected;
  });
  
});
