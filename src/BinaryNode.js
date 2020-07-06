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
}

module.exports = BinaryNode;