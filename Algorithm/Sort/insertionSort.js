/**
 * **삽입 정렬**  
 * 
 * 모든 요소를 하나씩 이동해야 하므로 비용이 많이 든다.
 * - 시간 복잡도
 *   - 최상: O(n)
 *   - 평균: O(n2)
 *   - 최악: O(n2)
 */
function insertionSort(arr) {
  if (arr.length <= 1) return [...arr];
  let sorted_arr = [...arr];

  // 배열의 두 번째 인덱스(sorted_arr[1]) 부터 배별의 마지막 요소까지 만큼 반복
  for (let i = 1; i < sorted_arr.length; i++) {
    const key = sorted_arr[i]; // 현재 값을 저장하여 키로 사용

    let j = i - 1; // 인덱스 i의 이전 인덱스
    // j가 0보다 작거나 같고 key 값 보다 이전 값(sorted_arr[j])이 작은 값일 때 까지 j를 감소 시키며 반복
    for (j; j >= 0 && key < sorted_arr[j]; j--) {
      sorted_arr[j + 1] = sorted_arr[j]; // 현재 값에 이전 값을 할당
    }
    // j+1은 해당 값이 삽입 될 인덱스 이다.
    sorted_arr[j + 1] = key; // 저장해 두었던 key 값을 삽입
    console.log(`key: ${key}, j+1: ${j + 1}`);
  }
  return sorted_arr;
}

const arr = [10, 1, 4, 3, 2, 6, 9, 8, 7];
console.log(insertionSort(arr));
console.log(arr);
