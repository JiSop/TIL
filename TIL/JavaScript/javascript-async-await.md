# async/await

async / await 를 사용하면 프로미스를 더 편하게 사용할 수 있고, 가독성이 좋아진다.



## async

`async` 키워드는 `function` 키워드와 함께  `async function` 키워드로 사용하여 `AsyncFunction` 객체를 반환하는 하나의 비동기 함수를 정의하고, 암묵적으로 `Promise`를 사용하여 결과를 반환한다.

```javascript
// async function 선언
async function asyncFuncDeclare() {
  return /* ... */;
}

// async function 표현식 (ES6 화살표 함수 문법)
const asyncFuncExpression = () => {
  return /* ... */;
};

```

### 항상 Promise를 반환 한다.

`async`가 붙은 해당 함수는 항상 프로미스를 반환하고, 프로미스가 아닌 값을 반환하더라도 이행 상태의 프라미스(resolved promise)로 값을 감싸 이행된 프라미스가 반환되도록 한다.

```javascript
async function func() {
  return 1;
}

func().then(alert); // 1

```

명시적으로 프로미스를 반환하는 것도 가능 하지만 결과는 동일하다.

```javascript
async function func() {
  return Promise.resolve(1);
}

func().then(alert); // 1

```





## await

`await` 키워드는 `Promise`가 처리될 때까지 기다리기 위해 사용하는 연산자다. `async function` 내부에서만 사용할 수 있고, 프로미스가 처리되면 그 결과와 함께 실행이 재개된다.

`await`는 다음에 오는 문의 값이 프로미스가 아니면 해당 값을 resolved Promise로 변환시킨다.

### Promise 처리를 기다린다.

`await`를 만나면 프로미스가 처리(settled)될 때까지 기다리고 결과는 그 이후 반환된다.

함수를 호출하고, 함수 본문이 실행되는 도중에 실행이 잠시 '중단’되었다가 프로미스가 처리되면 실행이 재개된다.

```javascript
async function func() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000)
  });
  let result = await promise; // 프라미스가 이행될 때까지 기다림
  alert(result); // "완료!"
}

func();

```

프로미스 처리가 성공하면 `await`는 *fulfill* 된 해당 값을 리턴하고, 실패하면 `await`는 *reject* 된 값을 `throw`한다.

> 프로미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있어 CPU 리소스 낭비를 줄일 수 있다. 



### 에러 핸들링

프로미스가 *reject* 되면 `throw`문을 작성한 것처럼 에러가 던져진다.

```javascript
async function func() {
  await Promise.reject(new Error("에러 발생!"));
}
```

위의 코드는 아래의 코드와 동일하다.

```javascript
async function func() {
  throw new Error("에러 발생!");
}
```

프로미스가 *reject* 되기 전에 시간이 걸리면서 `await`가 에러를 `throw` 하는 것에 딜레이가 발생하는 경우,  `try..catch`를 사용할 수 있다.

```javascript
async function func() {
  try {
    let response = await fetch('...');
    let data = await response.json();
  } catch(err) {
    // fetch와 response.json에서 발행한 에러 모두를 여기서 잡는다.
    alert(err);
  }
}

func();

```

에러가 발생하면 제어 흐름이 `catch` 블록으로 넘어가고, 여러 줄의 코드를 `try`로 감싸는 것도 가능하다.

`.catch`만 사용해 `async function` 외부에서  *reject* 된 프로미스를 처리할 수도 있다.

```javascript
async function func() {
  let response = await fetch('...');
}

func().catch(alert);

```

> **async/await 와 promise.then/catch**
>
> `async/await`을 사용하면 `await`가 대기를 처리해주기 때문에 `.then`을 사용할 일이 거의 없고, `.catch` 대신 일반 `try..catch`를 사용할 수 있다는 장점이 생긴다. 하지만 `async`함수 바깥의 최상위 레벨 코드에선 `await`를 사용할 수 없기 때문에 위의 코드 처럼 `.then/catch`를 추가해 최종 결과나 처리되지 못한 에러를 다룬다.



### 일반 함수에는 await를 사용할 수 없다.

일반 함수에서 `await`을 사용하면 문법 에러가 발생한다.

```javascript
function func() {
   let promise = Promise.resolve(1);
   let result = await promise; // Syntax error
 }
 
```



### 최상위 레벨 코드에서 작동하지 않는다.

최상위 레벨 코드(top-level code)에서 `await`는 사용할 수 없다.

```javascript
// 최상위 레벨 코드에선 문법 에러가 발생한다.
let response = await fetch('...');
let data = await response.json();
```

하지만 익명 async 함수로 코드를 감싸면 최상위 레벨 코드에도 `await`를 사용할 수 있다.

```javascript
(async () => {
  let response = await fetch('...');
  let data = await response.json();
  ...
})();

```



### async 클래스 메서드

메서드 이름 앞에 `async`를 추가하면 async 클래스 메서드를 선언할 수 있다.

```javascript
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1

```

> `async` 메서드와 `async` 함수는 프라미스를 반환하고 `await`를 사용할 수 있다는 점이 동일하다.



### thenable 객체를 사용할 수 있다.

`promise.then`처럼 `await`에도 thenable 객체(`then` 메서드가 있는 호출 가능한 객체)를 사용할 수 있다. 서드파티에서 받은 객체가 `.then`을 지원하면 이 객체를 `await`와 함께 사용할 수 있다.

> **thenable 객체**
>
> 서드파티 객체가 프로미스가 아니지만 프로미스와 호환 가능한 객체를 제공할 수 있다는 점에서 생긴 기능

`await`는 `.then`이 구현되어있으면서 프라미스가 아닌 객체를 받으면, 내장 함수 `resolve`와 `reject`를 인수로 제공하는 메서드인 `.then`을 호출한다(일반 `Promise` executor가 하는 일과 동일).



## 요약

- `async` 키워드는 `function` 키워드와 함께 사용하여  async 함수를 정의한다.

- `async`가 붙은 함수는 반드시 프로미스를 반환하고, 프로미스가 아닌 경우 프로미스로 감싸 반환한다.
- `await`는  `Promise`가 처리될 때까지 기다리기 위해 사용하는 연산자다.
- `async function` 내부에서 만 `await`를 사용할 수 있다.
- `await`은 프로미스가 성공하면 프라미스 객체의 result 값을 반환하고, 에러가 발생하면 `throw`한다.

### 한 줄 요약

async / await는 프로미스를 기반으로 하고, 비동기 코드를 작성하면서 이해하기 쉽고 읽기 편하게 만들어 준다.



## reference

[async function 표현식 - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/async_function)

[AsyncFunction - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)

[async function - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

[await - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/await)

[async와 await | javascript.info](https://ko.javascript.info/async-await)

