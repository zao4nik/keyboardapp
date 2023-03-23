const texts = [
  {
    titile: 'Example 1',
    data: `function example1() {\nconsole.log("Hello, World!");\n}`,
  },
  {
    titile: 'Example 2',
    data: `const sum = (a, b) => {\nreturn a + b;\n};`,
  },
  {
    titile: 'Example 3',
    data: `const square = (x) => {\nreturn x * x;\n};`,
  },
  {
    titile: 'Example 4',
    data: `function greet(name) {\nconsole.log("Hello, " + name + "!");\n}`,
  },
  {
    titile: 'Example 5',
    data: `const double = (x) => {\nreturn x * 2;\n};`,
  },
  {
    titile: 'Example 6',
    data: `function factorial(n) {\nreturn n === 1 ? 1 : n * factorial(n - 1);\n}`,
  },
  {
    titile: 'Example 7',
    data: `const reverse = (str) => {\nreturn str.split('').reverse().join('');\n};`,
  },
  {
    titile: 'Example 8',
    data: `function isPalindrome(str) {\nconst reversed = str.split('').reverse().join('');\nreturn str === reversed;\n}`,
  },
  {
    titile: 'Example 9',
    data: `const range = (start, end) => {\nreturn Array.from({ length: end - start + 1 }, (_, i) => start + i);\n};`,
  },
  {
    titile: 'Example 10',
    data: `function fibonacci(n) {\nif (n <= 1) {\nreturn n;\n}\nreturn fibonacci(n - 1) + fibonacci(n - 2);\n}`,
  },
  {
    titile: 'Example 11',
    data: `function findMax(arr) {\nreturn Math.max(...arr);\n}`,
  },
  {
    titile: 'Example 12',
    data: `function findMin(arr) {\nreturn Math.min(...arr);\n}`,
  },
  {
    titile: 'Example 13',
    data: `function arraySum(arr) {\nreturn arr.reduce((acc, val) => acc + val, 0);\n}`,
  },
  {
    titile: 'Example 14',
    data: `function average(arr) {\nreturn arraySum(arr) / arr.length;`
  },
  {
    titile: 'Example 14',
    data: `function average(arr) {\nreturn arraySum(arr) / arr.length;\n}`,
  },
  {
    titile: 'Example 15',
    data: `function evenNumbers(n) {\nreturn Array.from({ length: n }, (_, i) => 2 * i);\n}`,
  },
  {
    titile: 'Example 16',
    data: `function oddNumbers(n) {\nreturn Array.from({ length: n }, (_, i) => 2 * i + 1);\n}`,
  },
  {
    titile: 'Example 17',
    data: `function isPrime(n) {\nif (n <= 1) {\nreturn false;\n}\nfor (let i = 2; i * i <= n; i++) {\nif (n % i === 0) {\nreturn false;\n}\n}\nreturn true;\n}`,
  },
  {
    titile: 'Example 18',
    data: `function primeNumbers(n) {\nconst primes = [];\nfor (let i = 2; i <= n; i++) {\nif (isPrime(i)) {\nprimes.push(i);\n}\n}\nreturn primes;\n}`,
  },
  {
    titile: 'Example 19',
    data: `function mergeArrays(arr1, arr2) {\nreturn arr1.concat(arr2);\n}`,
  },
  {
    titile: 'Example 20',
    data: `function flattenArray(arr) {\nreturn arr.flat();\n}`,
  },
  {
    titile: 'Example 21',
    data: `function filterPositive(arr) {\nreturn arr.filter(val => val >= 0);\n}`,
  },
  {
    titile: 'Example 22',
    data: `function filterNegative(arr) {\nreturn arr.filter(val => val < 0);\n}`,
  },
  {
    titile: 'Example 23',
    data: `function arrayToObject(arr) {\nreturn Object.assign({}, arr);\n}`,
  },
  {
    titile: 'Example 24',
    data: `function objectToArray(obj) {\nreturn Object.values(obj);\n}`,
  },
];

module.exports = texts;




/* Новый код

const texts = [
  {
    titile: 'Example 1',
    data: `function example1() {\nconsole.log("Hello, World!");\n}`,
  },
  {
    titile: 'Example 2',
    data: `const sum = (a, b) => {\nreturn a + b;\n};`,
  },
  {
    titile: 'Example 3',
    data: `const square = (x) => {\nreturn x * x;\n};`,
  },
  {
    titile: 'Example 4',
    data: `function greet(name) {\nconsole.log("Hello, " + name + "!");\n}`,
  },
  {
    titile: 'Example 5',
    data: `const double = (x) => {\nreturn x * 2;\n};`,
  },
  {
    titile: 'Example 6',
    data: `function factorial(n) {\nreturn n === 1 ? 1 : n * factorial(n - 1);\n}`,
  },
  {
    titile: 'Example 7',
    data: `const reverse = (str) => {\nreturn str.split('').reverse().join('');\n};`,
  },
  {
    titile: 'Example 8',
    data: `function isPalindrome(str) {\nconst reversed = str.split('').reverse().join('');\n  return str === reversed;\n}`,
  },
  {
    titile: 'Example 9',
    data: `const range = (start, end) => {\nreturn Array.from({ length: end - start + 1 }, (_, i) => start + i);\n};`,
  },
  {
    titile: 'Example 10',
    data: `function fibonacci(n) {\nif (n <= 1) {\nreturn n;\n}\nreturn fibonacci(n - 1) + fibonacci(n - 2);\n}`,
  },
  {
    titile: 'Example 11',
    data: `function findMax(arr) {\nreturn Math.max(...arr);\n}`,
  },
  {
    titile: 'Example 12',
    data: `function findMin(arr) {\nreturn Math.min(...arr);\n}`,
  },
  {
    titile: 'Example 13',
    data: `function arraySum(arr) {\nreturn arr.reduce((acc, val) => acc + val, 0);\n}`,
  },
  {
    titile: 'Example 14',
    data: `function average(arr) {
    return arraySum(arr) / arr.length;
  }`,
  },
  {
    titile: 'Example 14',
    data: `function average(arr) {\nreturn arraySum(arr) / arr.length;\n}`,
  },
  {
    titile: 'Example 15',
    data: `function evenNumbers(n) {\nreturn Array.from({ length: n }, (_, i) => 2 * i);\n}`,
  },
  {
    titile: 'Example 16',
    data: `function oddNumbers(n) {\nreturn Array.from({ length: n }, (_, i) => 2 * i + 1);\n}`,
  },
  {
    titile: 'Example 17',
    data: `function isPrime(n) {\nif (n <= 1) {\nreturn false;\n}\nfor (let i = 2; i * i <= n; i++) {\nif (n % i === 0) {\nreturn false;\n}\n}\nreturn true;\n}`,
  },
  {
    titile: 'Example 18',
    data: `function primeNumbers(n) {\nconst primes = [];\nfor (let i = 2; i <= n; i++) {\nif (isPrime(i)) {\nprimes.push(i);\n}\n}\nreturn primes;\n}`,
  },
  {
    titile: 'Example 19',
    data: `function mergeArrays(arr1, arr2) {\nreturn arr1.concat(arr2);\n}`,
  },
  {
    titile: 'Example 20',
    data: `function flattenArray(arr) {\nreturn arr.flat();\n}`,
  },
  {
    titile: 'Example 21',
    data: `function filterPositive(arr) {\nreturn arr.filter(val => val >= 0);\n}`,
  },
  {
    titile: 'Example 22',
    data: `function filterNegative(arr) {\nreturn arr.filter(val => val < 0);\n}`,
  },
  {
    titile: 'Example 23',
    data: `function arrayToObject(arr) {\nreturn Object.assign({}, arr);\n}`,
  },
  {
    titile: 'Example 24',
    data: `function objectToArray(obj) {\nreturn Object.values(obj);\n}`,
  },
];

module.exports = texts;



*/