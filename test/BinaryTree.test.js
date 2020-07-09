const BinaryTree = require('../src/BinaryTree');
const assert = require('assert');

describe('BinaryTree', () => {
    describe('#constructor', () => {
        it('should build a value-less binary search tree with an arithmetic comparator', () => {
            let tree = new BinaryTree();
            assert.strictEqual(tree.root, null);
            assert.strictEqual(tree.comparator(3, 1), 3);
        });
        it('should build a binary search tree of numbers with an arithmetic comparator', () => {
            let tree = new BinaryTree([1, -13, -7, 5, 2, 3, 6]);
            assert.strictEqual(tree.root.data, 1);
            assert.strictEqual(tree.root.left.data, -13);
            assert.strictEqual(tree.root.left.right.data, -7);
            assert.strictEqual(tree.root.right.data, 5);
            assert.strictEqual(tree.root.right.left.data, 2);
            assert.strictEqual(tree.root.right.left.right.data, 3);
            assert.strictEqual(tree.root.right.right.data, 6);
        });
        it('should build a binary search tree of strings with a custom comparator function', () => {
            let comparator = (string1, string2) => {
                if (string1.length > string2.length) return string1;
                return string2;
            }
            let tree = new BinaryTree(["Apple", "Car", "Sidewalk", "Is", "Triskadecaphobia", "Tree"], comparator);
            assert.strictEqual(tree.root.data, "Apple");
            assert.strictEqual(tree.root.left.data, "Car");
            assert.strictEqual(tree.root.right.data, "Sidewalk");
            assert.strictEqual(tree.root.left.left.data, "Is");
            assert.strictEqual(tree.root.right.right.data, "Triskadecaphobia");
            assert.strictEqual(tree.root.left.right.data, "Tree");
        });
    });

    describe('#search', () => {
        let tree = new BinaryTree([1, -13, -7, 5, 2, 3, 6]);
        it('should find the node with value 3', () => {
            assert.strictEqual(tree.search(3).data, 3);
        });
        it('should return null', () => {
            assert.strictEqual(tree.search(152), null);
        });
    });

    describe('#insert', () => {
        let tree = new BinaryTree([1, -13, -7, 5, 2, 3, 6]);
        it('should insert 13 and return true', () => {
            assert.strictEqual(tree.insert(13), true);
        });
        it('should attempt to insert 13 again, and return false', () => {
            assert.strictEqual(tree.insert(13), false);
        });
    });

    describe('#remove', () => {
        let tree = new BinaryTree([1, -13, -7, 5, 2, 3, 6]);
        it('should remove -7, and return true', () => {
            assert.strictEqual(tree.remove(-7), true);
        });
        it('should try to remove -7 again, and return false', () => {
            assert.strictEqual(tree.remove(-7), false);
        });
    });

    describe('#toArray', () => {
        let tree = new BinaryTree([1, -13, -7, 5, 2, 3, 6]);
        it('should return this tree as a sorted array', () => {
            assert.strictEqual(tree.toArray().toString(), '-13,-7,1,2,3,5,6');
        });
    });

    describe('#buildTree', () => {
        let tree = new BinaryTree();
        let equalTree = new BinaryTree([5, 1, 2, 7, 3, 8]);
        it('should build a tree equal to equalTree', () => {
            tree.buildTree([5, 1, 2, 7, 3, 8]);
            assert.strictEqual(tree.isEqual(equalTree), true);
        });
    });

    describe('#isEqual', () => {
        let tree = new BinaryTree();
        let equalTree = new BinaryTree([5, 1, 2, 7, 3, 8]);
        it('should return that the trees are equal', () => {
            tree.buildTree([5, 1, 2, 7, 3, 8]);
            assert.strictEqual(tree.isEqual(equalTree), true);
        });
        it('should return that the trees are not equal', () => {
            tree.buildTree([5, 1, 2, 7, 3, 8, 9]);
            assert.strictEqual(tree.isEqual(equalTree), false);
        });
    });
});