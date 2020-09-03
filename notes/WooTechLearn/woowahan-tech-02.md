---
title: 우아한테크러닝 React&TypeScript 02
emoji: 👨‍💻
tags:
  - 우아한테크러닝
  - React
  - TypeScript
---





## 자바스크립트 살펴보기



### 함수

자바스크립트의 함수는 값이라는 정의가 기본 전제로 하고있다.

> 함수는 일급 객체이기 때문이다

자바스크립트의 함수는 반드시 값을 반환해야 한다.

> 값을 반환하지 않는 함수를 가진 언어도 있다

`return` 이 없다면 암묵적으로 `언디파인트` 반환

new 키워드를 사용하면 생성자 함수로 동작



```js
function foo(x) {
  return 0;
}

// 함수를 값으로 취급할 때는 이름을 생략할 수 있다
const bar = function () {
 return 0;
};


/*
	즉시 실행함수
	단 한번만 실행된다 
*/
(function () {
})()

```

변수는 값이 등장하는 위치라고 생각 해볼 수 있다

인자도 값이 위치, 리턴할 때도 값이 위치한다.

```js
function foo(x) {
  x();
  return 0;
}

foo(function () {
});
```

```js
// 콜백 함수
function foo(x) {
  x();
  return function() {
  };
}

const y = foo(function() {

});

```

함수의 호출을 위임하는 것이 콜백 함수이다

함수를 실행하는 순간 함수를 생성해내는 함수를 일급함수라고 한다.

> 리액트의 HOC

함수를 리턴하는 함수는 값을 바로 리턴할 수 없다 (실행하여 값을 얻어야 하니까)

함수는 값으로 취급 할 수 있어!



### 함수의 변형

#### 화살표 함수

람다 함수라고도 한다.

```js
const bar = () => {

};
```

모든 자바스크립트 문은 식과 문으로 나눌수 있다.

함수의 호출은 식으로 평가될 수 있다.

세미콜론이 있는지 없는지를 보면 식인지 문인지 구분이 가능하다.

화살표 함수는 식별자가 없기 때문에 재귀호출이 불가능하다.

#### this

this는 빈 객체

이때, 값을 할당하면 동적 바인딩을 하는 것이다

```js
function foo() {
	this.name = 10; // 동적 바인딩으로 값을 할당
}

const y = new foo();

if (y instanceof foo) {
	
}
```

new 연산자는 결국 객체를 만들어 낸다

내가 원하는 객체가 맞는지 확인하는 과정은 아주 피곤하다

그러니까 객체를 인증할 수 있는 생성자를 만들어 두면

객체의 형태를 확인하기 쉽다

어떤 함수가 만든건지 확인이 되면 완벽하지 않아도 검증이 가능하다

생성자 함수는 암묵적이기 때문에 명시적으로 표현하기 위해 class가 등장한 것이다

```js
class foo {
	constructor() {
		this.name = 10;
	}
}
```

클래스는 new 연산자 없이 호출하여도 생성이 가능하다

하지만 그냥 호출이 되고 생성은 불가능하다



## 비동기

### 일반적인 비동기 콜백 패턴

```js
setTimeout(function (x) {
	console.log('앗싸');
	setTimeout(function(y) {
		console.log('웃싸');
	}, 2000);
}, 1000);
```

#### 프로미스

```js
const p1 = new Promise((resolve, reject) => {
	resolve(); // 성공
	reject(); // 실패
});

p1.then(function(r) {
	// 성공하면 then에 들어있는 함수가 실행

}).catch(function() {
	// 실패하면 then에 들어있는 함수가 실행
})

```

resolve, reject 둘 다 함수

```js
const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('응답');
	}, 1000);
});

const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('응답2');
	}, 1000);
});

p1.then(p2)
.then(function(r) {
	console.log(r);
}).catch(function() {

});

```



### async / await

```js
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log('1');
  await delay(2000);
  console.log('2');
}

main();

```

```js
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log('1');
  try {
    const x = await delay(2000);
  } catch (e) {
    console.log(e);
  }
  console.log('2');
}

main();

```





## 리덕스 직접 구현해보기

```js
/* index.js */
import { createStore } from "./redux";

const INCRE = "incre";
const RESET = "reset";

function reducer(state = {}, action) {
  if (action.type === INCRE) {
    return {
      ...state,
      count: state.count ? state.count + 1 : 1
    };
  } else if (action.type === RESET) {
    return {
      ...state,
      count: action.resetCount
    };
  }
  return state;
}

const store = createStore(reducer);

function update() {
  console.log(store.getState());
}

store.subscribe(update);

function actionCreator(type, data) {
  return {
    ...data,
    type: type
  };
}

function incre() {
  store.dispatch(actionCreator(INCRE));
}

function reset() {
  store.dispatch(actionCreator(RESET, { resetCount: 10 }));
}

store.dispatch({ type: "incre" });
store.dispatch({ type: INCRE });
store.dispatch(actionCreator(INCRE));
incre();
reset();

console.log(store.getState());

```

```js
/* redux.js */
export function createStore(reducer) {
  let state;
  const listeners = [];
  const getState = () => ({ ...state });
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(fn => fn());
  };
  const subscribe = fn => {
    listeners.push(fn);
  };
  return {
    getState,
    dispatch,
    subscribe
  };
}

```

