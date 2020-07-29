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
