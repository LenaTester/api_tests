import * as fs from 'fs';

// loads token from file
export function loadAuthToken(): string {
  const authData = JSON.parse(fs.readFileSync('./auth-token.json', 'utf-8'));
  return authData.accessToken;
}

// creates unique user email, using timestamp
export function createUserEmail(): string {
    const date = new Date();
    const timestamp = date.getTime();
    return `user_${timestamp}@example.com`;
}

// generates a random number from 1 to 6
export function generateRandomNumber(): number {
  return Math.floor(Math.random() * 6) + 1;
}

// Validator class with methods to find objects in array by full or partial match
export class Validator {
   // Finds object in array by full match of all keys and values
   findMatchingObjectInArray(
    arrayOfObjects: Array<{ [key: string]: string | number | boolean }>, 
    expectedObject: { [key: string]: string | number | boolean }) {
    const foundObject = arrayOfObjects.find(item => 
      Object.keys(expectedObject).every(key => item[key] === expectedObject[key])
    );
    if (!foundObject) {
      throw new Error("Expected object is not found in array");
    }
    return foundObject;
  }

  // Finds object in array by match of several specified keys and values
  findObjectInArrayBySeveralKeys(
    arrayOfObjects: Array<{ [key: string]: string | number | boolean }>, 
    expectedObject: { [key: string]: string | number | boolean }): boolean {
    return arrayOfObjects.some(item => 
      Object.keys(expectedObject).every(key => item[key] === expectedObject[key])
    );
  }
}