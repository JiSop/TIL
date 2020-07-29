// 현재 값 보다 다음에 위치한 값들 중 현재 값보다 작은 값을 찾아 위치를 바꾼다.
function selectionSort(arr) {
  if (arr.length <= 1) return [...arr];
  let sorted_arr = [...arr];
  for (let i = 0; i < sorted_arr.length; i++) {
    let min_index = i; // 최소 값의 위치 인덱스가 저장된다.

    for (let j = i + 1; j < sorted_arr.length; j++) {
      // 현재 값 보다 비교한 값이 더 작다면 실행
      if (sorted_arr[j] < sorted_arr[min_index]) {
        min_index = j; // 현재 값 보다 작은 값의 인덱스를 min_index에 저장
      }
    }

    // min_index의 값이 바뀌었다면 실행
    if (min_index !== i) {
      const temp = sorted_arr[min_index]; // 찾아낸 값을 임시저장
      sorted_arr[min_index] = sorted_arr[i]; // 찾아낸 값의 위치에 현재 값을 할당
      sorted_arr[i] = temp; // 현재 값에 임시저장 해둔 값을 할당
    }
  }
  return sorted_arr;
}

const arr = [10, 1, 4, 3, 2, 6, 9, 8, 7];
console.log(selectionSort(arr));
console.log(arr);
