const increment = input => input + 1;
const decrement = input => input - 1;
const double = input => input * 2;
const halve = input => input / 2;

const initial_value = 1;

// 1. 일반적일 수 있는 로직
const incremented_value = increment(initial_value);
const doubled_value = double(incremented_value);
const final_value = decrement(doubled_value);
console.log(final_value); // 3

// 2. reduce를 활용한 함수형 프로그래밍
const pipeline = [
  increment,
  double,
  decrement,
  decrement,
  decrement,
  halve,
  double,
];
const final_value2 = pipeline.reduce((accumulator, func) => {
  console.log(func);
  return func(accumulator);
}, initial_value);

console.log(final_value2); // 1
