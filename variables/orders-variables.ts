import { generateRandomNumber, createUserEmail } from '../utils/helpers/helpers';

export const ordersVariables = {
  newOrder: {
    bookId: generateRandomNumber(),
    customerName: createUserEmail() 
  },
};