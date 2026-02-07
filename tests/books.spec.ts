import { test, expect } from '@playwright/test';
import { Books } from '../utils/books-functions';
import { loadAuthToken, Validator } from '../utils/helpers/helpers';
import { booksVariables } from '../variables/books-variables';

test.describe('Books', () => {
  test('Validate books response and structure', async () => {
    const token = loadAuthToken();
    const books = new Books(token);
    const validator = new Validator();
    const response = await books.getAllBooks();

    await test.step('Validate response status', async () => {
      expect(response.status()).toBe(200);
    });
    const booksArray = await response.json();
    await test.step('Validate, that books array is not empty', async () => {
      expect(booksArray).toBeInstanceOf(Array<{ [key: string]: string | number | boolean }>);
      expect(booksArray.length).toBeGreaterThan(0);
    });
    await test.step('Validate, that expected book is found in books array', async () => {
      const expectedBook = booksVariables.bookShortDescription;
      validator.findMatchingObjectInArray(booksArray, expectedBook);
    });
  });

  test('Validate book is found by Id', async () => {
    const token = loadAuthToken();
    const books = new Books(token);
    const response = await books.getBookById(booksVariables.bookFullDescription.id.toString());

    await test.step('Validate response status', async () => {
      expect(response.status()).toBe(200);
    });
    const getBookById = await response.json();
    await test.step('Validate, that correct book is found', async () => {
      const expectedBook = booksVariables.bookFullDescription;
      expect(getBookById).toMatchObject(expectedBook);
    });
  });
});