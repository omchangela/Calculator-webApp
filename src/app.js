document.addEventListener('DOMContentLoaded', function() {
  const screen = document.querySelector('.screen');
  const keys = document.querySelectorAll('.key');

  let currentInput = '0'; // Set initial value to 0
  let isOperatorClicked = false;

  keys.forEach(key => {
    key.addEventListener('click', function() {
      const keyValue = this.getAttribute('data-key');
      const keySymbol = this.getAttribute('data-symbol') || keyValue;

      if (keyValue === 'reset') {
        // Reset the calculator
        currentInput = '0'; // Set currentInput to default value
        isOperatorClicked = false; // Reset operator click status
      } else if (keyValue === 'equal') {
        // Evaluate the expression
        try {
          let result = eval(currentInput);
          currentInput = parseFloat(result.toFixed(4));
          isOperatorClicked = false; // Reset operator click status
        } catch (error) {
          currentInput = 'Error';
        }
      } else if (keyValue === 'delete') {
        // Delete the last character if not 'Error'
        if (currentInput !== 'Error') {
          currentInput = currentInput.slice(0, -1);
          if (currentInput === '') currentInput = '0'; // Ensure currentInput is not empty
        } else {
          currentInput = '0'; // Reset to default value
        }
      } else {
        if (keyValue === '.') {
          // Handle dot separately to ensure only one dot is added
          if (!currentInput.includes('.') && !currentInput.endsWith('.')) {
            currentInput += '.';
          }
        } else {
          if (keyValue === 'division') {
            if (!isOperatorClicked) {
              currentInput += ' / ';
              isOperatorClicked = true;
            }
          } else if (keyValue === 'multiplication') {
            if (!isOperatorClicked) {
              currentInput += ' * ';
              isOperatorClicked = true;
            }
          } else if (keyValue === 'addition' || keyValue === 'subtraction') {
            if (!isOperatorClicked) {
              currentInput += ' ' + keySymbol + ' ';
              isOperatorClicked = true;
            }
          } else {
            if (currentInput === '0' || currentInput === 'Error') currentInput = ''; // Remove leading zero or 'Error'
            currentInput += keySymbol;
            isOperatorClicked = false;
          }
        }
      }

      // Update the screen display with spacing
      screen.textContent = currentInput === '' ? '0' : currentInput;
    });
  });
});
