---
title: JavaScript Optimize code style
emoji: ✨
tags:
  - JavaScript
---


배열을 순회하면서 `accumulator`와 `value`를 더해서 `sum`을 만들고, 마지막에 배열의 크기로 나누는 로직

```js
const data = [1, 2, 3, 4, 5, 6, 1];

const reducer = (accumulator, value, index, array) => {
  const sumOfAccAndVal = accumulator + value;
  if (index === array.length - 1) {
    return (sumOfAccAndVal) / array.length;
  }
  return sumOfAccAndVal;
};

const getMean = data.reduce(reducer, 0);
console.log(getMean); // 3.142857142857143
```

초기값을 `0`으로 설정하지 않아도 첫 번째 인자인 `data[0]`가 `accumulator`로 넘어간다.

하지만 초기값을 설정하는 것이 더 안전하다.



```js
const data = [1, 2, 3, 4, 5, 6, 1];

const reducer = (accumulator, value, index, array) => {
  const arrLength = array.length; // 상위 스코프 탐색을 줄일 수 있다. 
  const sumOfAccAndVal = accumulator + value;
  if (index === arrLength - 1) {
    return (sumOfAccAndVal) / arrLength;
  }
  return sumOfAccAndVal;
};

const getMean = data.reduce(reducer, 0);
console.log(getMean); // 3.142857142857143
```

`const arrLength = array.length`와 같이 배열의 길이를 변수로 선언해서 재사용하면 상위 스코프로 이동해서 탐색하고 참조를 한번만 수행하면 되기 때문에 성능을 높일 수 있다.

하지만 위와 같은 경우에서는 오히려 비효율적이다.  
if 문이 배열의 마지막 요소에 도달 했을때 동작하는 조건이기 때문에 요소의 마지막에만 두 번의 상위 스코프 탐색, 참조가 일어나기 때문이다.

상위 스코프에서 참조한 값을 새로운 변수에 할당하고 변수를 다시 참조해야 하기 때문이다.

`if (index === array.length - 1)` 같이 사용할때는 변수 선언과 할당이 과정이 줄어든다.

아주 미세한 차이지만 데이터의 양이 많다면 큰 차이가 발생할 수 있다.



가독성을 신경쓰지 않고 아주 경미한 차이지만 성능만 생각한다면 이렇게 만들수 있다.

```js
const data = [1, 2, 3, 4, 5, 6, 1];

const reducer = (accumulator, value, index, array) => {
  if (index === array.length - 1) (accumulator + value) / array.length;
  return accumulator + value;
};

const getMean = data.reduce(reducer, 0);
console.log(getMean); // 3.142857142857143
```

> if 문이 값을 반환만 한다면 return을 생략할 수 있다. 
>
> 근데 생략하면 자바스크립트 엔진이 문맥을 파악할 때 자동으로 삽입을 해주는데
>
> 그 과정에서 성능하락이 발생할까?
>
> > 아주아주 미세한 차이지만 return을 생략했을때가 더 빨랐다. 왜지...?
> >
> > 자동으로 삽입하는 것이 아니라 생략해도 같은 문맥으로 이해하기 때문인가?
> >
> > 토크나이징이라던가 하는 과정이 줄어서 인가? 흠..



#### 평탄화(flatten)

```js
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const flatArrayReducer = (accumulator, value, index, array) => {
  return accumulator.concat(value);
};
const flattenedData = data.reduce(flatArrayReducer, []); 
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

```js
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const flatArrayReducer = (accumulator, value, index, array) => {
  return [...accumulator, ...value];
};
const flattenedData = data.reduce(flatArrayReducer, []); 
console.log(flattenedData);
```

```js
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const flatArrayReducer = (accumulator, value, index, array) => [...accumulator, ...value];
const flattenedData = data.reduce(flatArrayReducer, []); 
console.log(flattenedData);
```

`.concat()`을 사용한 것 보다는 스프레드 연산자를 사용한 것이 더 빨랐다.

화살표 함수에서 중괄호를 생략하여 리턴한 것 보다 중괄호를 사용하고 명시적으로 return을 한 것이 아주아주아주아주 근소한 차이지만 더 빨랐다.

왜...?

var 키워드가 스코프로 인정하는 범위와 연관이 있을 것 같다.

함수 범위 스코프 같은 경우는 중괄호를 생략한다면 엔진이 문맥을 파악하고 스코프를 만들어줘야 하지만

if 문 같은 경우는 const, let키워드가 있는게 아니라면 스코프를 생략하기 때문일까?



## Reference

[[자바스크립트] 성능을 높이는 코드 스타일](https://12bme.tistory.com/134)

