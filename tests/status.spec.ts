import { test, expect } from '@playwright/test';
import { Status } from '../utils/status-functions';
import { loadAuthToken } from '../utils/helpers/helpers';

test.describe('Status', () => {
  test('Get status', async () => {
    const token = loadAuthToken();
    const status = new Status(token);
    const response = await status.getStatus();

    await test.step('Validate response status', async () => {
      expect(response.status()).toBe(200);
    });
    const body = await response.json();
    await test.step('Validate status', async () => {
      expect(body).toHaveProperty('status');
      expect(body.status).toBe('OK');
    });
  });
});