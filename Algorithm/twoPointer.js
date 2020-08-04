/**
 * 특정한 합을 가지는 부분 연속수열 찾기
 * @param arr 합을 찾을 배열
 * @param sum 카운트 할 합
 */
function twoPointer(arr, sum) {
  let count = 0;
  let tempSum = 0;
  let end = 0;
  for (let start = 0; start < arr.length; start++) {
    while (tempSum < sum && end < arr.length) {
      tempSum += arr[end];
      end++;
    }
    if (tempSum === sum) count++;
    tempSum -= arr[start];
  }
  return count;
}

const arr = [1, 2, 3, 2, 5];
console.log(twoPointer(arr, 5)); // 3
