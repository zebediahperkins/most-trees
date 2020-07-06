const BinaryNode = require("./BinaryNode");

/**
 * Returns information regarding the operator of lowest precedence
 * 
 * @param {string[]} expression The expression whose operators are being analyzed
 */
const findLowestPrecedence = (expression) => {
    let globalParenthesisDepth = 0;
    let precedenceValues = { "lowestPrecedenceIndex": 0, "lowestPrecedenceOperator": null, "parenthesisDepth": 0 };
    for (let i = 0; i < expression.length; ++i) {
        if (expression[i] === '(') ++globalParenthesisDepth; else if (expression[i] === ')') --globalParenthesisDepth;
            if (!precedenceValues.lowestPrecedenceOperator) {
                if (expression[i] === '+' || expression[i] === '-' || expression[i] === '*' || expression[i] === '/' || expression[i] === '^') {
                    precedenceValues.lowestPrecedenceIndex = i;
                    precedenceValues.lowestPrecedenceOperator = expression[i];
                    precedenceValues.parenthesisDepth = globalParenthesisDepth;
                }
            }
            switch (expression[i]) {
                case '+':
                case '-':
                    if (globalParenthesisDepth <= precedenceValues.parenthesisDepth) {
                        precedenceValues.lowestPrecedenceIndex = i;
                        precedenceValues.lowestPrecedenceOperator = expression[i];
                        precedenceValues.parenthesisDepth = globalParenthesisDepth;
                    }
                    break;
                case '*':
                case '/':
                case '%':
                    if (globalParenthesisDepth < precedenceValues.parenthesisDepth || (globalParenthesisDepth == precedenceValues.parenthesisDepth && precedenceValues.lowestPrecedenceOperator !== '+' && precedenceValues.lowestPrecedenceOperator !== '-')) {
                        precedenceValues.lowestPrecedenceIndex = i;
                        precedenceValues.lowestPrecedenceOperator = expression[i];
                        precedenceValues.parenthesisDepth = globalParenthesisDepth;
                    }
                    break;
                case '^':
                    if (globalParenthesisDepth < precedenceValues.parenthesisDepth || (globalParenthesisDepth == precedenceValues.parenthesisDepth && precedenceValues.lowestPrecedenceOperator !== '+' && precedenceValues.lowestPrecedenceOperator !== '-' && precedenceValues.lowestPrecedenceOperator !== '*' && precedenceValues.lowestPrecedenceOperator !== '/')) {
                        precedenceValues.lowestPrecedenceIndex = i;
                        precedenceValues.lowestPrecedenceOperator = expression[i];
                        precedenceValues.parenthesisDepth = globalParenthesisDepth;
                    }
                    break;
                default:
                    break;
            }
    }
    return precedenceValues;
}

/**
 * Attemps to reconfigure a binary node's null pointers so they will each point to another node
 * 
 * @param {BinaryNode} node The node whose pointers are being built
 * @param {string[]} expression The mathematical expression that will be used to build this node
 */
const buildNodePointers = (node, expression) => {
    if (expression[0] === '(' && expression[expression.length - 1] === ')') {
        (() => {
            for (let parenthesisDepth = 1, i = 1; i < expression.length - 1; ++i) {
                if (expression[i] === '(') ++parenthesisDepth; else if(expression[i] === ')') --parenthesisDepth;
                if (parenthesisDepth < 1) return;
            }
            expression.splice(expression.length - 1, expression.length);
            expression.splice(0, 1);
        })();
    }
    const splitIndex = findLowestPrecedence(expression).lowestPrecedenceIndex;
    return new BinaryNode(
        buildNode(expression.slice(0, splitIndex)),
        buildNode(expression.slice(splitIndex + 1, expression.length)),
        node.data
    );
}

/**
 * Builds a single node with null pointers. If this is the last node in the sequence, it will have a numeric/variable value, otherwise it will be an operator
 * 
 * @param {string} operator The value to be placed in this node if operator is defined and not null
 * @param {string[]} expression The mathematical expression that will be used to build the pointers to the next nodes
 * @returns {BinaryNode} A binary node
 */
const buildNode = (expression) => {
    const lowestPrecedence = findLowestPrecedence(expression);
    if (!lowestPrecedence.lowestPrecedenceOperator) return new BinaryNode(null, null, expression.join(''));
    return buildNodePointers(
        new BinaryNode(null, null, lowestPrecedence.lowestPrecedenceOperator),
        expression
        );
}

module.exports = {
    "findLowestPrecedence": findLowestPrecedence,
    "buildNodePointers": buildNodePointers,
    "buildNode": buildNode
}