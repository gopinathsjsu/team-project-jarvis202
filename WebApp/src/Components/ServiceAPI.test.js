import mockAxios from "axios";
import ServiceAPI from './ServiceAPI';

jest.mock('axios');

describe('API Calls()', () => {
  it('calls axios sendOTP get method`', async() => {
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Successfully sent OTP" }
    })
  );
  ServiceAPI.sendOTP(9999999999);
  expect(await mockAxios.get).toBeCalled();
  });

  it('calls axios addCustomer post method`', async() => {
    mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "customer added successfully" }
    })
  );
  ServiceAPI.addCustomer(111111);
  expect(await mockAxios.post).toBeCalled();
  });

  it('calls axios addRecepient post method`', async() => {
    mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "receipient added successfully" }
    })
  );
  ServiceAPI.addRecepient(123234);
  expect(await mockAxios.post).toBeCalled();
  });

  it('calls axios getCustomerDetailsByUserName get method`', async() => {
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Customer details for testuser received successfully" }
    })
  );
  ServiceAPI.getCustomerDetailsByUserName('testuser');
  expect(await mockAxios.get).toBeCalled();
  });

  it('calls axios getCustContactDetails get method`', async() => {
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Customer contact details for testuser received successfully" }
    })
  );
  ServiceAPI.getCustContactDetails('testuser');
  expect(await mockAxios.get).toBeCalled();
  });

  it('calls axios addAccount post method`', async() => {
    mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Successfully added account" }
    })
  );
  ServiceAPI.addAccount(111111);
  expect(await mockAxios.post).toBeCalled();
  });

  it('calls axios getRecepientsByCustId get method`', async() => {
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Successfully received receipient details" }
    })
  );
  ServiceAPI.getRecepientsByCustId(123124);
  expect(await mockAxios.get).toBeCalled();
  });

  it('calls axios getAllCustomers get method`', async() => {
    mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: "Successfully received customer details" }
    })
  );
  ServiceAPI.getAllCustomers();
  expect(await mockAxios.get).toBeCalled();
  });

});

