import InvalidResultError from './InvalidResultError.js';

// calculator containers
const calculatorInput = document.querySelector('.screen-input');
const calculatorResult = document.querySelector('.screen-result');
const buttonsContainer = document.querySelector('.buttons-container');

const MAX_INPUT_LEN = 25;
const MAX_RESULT_LEN = 13;

let screenInput = '';
let calculationInput = '';
let currNumber = '';

// digits handlers
const isZeroInputValid = function (targetValue) {
  const firstDigitMatch = currNumber.match(/\d/) ?? [''];
  const firstCurrNumChar = firstDigitMatch[0];

  if (firstCurrNumChar === '0' && !/^0\./.test(currNumber)) {
    if (targetValue === '0') return false;
    if (targetValue !== '.') {
      currNumber = targetValue;
      screenInput = screenInput.slice(0, -1) + currNumber;
      calculationInput = calculationInput.slice(0, -1) + currNumber;
      return false;
    }
  }
  return true;
};

const isDotInputValid = function (targetValue) {
  const lastCurrNumChar = currNumber.slice(-1);
  if ((lastCurrNumChar === '.' || currNumber === '') && targetValue === '.') {
    return false;
  }

  if (/\./.test(currNumber) && targetValue === '.') return;

  return true;
};

const isParensInputValid = function (targetValue) {
  const openingParen = screenInput.match(/\(/g) ?? [];
  const closingParen = screenInput.match(/\)/g) ?? [];
  const lastInputChar = screenInput.slice(-1);

  if (
    targetValue === ')' &&
    (openingParen.length <= closingParen.length ||
      lastInputChar === '(' ||
      (isNaN(lastInputChar) && lastInputChar !== ')'))
  ) {
    return false;
  }

  if (
    targetValue === '(' &&
    screenInput !== '' &&
    !isNaN(Number(lastInputChar))
  ) {
    return false;
  }

  if (
    lastInputChar === ')' &&
    ('.('.includes(targetValue) || !isNaN(Number(targetValue)))
  ) {
    return false;
  }

  return true;
};

const handleDigits = function (target) {
  const targetValue = target.innerText;

  if (!isZeroInputValid(targetValue)) return;
  if (!isDotInputValid(targetValue)) return;
  if (!isParensInputValid(targetValue)) return;

  if (!'()'.includes(targetValue)) currNumber += targetValue;
  screenInput += targetValue;
  calculationInput += targetValue;
};

// operators handler
const handleOperators = function (target) {
  currNumber = '';
  let targetValue = target.innerText;
  const lastInputChar = screenInput.slice(-1);

  if ((screenInput === '' || lastInputChar === '(') && targetValue === '-') {
    currNumber += targetValue;
    calculationInput += targetValue;
    screenInput += targetValue;
    return;
  }

  if (screenInput === '' && targetValue !== '-') return;

  if (
    lastInputChar !== ')' &&
    isNaN(Number(lastInputChar)) &&
    isNaN(Number(targetValue))
  ) {
    return;
  }

  const targetId = target.id;

  if (targetId === 'multiply') calculationInput += '*';
  else if (targetId === 'divide') calculationInput += '/';
  else calculationInput += targetValue;

  screenInput += targetValue;
};

// functionalities handlers
const handleClear = function () {
  currNumber = '';
  screenInput = '';
  calculationInput = '';
  calculatorResult.innerText = 0;
};

const handleDelete = function () {
  screenInput = screenInput.slice(0, -1);
  calculationInput = screenInput;
  if (screenInput === '') handleClear();
};

const handleResultLength = function (result, maxLen) {
  return String(result).length > maxLen
    ? Number.parseFloat(result).toExponential(maxLen - 4)
    : result;
};

const handleCalculation = function () {
  try {
    if (calculationInput === '') return;

    currNumber = eval(calculationInput);
    if (isNaN(currNumber)) {
      throw new InvalidResultError('not a number');
    }

    if (!isFinite(currNumber)) {
      throw new InvalidResultError('positive/negative infinity');
    }

    currNumber = String(handleResultLength(currNumber, MAX_RESULT_LEN));
    screenInput = currNumber;
    calculationInput = currNumber;
    calculatorResult.innerText = currNumber;
  } catch (error) {
    console.error(error);
    const message =
      error.name === 'InvalidResultError'
        ? error.message
        : 'Entered invalid expression';
    alert(message);
  }
};

const handleFunctionalities = function (target) {
  const targetId = target.id;

  if (targetId === 'clear') handleClear();
  else if (targetId === 'equals') handleCalculation();
  else if (targetId === 'delete') handleDelete();
};

const isMaxInputLengthReached = function (maxLength) {
  if (screenInput.length >= maxLength) {
    alert('Maximum input size reached');
    return true;
  }

  return false;
};

buttonsContainer.addEventListener('click', (event) => {
  const currTarget = event.target;
  const targetClasses = currTarget.className;

  if (targetClasses.includes('calculator-button__digit')) {
    if (isMaxInputLengthReached(MAX_INPUT_LEN)) return;
    handleDigits(currTarget);
  } else if (targetClasses.includes('calculator-button__operator')) {
    if (isMaxInputLengthReached(MAX_INPUT_LEN)) return;
    handleOperators(currTarget);
  } else if (targetClasses.includes('calculator-button__functionality')) {
    handleFunctionalities(currTarget);
  }

  calculatorInput.innerText = screenInput;
});
