const mathjs = require('mathjs');
const BinaryNode = require('./BinaryNode');
const { findLowestPrecedence, buildNodePointers } = require('./util');

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
        node.data = findLowestPrecedence(expression).lowestPrecedenceOperator;
        if (!node.data) node.data = expressionString;
        else node = buildNodePointers(node, expression);
        return node;
    }

    /** Solve the current expression */
    solveTree() {
        return mathjs.simplify(this.expressionString).toString().replace(/\s/g, '');
    }
}

module.exports = ExpressionTree;