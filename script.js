class Calculator {
  constructor(previousOpTextEl, currentOpTextEl) {
    this.previousOpTextEl = previousOpTextEl;
    this.currentOpTextEl = currentOpTextEl;
    this.clear();
  }

  clear() {
    this.currentOp = '';
    this.previousOp = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOp.includes('.')) return;
    this.currentOp = this.currentOp.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOp === '') return;
    if (this.currentOp !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOp = this.currentOp;
    this.currentOp = '';
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOp);
    const current = parseFloat(this.currentOp);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = previous + current;
        break;
      case '-':
        computation = previous - current;
        break;
      case '*':
        computation = previous * current;
        break;
      case '÷':
        computation = previous / current;
        break;
      default:
        return;
    }
    this.currentOp = computation;
    this.operation = undefined;
    this.previousOp = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOpTextEl.innerText = this.getDisplayNumber(this.currentOp);
    if (this.operation != null) {
      this.previousOpTextEl.innerText = `${this.getDisplayNumber(
        this.previousOp
      )} ${this.operation}`;
    } else {
      this.previousOpTextEl.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOpTextEl = document.querySelector('[data-previous-operand]');
const currentOpTextEl = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOpTextEl, currentOpTextEl);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
