function compareTriplets(a, b) {
  let i = 0;
  const pointArr = [0, 0];
  while (i !== a.length) {
    if (a[i] > b[i]) pointArr[0]++;
    if (a[i] < b[i]) pointArr[1]++;
    i++;
  }
  return pointArr;
}

const a = [17, 28, 30];
const b = [99, 16, 8];

console.log(compareTriplets(a, b));
