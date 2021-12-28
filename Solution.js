
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    const solution = new TopKFrequent();
    return solution.sort_topKFrequent(nums, k);
};

class TopKFrequent {

    constructor() {
        this.frequency = new Map();
        this.uniqueInt = [];
    }

    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    sort_topKFrequent(nums, k) {

        this.fillMap_frequency(nums);
        for (let n of this.frequency.keys()) {
            this.uniqueInt.push(n);
        }

        if (this.uniqueInt.length === k) {
            return this.uniqueInt;
        }

        return this.quickSelect(k);
    }

    /**
     * @param {number} k
     * @return {number[]}
     */
    quickSelect(k) {

        let left = 0;
        let right = this.uniqueInt.length - 1;
        let pivot = this.uniqueInt.length;

        while (pivot !== k) {
            pivot = this.partition(left, right);
            if (k > pivot) {
                left = pivot;
            } else {
                right = pivot - 1;
            }
        }
        return this.uniqueInt.slice(0, k);
    }

    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    partition(left, right) {

        let pivotIndex = left + Math.floor((right - left) / 2);
        let pivotFrequency = this.frequency.get(this.uniqueInt[pivotIndex]);

        while (left < right) {
            if (this.frequency.get(this.uniqueInt[left]) <= pivotFrequency) {
                let temp = this.uniqueInt[left];
                this.uniqueInt[left] = this.uniqueInt[right];
                this.uniqueInt[right] = temp;
                right--;
            } else {
                left++;
            }
        }

        if (this.frequency.get(this.uniqueInt[left]) > pivotFrequency) {
            left++;
        }
        return left;
    }

    /**
     * @param {number[]} nums
     */
    fillMap_frequency(nums) {
        for (let n of nums) {
            if (!this.frequency.has(n)) {
                this.frequency.set(n, 1);
            } else {
                this.frequency.set(n, this.frequency.get(n) + 1);
            }
        }
    }
}
