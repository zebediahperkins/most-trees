const assert = require('assert');
const { equals } = require('../src/util');

describe('#equals', () => {
    it('should return that the values are equal', () => {
        assert.strictEqual(equals(4, 4), true);
    });
    it('should return that the values are not equal', () => {
        assert.strictEqual(equals(5, 1), false);
    });
    class TestClass {
        constructor(val1, val2) {
            this.val1 = val1;
            this.val2 = val2;
        }
        isEqual(obj) {
            if (obj.val1 && obj.val2) return obj.val1 === this.val1 && obj.val2 === this.val2;
            else if (!this.val1 && !this.val2) return true;
            return false;
        }
    }
    it('should return that the objects are equal', () => {
        let obj1 = new TestClass("testing", 123);
        let obj2 = obj1;
        assert.strictEqual(equals(obj1, obj2), true);
    });
    it('should return that the objects are equal', () => {
        let obj1 = new TestClass("testing", 123);
        let obj2 = new TestClass("testing", 123);
        assert.strictEqual(equals(obj1, obj2), true);
    });
    it('should return that the objects are not equal', () => {
        let obj1 = new TestClass("testing", 123);
        let obj2 = new TestClass("Testing", 123);
        assert.strictEqual(equals(obj1, obj2), false);
    });
});