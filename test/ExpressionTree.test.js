const ExpressionTree = require('../src/ExpressionTree');
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
});