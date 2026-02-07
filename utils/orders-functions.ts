import { request, APIResponse } from '@playwright/test';
import { endpoints } from '../variables/endpoints';

export class Orders {
  private accessToken: string;

  constructor(accessToken: string) {
      this.accessToken = accessToken;
  }

  async getAllOrders(): Promise<APIResponse> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
    }
    const url = endpoints.BASE_URL + endpoints.ORDERS;
    const apiContext = await request.newContext({ baseURL: endpoints.BASE_URL });
    const response = await apiContext.get(url, {
          headers
      });
    if (response.status() !== 200) {
      throw new Error(`Failed to get status. Status: ${response.status()}, ${response.statusText()}`);
    }
      return response;
  }

    async getOrderById(orderId: string): Promise<APIResponse> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
    }
    const url = endpoints.BASE_URL + endpoints.ORDERS + `/${orderId}`;
    const apiContext = await request.newContext({ baseURL: endpoints.BASE_URL });
    const response = await apiContext.get(url, {
          headers
      });
    if (response.status() !== 200) {
      throw new Error(`Failed to get order by Id. Status: ${response.status()}, ${response.statusText()}`);
    }
      return response;
  }

  async createOrder(orderData: Record<string, string | number>): Promise<APIResponse> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
    }
    const url = endpoints.BASE_URL + endpoints.ORDERS;
    const apiContext = await request.newContext({ baseURL: endpoints.BASE_URL });
    const response = await apiContext.post(url, {
          headers,
          data: orderData
      });
    if (response.status() !== 201) {
      throw new Error(`Failed to create order. Status: ${response.status()}, ${response.statusText()}`);
    }
      return response;
  }

  async updateOrder(orderId: string, orderData: Record<string, string | number>): Promise<APIResponse> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
    }
    const url = endpoints.BASE_URL + endpoints.ORDERS + `/${orderId}`;
    const apiContext = await request.newContext({ baseURL: endpoints.BASE_URL });
    const response = await apiContext.patch(url, {
          headers,
          data: orderData
      });
    if (response.status() !== 204) {
      throw new Error(`Failed to update order. Status: ${response.status()}, ${response.statusText()}`);
    }
      return response;
  }

  async deleteOrder(orderId: string): Promise<APIResponse> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
    }
    const url = endpoints.BASE_URL + endpoints.ORDERS + `/${orderId}`;
    const apiContext = await request.newContext({ baseURL: endpoints.BASE_URL });
    const response = await apiContext.post(url, {
          headers,
      });
    if (response.status() !== 404) {
      throw new Error(`Failed to delete order. Status: ${response.status()}, ${response.statusText()}`);
    }
      return response;
  }
}