// program to generate random strings

// declare all characters
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateString = (length: number): string => {
  let result = '';
  const charactersLength = characters.length;
  for (let index = 0; index < length; index++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
