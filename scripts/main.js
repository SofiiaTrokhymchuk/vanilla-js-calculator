// calculator containers
const calculatorInput = document.querySelector('.screen-input');
const calculatorResult = document.querySelector('.screen-result');
const buttonsContainer = document.querySelector('.buttons-container');

// operators
const add = document.getElementById('add');
const subctract = document.getElementById('substract');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const modDivide = document.getElementById('mod-divide');

// functions
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const equals = document.getElementById('equals');

const MAX_INPUT_LEN = 25;
const MAX_RESULT_LEN = 13;

let screenInput = '';
let calculationInput = '';
let currNumber = '';

const handleDigits = function (target) {
  const targetValue = target.innerText;
  const firstDigitMatch = currNumber.match(/\d/);
  const firstInputChar = firstDigitMatch !== null ? firstDigitMatch[0] : '';
  const lastInputChar = currNumber.slice(-1);

  if (firstInputChar === '0' && !/^0\./.test(currNumber)) {
    if (targetValue === '0') return;
    if (targetValue !== '.') {
      currNumber = targetValue;
      screenInput = screenInput.slice(0, -1) + currNumber;
      calculationInput = calculationInput.slice(0, -1) + currNumber;
      return;
    }
  }

  if ((lastInputChar === '.' || currNumber === '') && targetValue === '.') {
    return;
  }

  if (!'()'.includes(targetValue)) currNumber += targetValue;

  screenInput += targetValue;
  calculationInput += targetValue;
};

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

  if (isNaN(Number(lastInputChar)) && isNaN(Number(targetValue))) return;

  const targetId = target.id;

  if (targetId === 'multiply') calculationInput += '*';
  else if (targetId === 'divide') calculationInput += '/';
  else calculationInput += targetValue;

  screenInput += targetValue;
};

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
    currNumber = eval(calculationInput);
    if (isNaN(currNumber) || !isFinite(currNumber)) {
      throw new EvalError();
    }

    currNumber = String(handleResultLength(currNumber, MAX_RESULT_LEN));
    screenInput = currNumber;
    calculationInput = currNumber;
    calculatorResult.innerText = currNumber;
  } catch (error) {
    console.error(error);
    alert('Entered invalid expression');
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
