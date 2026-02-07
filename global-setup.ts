import { Registration } from './utils/register-functions';
import { createUserEmail } from './utils/helpers/helpers';
import * as fs from 'fs';

async function globalSetup() {
  const clientName = 'Postman';
  const clientEmail = createUserEmail();
  const registration = new Registration(clientName, clientEmail);
  const response = await registration.register();
  
  if (response.status() !== 201) {
    throw new Error('Registration failed');
  }
  
  const body = await response.json();
  const token = body.accessToken;
  
  // Save token to a file
  fs.writeFileSync('./auth-token.json', JSON.stringify({ accessToken: token }));
}

export default globalSetup;