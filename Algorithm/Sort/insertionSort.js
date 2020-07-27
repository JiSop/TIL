function insertionSort(arr) {
  let sorted_arr = [];
  function insertIndex(sorted_arr, value) {
    for (let i in sorted_arr) {
      if (value < sorted_arr[i]) return i;
    }
    return sorted_arr.length;
  }

  while (arr.length != 0) {
    let value = arr.shift();
    let index = insertIndex(sorted_arr, value);
    sorted_arr.splice(index, 0, value);
  }
  return sorted_arr;
}
