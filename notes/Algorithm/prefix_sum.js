// 특정 구간의 합
function prefixSum(arr, left, right) {
  let sum = 0;
  let preSum = [0];
  for (const i of arr) {
    sum += i;
    preSum = [...preSum, sum];
  }
  return preSum[right] - preSum[left - 1];
}
const arr = [10, 20, 30, 40, 50];
console.log(prefixSum(arr, 4, 5));
