# Simple JavaScript Calculator

## Overview
This is a simple calculator built with HTML, CSS and Vanilla Javascript that provides basic functionality.
![image](https://github.com/SofiiaTrokhymchuk/vanilla-js-calculator/assets/93663923/965a7220-f437-4f08-b0be-9d6e47e0a0d5)

This calculator project is hosted [here](https://sofiiatrokhymchuk.github.io/vanilla-js-calculator/).

## Functionality

This calculator supports basic arithmetic operations and functionality such as:

- addition (+);
- subtraction (-);
- multiplication (\*);
- division (/);
- modular division (%);
- clear all (AC);
- delete (DEL).

The calculator makes a basic check to see if the expression entered by the user is correct and controls user input:
- it ensures that there are no leading zeros (e.g., `01` is corrected to `1`);
- multiple consecutive dots are not allowed (e.g., invalid input like `0...1..0` is prevented);
- it checks the parity of the entered parentheses (e.g., invalid input like `())(` is prevented);
- input of opening `(` paratheses right after `)`, `.` and numbers is prevented;
- input of closing `)` paratheses right after `(`, `.` and arithmetic operations symbols is prevented;
- input of arithmetic operations symbols right after `(` is prevented (except `-`)).

## Execution

1. Clone the repository
   ```sh
   git clone https://github.com/SofiiaTrokhymchuk/vanilla-js-calculator.git
   ```
3. Open `index.html` or run on VS Code using Live Server plugin.

## Contributing

Contributions are welcome. If you have a suggestion to make this project better, please:
1. Fork the project;
2. Create your branch:
```sh
git checkout -b <suggestion-branch-name>
```
3. Commit your changes:
```sh
git commit -m 'Add/Fix something'
```
4. Push to your branch:
```sh
git push origin <suggestion-branch-name>
```
5. Open a Pull Request.

You can also create an issue with `bug` or `enhancement` tag. Please, give this project a star if you like it. Thank you! 
