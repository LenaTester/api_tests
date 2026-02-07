import { test, expect } from '@playwright/test';
import { Registration } from '../utils/register-functions';
import { createUserEmail } from '../utils/helpers/helpers';

test.describe('Client Registration', () => {
  test('New client registration is successful', async () => {
    const clientName = 'Postman';
    const clientEmail = createUserEmail();
    const registration = new Registration(clientName, clientEmail);
    const response = await registration.register();

    await test.step('Validate response status', async () => {
      expect(response.status()).toBe(201);
    });
    const body = await response.json();
    await test.step('Validate access token', async () => {
      expect(body).toHaveProperty('accessToken');
    });
    await test.step('Validate token length', async () => {
      expect(body.accessToken).toHaveLength(64);
    });
  });
});
