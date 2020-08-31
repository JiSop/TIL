/**
 * **빠른 정렬**
 *
 * 선택한 요소를 기준으로 나누어 분할 정복을 통해 리스트를 정렬한다.  
 * 이미 정렬이 되어 있거나 거의 정렬이 되어있는 경우 비효율 적이다.
 * - 시간 복잡도
 *   - 최상·평균: O(n log n)
 *   - 최악: O(n2)
 * - 불안정 정렬
 *
 * 1. 피펏 : 리스트에서 하나의 요소 선택한다.
 * 2. 분할 : 피벗을 기준으로 리스트를 둘로 나눈다.
 *   - 피벗 앞에는 피벗보다 값이 작은 모든 요소
 *   - 피벗 뒤에는 피벗보다 값이 큰 모든 요소
 *   - 분할을 마친 뒤 피펏은 고정
 * 3. 재귀 : 분할된 두 개의 작은 리스트에 대해 재귀적으로 이 과정을 반복한다.
 *   - 재귀 호출이 한번 진행될 때마다 최소한 하나의 요소는 최종적인 위치가 정해진다.
 */
function quick(arr, low, high) {
  let i;
  let j;
  let pivot;

  while (high > low) {
    i = low;
    j = high;
    pivot = arr[low]; // 첫 번째 요소

    while (i < j) { // 엇갈릴 때 까지 반복

      while (arr[j] > pivot) j--; // 키 값보다 작은 값을 만날 때 까지  
      arr[i] = arr[j];

      while (arr[i] <= pivot && i < j) i++; // 키 값보다 큰 값을 만날 때 까지, i는 j보다 작아야 한다.
      arr[j] = arr[i];
    }
    arr[i] = pivot;
    quick(arr, low, i - 1);
    low = i + 1;
  }
  return arr;
}
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  return quick([...arr], 0, arr.length - 1);
}

const arr = [10, 1, 4, 3, 2, 6, 9, 8, 7];
console.log(quickSort(arr));
console.log(arr);

function quick2(arr, start, end) {
  if (start >= end) return;
  let key = start;
  let i = start + 1;
  let j = end;
  let temp;
  while (i <= j) {
    while (arr[i] <= arr[key]) i++;
    while (arr[j] >= arr[key] && key < j) j--;
    if (i > j) {
      temp = arr[j];
      arr[j] = arr[key];
      arr[key] = temp;
    } else {
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }
  quick2(arr, start, j - 1);
  quick2(arr, j + 1, end);
  return arr;
}
function quickSort2(arr) {
  return quick2([...arr], 0, arr.length - 1);
}
