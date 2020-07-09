const ExpressionTree = require('../src/ExpressionTree');
const BinaryNode = require('../src/BinaryNode');
const assert = require('assert');

describe('ExpressionTree', () => {
    describe('#constructor', () => {
        it('should properly build an expression tree without parenthesis', () => {
            let tree = new ExpressionTree('12+5*21/x').root;
            assert.strictEqual(tree.data, '+');
            assert.strictEqual(tree.left.data, '12');
            assert.strictEqual(tree.right.data, '/');
            assert.strictEqual(tree.right.left.data, '*');
            assert.strictEqual(tree.right.left.left.data, '5');
            assert.strictEqual(tree.right.left.right.data, '21');
            assert.strictEqual(tree.right.right.data, 'x');
        });
        it('should properly build an expression tree with parenthesis', () => {
            let tree = new ExpressionTree('12+5*(21/x)').root;
            assert.strictEqual(tree.data, '+');
            assert.strictEqual(tree.left.data, '12');
            assert.strictEqual(tree.right.data, '*');
            assert.strictEqual(tree.right.left.data, '5');
            assert.strictEqual(tree.right.right.data, '/');
            assert.strictEqual(tree.right.right.left.data, '21');
            assert.strictEqual(tree.right.right.right.data, 'x');
        });
    });

    describe('#buildTree', () => {
        it('should overwrite existing tree, and properly build an expression tree without parenthesis', () => {
            let tree = new ExpressionTree('4+5').buildTree('12+5*21/x');
            assert.strictEqual(tree.data, '+');
            assert.strictEqual(tree.left.data, '12');
            assert.strictEqual(tree.right.data, '/');
            assert.strictEqual(tree.right.left.data, '*');
            assert.strictEqual(tree.right.left.left.data, '5');
            assert.strictEqual(tree.right.left.right.data, '21');
            assert.strictEqual(tree.right.right.data, 'x');
        });
        it('should overwrite existing tree, and properly build an expression tree with parenthesis', () => {
            let tree = new ExpressionTree('4+5').buildTree('12+5*(21/x)');
            assert.strictEqual(tree.data, '+');
            assert.strictEqual(tree.left.data, '12');
            assert.strictEqual(tree.right.data, '*');
            assert.strictEqual(tree.right.left.data, '5');
            assert.strictEqual(tree.right.right.data, '/');
            assert.strictEqual(tree.right.right.left.data, '21');
            assert.strictEqual(tree.right.right.right.data, 'x');
        });
    });
    
    describe('#solveTree', () => {
        it('should return the simplified value of the tree without variables', () => {
            assert.strictEqual(new ExpressionTree('6+7-4').solveTree(), '9');
        });
        it('should return the simplified value of the tree with variables', () => {
            assert.strictEqual(new ExpressionTree('6+7-4*x').solveTree(), '13-4*x');
        });
    });

    describe('#findLowestPrecedence', () => {
        it('should find the lowest precedence operator', () => {
            let tree = new ExpressionTree('');
            assert.strictEqual(tree.findLowestPrecedence('4*5+1-4/12').lowestPrecedenceOperator, '-');
            assert.strictEqual(tree.findLowestPrecedence('4*5+1').lowestPrecedenceOperator, '+');
            assert.strictEqual(tree.findLowestPrecedence('4*5').lowestPrecedenceOperator, '*');
            assert.strictEqual(tree.findLowestPrecedence('4').lowestPrecedenceOperator, null);
        });
    });
    
    describe('#buildNodePointers', () => {
        it('should reconfigure a binary node\'s null pointers', () => {
            let tree = new ExpressionTree('');
            let node1 = tree.buildNodePointers(new BinaryNode(null, null, '+'), ['3', '+', '5']);
            assert.strictEqual(node1.data, '+');
            assert.strictEqual(node1.left.data, '3');
            assert.strictEqual(node1.right.data, '5');
            let node2 = tree.buildNodePointers(new BinaryNode(null, null, '*'), ['9', '^', '8', '/', '3', '*', '5']);
            assert.strictEqual(node2.data, '*');
            assert.strictEqual(node2.left.data, '/');
            assert.strictEqual(node2.right.data, '5');
            assert.strictEqual(node2.left.left.data, '^');
            assert.strictEqual(node2.left.right.data, '3');
            assert.strictEqual(node2.left.left.left.data, '9');
            assert.strictEqual(node2.left.left.right.data, '8');
        });
    });
    
    describe('#buildNode', () => {
        it('should build a node with data equal to \'5\' and null ptrs', () => {
            let tree = new ExpressionTree('');
            let node = tree.buildNode(['5']);
            assert.strictEqual(node.data, '5');
            assert.strictEqual(node.left, null);
            assert.strictEqual(node.right, null);
        });
    });
});