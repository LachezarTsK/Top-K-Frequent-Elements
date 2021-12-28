
# include<vector>
# include<unordered_map>

using namespace std;

class Solution {

public:
	unordered_map<int, int> frequency;

	vector<int> topKFrequent(vector<int>& nums, int k) {

		fillMap_frequency(nums);
		vector<int> uniqueInt;

		for (auto& [key, value] : frequency) {
			uniqueInt.push_back(key);
		}

		if (uniqueInt.size() == k) {
			return uniqueInt;
		}

		return quickSelect(uniqueInt, k);
	}

	vector<int> quickSelect(vector<int>& uniqueInt, int k) {

		int left = 0;
		int right = uniqueInt.size() - 1;
		int pivot = uniqueInt.size();

		while (pivot != k) {
			pivot = partition(uniqueInt, left, right);
			if (k > pivot) {
				left = pivot;
			}
			else {
				right = pivot - 1;
			}
		}
		return vector<int>(uniqueInt.begin(), uniqueInt.begin() + k);
	}

	int partition(vector<int>& uniqueInt, int left, int right) {

		int pivotIndex = left + (right - left) / 2;
		int pivotFrequency = frequency.at(uniqueInt[pivotIndex]);

		while (left < right) {
			if (frequency.at(uniqueInt[left]) <= pivotFrequency) {
				swap(uniqueInt[left], uniqueInt[right]);
				right--;
			}
			else {
				left++;
			}
		}

		if (frequency.at(uniqueInt[left]) > pivotFrequency) {
			left++;
		}
		return left;
	}

	void fillMap_frequency(vector<int>& nums) {
		for (auto& n : nums) {
			if (frequency.find(n) == frequency.end()) {
				frequency[n] = 1;
			}
			else {
				int update = frequency[n] + 1;
				frequency[n] = update;
			}
		}
	}
};
