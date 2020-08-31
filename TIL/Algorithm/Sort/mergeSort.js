/**
 * **병합 정렬**
 *
 * 재귀적으로 리스트를 절반으로 잘라 분할 정복하여 정렬한다.
 * 리스트의 길이가 1 이하이면 이미 정렬된 것으로 본다.
 * - 시간 복잡도: O(n log n)
 * - 공간 복잡도: O(n)
 * - 안정 정렬
 *
 * 1. 분할 : 정렬되지 않은 리스트를 절반으로 잘라 비슷한 크기의 두 리스트로 나눈다.
 * 2. 정복 : 각 부분 리스트를 재귀적으로 합병 정렬을 이용해 정렬한다.
 * 3. 결합 : 두 부분 리스트를 다시 하나의 정렬된 리스트로 합병한다.
 *    - 이때 정렬 결과가 임시배열에 저장된다.
 * 4. 복사 : 임시 배열에 저장된 결과를 원래 배열에 복사한다.
 */
function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

const arr = [10, 1, 4, 3, 2, 6, 9, 8, 7];
console.log(mergeSort(arr));
