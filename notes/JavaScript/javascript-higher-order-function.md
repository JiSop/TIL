---
title: JS Higher Order Function
emoji: 📙
tags:
  - JavaScript
---


## .reduce()

```js
Array.prototype.reduce<U>(callback: (state: U, element: T, index: number, array: T[]) => U, firstState?: U): U
```

- 원본 배열을 수정하지 않는다.
- **이전의 콜백함수 실행 반환값을 전달** 하여 콜백함수를 실행하고 그 결과를 반환한다.
- 두번째 인수로 초기값을 전달할 수 있다.
  - 콜백 함수에 최초로 전달된다.
- **객체의 프로퍼티 값을 합산하는 경우에는 반드시 초기값을 전달해야 한다.**
  - 빈 배열을 호출하면 에러가 발생한다.
  - 초기값을 전달하면 에러를 회피할 수 있다.
  - **언제나 초기값을 전달하는 것이 보다 안전하다.**

### reduce 응용

#### 평균 구하기(getMean)

배열을 순회하면서 `accumulator`와 `value`를 더해서 `sum`을 만들고, 마지막에 배열의 크기로 나누는 로직

```js
const data = [1, 2, 3, 4, 5, 6, 1];

const reducer = (accumulator, value, index, array) => {
  if (index === array.length - 1) (accumulator + value) / array.length;
  return accumulator + value;
};

const getMean = data.reduce(reducer, 0);
console.log(getMean); // 3.142857142857143
```

초기값을 `0`으로 설정하지 않아도 첫 번째 인자인 `data[0]`가 `accumulator`로 넘어간다.

하지만 초기값을 설정하는 것이 더 안전하다.



#### 평탄화(flatten)

```js
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const flatArrayReducer = (accumulator, value, index, array) => {
  return [...accumulator, ...value];
};
const flattenedData = data.reduce(flatArrayReducer, []); 
console.log(flattenedData); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```



#### 평탄화 맵핑(flattenMap)

배열을 순회하면서 배열의 값으로 들어있는 object 의 key 존재여부를 확인하고,  
unique 한 “cast 를 key 로 갖는 배열의 값들”을 최종적으로 return 하는 로직

```js
const input = [
  {
    "title": "슈퍼맨",
    "year": "2005",
    "cast": ["장동건", "권상우", "이동욱", "차승원"]
  },
  {
    "title": "스타워즈",
    "year": "2013",
    "cast": ["차승원", "신해균", "장동건", "김수현"]
  },
  {
    "title": "고질라",
    "year": "1997",
    "cast": []
  }
];
const flatMapReducer = (accumulator, value, index, array) => {
  const key = "cast";
  if (value.hasOwnProperty(key) && Array.isArray(value[key])) {
    value[key].forEach(val => {
      if (accumulator.indexOf(val) === -1) {
        accumulator.push(val);
      }
    });
  }
  return accumulator;
};
const flattenCastArray = input.reduce(flatMapReducer, []);
console.log(flattenCastArray); // ['장동건', '권상우', '이동욱', '차승원', '신해균', '김수현']
```



#### reduce를 map 처럼 사용

```js
const arr = [1, 2, 3];

const mapReducer = (acc, value) => {
    acc.push(value * 2);
    return acc;
};

const result = arr.reduce(mapReducer, []);

const result2 = arr.reduce((acc, value) => {
    acc.push(value * 2)
    return acc;
}, []);

const result3 = arr.reduce((acc, value) => [...acc, value * 2], []);
```



#### reduce를 filter 처럼 사용

```js
var arr = [4, 15, 377, 395, 400, 1024, 3000]
var arr2 = arr.reduce((pre, value) => {
    if (value % 5 == 0) {
        pre.push(value);
    }
    return pre;
}, []);
```





### reduce와 다른 고차함수 비교

#### reduce vs. map

```js
const data = [1, 2, 3];
const initialValue = [];

const reducer = (accumulator, value) => {
  accumulator.push(value * 2);
  return accumulator;
};

const result = data.reduce(reducer, initialValue);
console.log(result); // [2, 4, 6]

const result2 = data.map(x => x * 2);
console.log(result2); // [2, 4, 6]
```

map이 더 가독성이 좋다.



#### reduce vs. filter

```js
const data = [1, 2, 3, 4, 5, 6];
const initialValue = [];

const reducer = (accumulator, value) => {
  if (value % 2 != 0) {
    accumulator.push(value);
  }
  return accumulator;
};

const result1 = data.reduce(reducer, initialValue);
console.log(result1); // [1, 3, 5]

const result2 = data.filter(x => x % 2 != 0);
console.log(result2); // [1, 3, 5]
```

filter가 더 가독성이 좋다.



#### reduce vs. filter+map

```js
const data = [1, 2, 3, 4, 5, 6];
const initialValue = [];

const reducer = (accumulator, value) => {
  if (value % 2 != 0) {
    accumulator.push(value * 2);
  }
  return accumulator;
}

const result1 = data.reduce(reducer, initialValue);
console.log(result1); // [2, 6, 10]

const result2 = data.filter(x => x % 2 != 0).map(x => x * 2);
console.log(result2); // [2, 6, 10]
```

filter/map을 동시에 수행해야 한다면 배열을 두 번 순회해야 한다. 하지만 reduce를 사용한다면 배열을 한 번만 순회하면 된다.

reducer라는 함수로 로직이 분리되어 있어 순회를 적게해 비용이 적게든다. 하지만 filter/map을 사용하면 어떤 작업을 수행하는지 더 직관적이다.

- filter/map
  - 배열을 두 번 순회
  - 어떤 작업을 수행하는지 더 직관적
- reducer
  - 배열을 한 번만 순회
  - 재사용성



## .filter()

배열에서 특정 케이스만 필터링 조건으로 추출하여 새로운 배열을 만들고 싶을 때 사용한다.

```js
Array.prototype.filter(callback: (value: T, index: number, array: Array) => any, thisArg?: any): T[]
```

- 원본 배열을 수정하지 않는다.
- filter 메소드를 사용하면 if 문을 대체할 수 있다.
- **콜백함수의 실행 결과가 true인 배열 요소의 값만을 추출한 새로운 배열을 반환한다.**



## .map()

map 메소드는 배열을 순회하며 요소 값을 다른 값으로 맵핑하기 위한 함수이다.

```js
Array.prototype.map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] 
```

- 원본 배열을 수정하지 않는다.
- **콜백 함수의 반환값(결과값)으로 새로운 배열을 생성하여 반환한다.**

- 두번째 인자로 this를 전달할 수 있다.
  - 배열 요소의 값, 요소 인덱스, map 메소드를 호출한 배열
  - 2번째 인자 this를 전달하지 않으면 this === window
  - ES6의 [Arrow function](https://poiemaweb.com/es6-arrow-function)를 사용하면 this를 생략하여도 동일한 동작을 한다.



## .forEach()

forEach 메소드는 배열을 순회하며 요소 값을 참조하여 무언가를 하기 위한 함수이다.

```js
Array.prototype.forEach(callback: (value: T, index: number, array: T[]) => void, thisArg?: any): void
```

- 원본 배열을 수정하지 않는다.
  - forEach 메소드는 원본 배열(this)을 변경하지 않는다.
- 배열을 순회하며 배열의 각 요소에 대하여 인자로 주어진 콜백함수를 실행한다.  
  **반환값은 undefined이다.**
- 배열의 모든 요소를 순회하며 중간에 순회를 중단할 수 없다.
-  for 문에 비해 성능이 좋지는 않지만 for 문보다 가독성이 좋다.
- 두번째 인자로 this를 전달할 수 있다.
  - 배열 요소의 값, 요소 인덱스, filter 메소드를 호출한 배열





## Reference

<https://medium.com/@hongkevin/js-3-자바스크립트-배열-메서드-reduce-100-활용법-feat-egghead-io-97c679857ece>

https://opentogether.tistory.com/77
