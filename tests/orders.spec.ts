import { test, expect, APIResponse } from '@playwright/test';
import { Orders } from '../utils/orders-functions';
import { loadAuthToken, Validator } from '../utils/helpers/helpers';
import { ordersVariables } from '../variables/orders-variables';
import { createUserEmail } from '../utils/helpers/helpers';

test.describe('Orders', () => {
  test('CRUD Order', async () => {
    const token = loadAuthToken();
    const orders = new Orders(token);
    const validator = new Validator();
    let newOrderResponse: APIResponse;
    let getAllOrdersResponse: APIResponse;
    let allOrdersBody: Array<Record<string, string | number>>;
    let newOrderBody: Record<string, any>;
    let updateOrderResponse: APIResponse;
    const updatedCustomerName = createUserEmail();
    let deleteOrderResponse: APIResponse;
    await test.step('Create order and validate it', async () => {
      newOrderResponse = await orders.createOrder(ordersVariables.newOrder);
      newOrderBody = await newOrderResponse.json();
      expect(newOrderResponse.status()).toBe(201);
      expect(newOrderBody).toHaveProperty('created');
      expect(newOrderBody.orderId).toHaveLength(21);
      expect(typeof newOrderBody.orderId).toBe('string');
    });   
    await test.step('Validate, that orders array is not empty', async () => {
      getAllOrdersResponse = await orders.getAllOrders();
      allOrdersBody = await getAllOrdersResponse.json();
      expect(allOrdersBody).toBeInstanceOf(Array<Record<string, string | number>>);
      expect(allOrdersBody.length).toBeGreaterThan(0);
    });
    await test.step('Validate, that expected order is found in orders array', async () => {
      const expectedOrder = ordersVariables.newOrder;
      const isFound = validator.findObjectInArrayBySeveralKeys(allOrdersBody, expectedOrder);
      expect(isFound).toBe(true);
    });
    await test.step('Update order - change customer name', async () => {
      updateOrderResponse = await orders.updateOrder(
        newOrderBody.orderId, 
        {"customerName": updatedCustomerName});
        expect(updateOrderResponse.status()).toBe(204);
    });
    await test.step('Validate, that updated  order is found in orders array', async () => {
      const expectedOrder = {...ordersVariables.newOrder, customerName: updatedCustomerName};
      getAllOrdersResponse = await orders.getAllOrders();
      allOrdersBody = await getAllOrdersResponse.json();
      const isFound = validator.findObjectInArrayBySeveralKeys(allOrdersBody, expectedOrder);
      expect(isFound).toBe(true);
    });
    await test.step('Delete order and validate deletion', async () => {
      deleteOrderResponse = await orders.deleteOrder(newOrderBody.orderId);
      expect(deleteOrderResponse.status()).toBe(404);
    });   
  });

  test('Validate order is found by Id', async () => {
    const token = loadAuthToken();
    const orders = new Orders(token);
    let newOrderResponse: APIResponse;
    let newOrderBody: Record<string, any>;
    let orderById: APIResponse;
    let getOrderById: Record<string, any>;
    const expectedOrder = ordersVariables.newOrder;
    await test.step('Create order', async () => {
      newOrderResponse = await orders.createOrder(ordersVariables.newOrder);
      newOrderBody = await newOrderResponse.json();
    });
    await test.step('Get order by Id and validate response', async () => {
      orderById = await orders.getOrderById(newOrderBody.orderId);
      getOrderById = await orderById.json();
      expect(orderById.status()).toBe(200);
      expect(getOrderById).toMatchObject(expectedOrder);
    });  
  });
});