const assert = require('assert');
const BinaryNode = require('../src/BinaryNode');

describe('BinaryNode', () => {
    describe('#constructor', () => {
        it('should properly build a binary node with null ptrs and a value of testing1', () => {
            let binaryNode = new BinaryNode(null, null, 'testing1');
            assert.strictEqual(binaryNode.data, 'testing1');
            assert.strictEqual(binaryNode.left, null);
            assert.strictEqual(binaryNode.right, null);
        });
        it('should properly build a binary node with left and right ptrs and a value of testing2', () => {
            let binaryNode = new BinaryNode(new BinaryNode(null, null, null), new BinaryNode(null, null, null), 'testing2');
            assert.strictEqual(binaryNode.data, 'testing2');
            assert.strictEqual(binaryNode.left.left, null);
            assert.strictEqual(binaryNode.left.right, null);
            assert.strictEqual(binaryNode.left.data, null);
            assert.strictEqual(binaryNode.right.left, null);
            assert.strictEqual(binaryNode.right.right, null);
            assert.strictEqual(binaryNode.right.data, null);
        });
    });
});