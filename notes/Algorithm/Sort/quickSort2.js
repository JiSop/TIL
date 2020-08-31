/**
 * **빠른 정렬**  
 * 자바스크립트 기본 라이브러리 활용
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

