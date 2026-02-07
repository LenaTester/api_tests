import { request, APIResponse } from '@playwright/test';
import { endpoints } from '../variables/endpoints';

export class Books {
  private accessToken: string;

  constructor(accessToken: string) {
      this.accessToken = accessToken;
  }

  async getAllBooks(): Promise<APIResponse> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
    }
    const url = endpoints.BASE_URL + endpoints.BOOKS;
    const apiContext = await request.newContext({ baseURL: endpoints.BASE_URL });
    const response = await apiContext.get(url, {
          headers
      });
    if (response.status() !== 200) {
      throw new Error(`Failed to get status. Status: ${response.status()}, ${response.statusText()}`);
    }
      return response;
  }

    async getBookById(bookId: string): Promise<APIResponse> {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
    }
    const url = endpoints.BASE_URL + endpoints.BOOKS + `/${bookId}`;
    const apiContext = await request.newContext({ baseURL: endpoints.BASE_URL });
    const response = await apiContext.get(url, {
          headers
      });
    if (response.status() !== 200) {
      throw new Error(`Failed to get book by Id. Status: ${response.status()}, ${response.statusText()}`);
    }
      return response;
  }
}