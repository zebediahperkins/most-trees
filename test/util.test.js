const util = require('../src/util');
const assert = require('assert');
const { findLowestPrecedence, buildNodePointers, buildNode } = require('../src/util');
const BinaryNode = require('../src/BinaryNode');

describe('#findLowestPrecedence', () => {
    it('should find the lowest precedence operator', () => {
        assert.strictEqual(findLowestPrecedence('4*5+1-4/12').lowestPrecedenceOperator, '-');
        assert.strictEqual(findLowestPrecedence('4*5+1').lowestPrecedenceOperator, '+');
        assert.strictEqual(findLowestPrecedence('4*5').lowestPrecedenceOperator, '*');
        assert.strictEqual(findLowestPrecedence('4').lowestPrecedenceOperator, null);
    });
});

describe('#buildNodePointers', () => {
    it('should reconfigure a binary node\'s null pointers', () => {
        let node1 = buildNodePointers(new BinaryNode(null, null, '+'), ['3', '+', '5']);
        assert.strictEqual(node1.data, '+');
        assert.strictEqual(node1.left.data, '3');
        assert.strictEqual(node1.right.data, '5');
        let node2 = buildNodePointers(new BinaryNode(null, null, '*'), ['9', '^', '8', '/', '3', '*', '5']);
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
        let node = buildNode(['5']);
        assert.strictEqual(node.data, '5');
        assert.strictEqual(node.left, null);
        assert.strictEqual(node.right, null);
    });
});