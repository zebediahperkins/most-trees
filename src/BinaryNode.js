const { equals } = require('./util');

/** A basic unit of data with pointers to two other nodes */
class BinaryNode {
    /**
     * Construct a binary tree object
     * 
     * @param {BinaryNode} left Pointer to the "left" node
     * @param {BinaryNode} right Pointer to the "right" node
     * @param {*} data The data that this node will hold
     */
    constructor(left, right, data) {
        /** Pointer to the "left" node */
        this.left = left;
        /** Pointer to the "right" node */
        this.right = right;
        /** The data that this node will hold */
        this.data = data;
    }
    /**
     * Attempt to insert a value
     * 
     * @param {*} value The value to insert
     * @param {Function} comparator The comparator(val1, val2) function that will be used to compare two values, defaults to aritmetic comparator if undefined
     * @param {BinaryNode} node The node being evaluated, defaults to this.root if undefined
     * @returns {boolean} whether or not the value was successfully inserted
     */
    searchTreeInsert(value, comparator, node) {
        if (!node) node = this;
        if (equals(node.data, value)) return false;
        if (equals(comparator(value, node.data), value)) {
            if (node.right) return this.searchTreeInsert(value, comparator, node.right);
            node.right = new BinaryNode(null, null, value);
            return true;
        }
        else {
            if (node.left) return this.searchTreeInsert(value, comparator, node.left);
            node.left = new BinaryNode(null, null, value);
            return true;
        }
    }

    /**
     * Return this tree as an array of it's values, will be sorted if the tree is a bst
     * 
     * @returns {Array} this tree as a sorted array of values
     */
    toArray(node, array) {
        if (!node) node = this;
        if (!array) array = [];
        if (node.left) array = this.toArray(node.left, array);
        array.push(node.data);
        if (node.right) array = this.toArray(node.right, array);
        return array;
    }
}

module.exports = BinaryNode;