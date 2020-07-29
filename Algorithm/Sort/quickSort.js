/**
 * **빠른 정렬**  
 * 
 * 분할 정복을 통해 리스트를 정렬한다.
 * - 시간 복잡도
 *   - 최상·평균: O(n log n)
 *   - 최악: O(n2)
 * - 불안정 정렬
 * 
 * 1. **피펏**: 리스트에서 하나의 요소 선택한다.
 * 2. **분할**: 피벗을 기준으로 리스트를 둘로 나눈다.
 *   - 피벗 앞에는 피벗보다 값이 작은 모든 요소
 *   - 피벗 뒤에는 피벗보다 값이 큰 모든 요소
 *   - 분할을 마친 뒤 피펏은 고정
 * 3. **재귀**: 분할된 두 개의 작은 리스트에 대해 재귀적으로 이 과정을 반복한다.
 *   - 재귀 호출이 한번 진행될 때마다 최소한 하나의 요소는 최종적인 위치가 정해진다.
 */
function quickSort(arr) {
  if (arr.length <= 1) return [...arr];
  const pivot = arr[0];
  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

const arr = [10, 1, 4, 3, 2, 6, 9, 8, 7];
console.log(quickSort(arr));
console.log(arr);

// function quickSort(arr) {
//   if (arr.length <= 1) return [...arr];
//   let sorted_arr = [...arr];
//   const pivot = sorted_arr[0];
//   let left = [];
//   let right = [];
//   for (let i = 1; i < sorted_arr.length; i++) {
//     if (sorted_arr[i] < pivot) {
//       left.push(sorted_arr[i]);
//     } else {
//       right.push(sorted_arr[i]);
//     }
//   }
//   return quickSort(left).concat(pivot, quickSort(right));
// }

// const arr = [10, 1, 4, 3, 2, 6, 9, 8, 7];
// console.log(quickSort(arr));
// console.log(arr);
