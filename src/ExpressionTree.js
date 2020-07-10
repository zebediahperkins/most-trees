const mathjs = require('mathjs');
const BinaryNode = require('./BinaryNode');

/** A specific kind of a binary tree used to represent expressions */
class ExpressionTree {
    /**
     * Construct an expression tree object representing an expression
     * 
     * @param {string} expressionString The expression used to build this tree
     */
    constructor(expressionString) {
        /** The expression used to build this tree */
        this.expressionString = expressionString;
        /** The root node of this tree */
        this.root = this.buildTree(this.expressionString);
    }
    
    /**
     * Build an expression tree representing an expression; ERASES CURRENT TREE DATA ON THIS OBJECT
     * 
     * @param {string} expressionString The expression used to build this tree
     */
    buildTree(expressionString) {
        if (this.expressionString !== expressionString) this.expressionString = expressionString;
        const expression = [...expressionString];
        let node = new BinaryNode(null, null, null);
        node.data = this.findLowestPrecedence(expression).lowestPrecedenceOperator;
        if (!node.data) node.data = expressionString;
        else node = this.buildNodePointers(node, expression);
        return node;
    }

    /** Solve the current expression */
    solveTree() {
        return mathjs.simplify(this.expressionString).toString().replace(/\s/g, '');
    }

    /**
     * Returns information regarding the operator of lowest precedence
     * 
     * @param {string[]} expression The expression whose operators are being analyzed
     */
    findLowestPrecedence(expression) {
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
    buildNodePointers(node, expression) {
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
        const splitIndex = this.findLowestPrecedence(expression).lowestPrecedenceIndex;
        return new BinaryNode(
            this.buildNode(expression.slice(0, splitIndex)),
            this.buildNode(expression.slice(splitIndex + 1, expression.length)),
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
    buildNode(expression) {
        const lowestPrecedence = this.findLowestPrecedence(expression);
        if (!lowestPrecedence.lowestPrecedenceOperator) return new BinaryNode(null, null, expression.join(''));
        return this.buildNodePointers(
            new BinaryNode(null, null, lowestPrecedence.lowestPrecedenceOperator),
            expression
            );
    }
    
    /**
     * Check if an object is equal to this object
     * 
     * @param {*} obj The object that will be compared with this object
     */
    isEqual(obj) {
        return this.solveTree() === obj.solveTree();
    }
}

module.exports = ExpressionTree;
