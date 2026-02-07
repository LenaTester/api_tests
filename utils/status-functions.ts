import { request, APIResponse } from '@playwright/test';
import { endpoints } from '../variables/endpoints';

export class Status {
  private accessToken: string;

  constructor(accessToken: string) {
      this.accessToken = accessToken;
  }

  async getStatus(): Promise<APIResponse> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
    }
    const url = endpoints.BASE_URL + endpoints.STATUS;
    const apiContext = await request.newContext({ baseURL: endpoints.BASE_URL });
    const response = await apiContext.get(url, {
          headers
      });
    if (response.status() !== 200) {
      throw new Error(`Failed to get status. Status: ${response.status()}, ${response.statusText()}`);
    }
      return response;
  }
}