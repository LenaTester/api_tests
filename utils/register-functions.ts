import { request, APIResponse } from '@playwright/test';
import { endpoints } from '../variables/endpoints';

export class Registration {
  private clientName: string;
  private clientEmail: string;

  constructor(clientName: string, clientEmail: string) {
      this.clientName = clientName;
      this.clientEmail = clientEmail;
  }

  async register(): Promise<APIResponse> {
    const headers = {
      'Content-Type': 'application/json'
    }
    const url = endpoints.BASE_URL + endpoints.API_CLIENT_REGISTER;
    const apiContext = await request.newContext({ baseURL: endpoints.BASE_URL });
    const response = await apiContext.post(url, {
      headers,
        data: {
          clientName: this.clientName,
          clientEmail: this.clientEmail
        }
      });
    if (response.status() !== 201) {
      throw new Error(`Failed to register client. Status: ${response.status()}, ${response.statusText()}`);
    }
      return response;
  }
}