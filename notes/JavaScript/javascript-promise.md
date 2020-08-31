---
title: JS Promise
emoji: 📙
tags:
  - JavaScript
---

# JavaScript Promise

프로미스는 자바스크립트 비동기 처리에 사용되는 객체이고 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용한다. 

ES6에서는 전통적인 콜백 패턴이 가진 단점을 보완하고 비동기 처리 시점을 명확하게 표현하는 패턴으로 Promise를 도입했다.



## Promise의 States

 `new Promise()`로 프로미스를 생성하고 종료 될 때까지 상태를 갖는다. (프로미스의 처리 과정)

| 상태          | 의미                                                         | 구현                                               |
| :------------ | :----------------------------------------------------------- | :------------------------------------------------- |
| **Pending**   | (대기) 비동기 처리가 아직 수행되지 않은 상태                 | resolve 또는 reject 함수가 아직 호출되지 않은 상태 |
| **Fulfilled** | (성공) 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태 | resolve 함수가 호출된 상태                         |
| **Rejected**  | (실패) 비동기 처리가 실패하거나 오류가 발생한 상태           | reject 함수가 호출된 상태                          |
| Settled       | fulfilled 또는 rejected와 상관 없이 pending 이 아닌 상태, 즉 비동기 처리가 수행된 상태 | resolve 또는 reject 함수가 호출된 상태             |



### Pending(대기)

`new Promise()` 메서드를 호출하면 pending 상태가 된다.

```javascript
new Promise();
```

`new Promise()` 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 `resolve`, `reject` 함수이다.

```js
new Promise(function(resolve, reject) {
  // ...
});
```

- Promise 생성자 함수의 인자: 비동기 처리를 수행할 콜백 함수
- 비동기 처리를 수행할 콜백 함수의 인수: `resolve` 함수, `reject` 함수



### Fulfilled(이행)

콜백 함수의 인자 `resolve`를 아래와 같이 실행하면 fulfilled 상태가 된다.

```javascript
new Promise(function(resolve, reject) {
  resolve();
});
```

이행 상태가 되면 아래와 같이 `then()`을 이용하여 처리 결과 값을 받을 수 있다.

```js
function getData() {
  return new Promise(function(resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolvedData로 받음
getData().then(function(resolvedData) {
  console.log(resolvedData); // 100
});

```



### Rejected(실패)

콜백 함수의 인자 `reject`를 아래와 같이 호출하면 rejected 상태가 된다.

```js
new Promise(function(resolve, reject) {
  reject();
});
```

실패 상태가 되면 실패 처리의 결과 값(에러)을 `catch()`로 받을 수 있다.

```js
function getData() {
  return new Promise(function(resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

// reject()의 결과 값 Error를 err에 받음
getData().then().catch(function(err) {
  console.log(err); // Error: Request is failed
});

```



## Promise 처리 과정

![promise](./img/promise.svg "프로미스 처리 흐흠 - 출처 : 자바스크립트 Promise 쉽게 이해하기 • Captain Pangyo")

*출처:* *[자바스크립트 Promise 쉽게 이해하기 • Captain Pangyo][자바스크립트 Promise 쉽게 이해하기 • Captain Pangyo]*

1. Promise 생성자 함수를 통해 인스턴스화

   - 콜백 함수를 인자로 전달받는데 이 콜백 함수는 `resolve`와 `reject` 함수를 인수로 전달

2. Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 비동기 처리 수행

3. 프로미스로 구현된 비동기 함수 내부에서 Promise 객체를 생성

4. 비동기식 처리 결과를 `resolve`와 `reject` 함수에 인수로 전달하면서 호출

   - 성공: `resolve` 함수에 결과 값 전달, 호출
   - 실패: `reject` 함수에 결과 값 전달, 호출

5. 프로미스로 구현된 비동기 함수는 Promise 객체를 반환

   - 반환된 Promise 객체는 상태(state) 정보를 가지고 있고, 호출한 함수에 따라서 결정된다.

   - `resolve` 함수 호출: fulfilled (성공)
   - `reject` 함수 호출: rejected (실패)

6. 비동기 처리 결과 값은 Promise 객체의 후속 처리 메소드에 전달



## Promise 후속 처리 메소드

프로미스로 구현된 비동기 함수는 Promise 객체를 반환하여야 한다. 

프로미스로 구현된 비동기 함수를 호출하는 측(promise consumer)에서는 Promise 객체의 후속 처리 메소드 then, catch, finally를 통해 비동기 처리 결과 또는 에러 메시지를 전달받아 후속 처리를 수행한다. 

Promise 객체는 상태를 갖는다고 하였다. 

이 상태에 따라 후속 처리 메소드를 체이닝 방식으로 호출한다. 프로미스의 후속 처리 메소드는 아래와 같다.



### Promise.prototype.then()

`.then()`은 두 개의 콜백 함수를 인자로 전달 받고 Promise 객체를 반환한다.

- **첫 번째 콜백 함수는 프로미스의 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출**
- **두 번째 콜백 함수는 프로미스의 실패(rejected, reject 함수가 호출된 상태) 시 호출**

```javascript
promise.then(
  function(result) {
    // ... 
  },
  function(error) {
    // ...
  }
);

// ES6 화살표 함수 문법
promise.then(
  result => { /* ... */},
  error => { /* ... */});

```

> `.then(null, f)` 
>
> 에러만 다루고 싶다면 첫 번째 인자로 `null`을 전달하면 된다.



### Promise.prototype.catch()

`.catch()`는 한 개의 콜백 함수를 인자로 전달 받고 Promise 객체를 반환한다. 주로 에러를 핸들링 할때 사용된다.

- **프로미스의 예외(비동기 처리 에러, then에서 발생한 에러) 발생시 호출**

```javascript
promise.catch(
  function(error) {
    // ...
  }
);

// ES6 화살표 함수 문법
promise.catch(error => { /* ... */ });

```

> `.catch(f)` == `.then(null,f)`
>
> 위의 두 개가 동일하다고 하는 것을 보니 syntax sugar인 듯 하다.



### Promise.prototype.finally()

`.finally()` 인수가 없고 프로미스의 상태와 상관없이 수행해야 할 처리를 한다.  
`.then()`과 `.catch()` 메소드에서 공통적으로 수행해야할 것을 처리하여 중복을 피할 수 있다.

`.finally()` 메소드는 프라미스 결과를 처리하기 위해 만들어진 것이 아니기 때문에 finally를 통과하여 후속 메소드에 전달 된다.

- **프로미스가 처리되면 성공(fulfilled) 또는 실패(rejected)와 상관없이 호출**

```javascript
promise.finally(
  function() {
    // ...
  }
);

// ES6 화살표 함수 문법
promise.finally(() => { /* ... */ });

```

> TC39 Stage 4  
> Expected Publication Year: 2018
>
> *참조:* *[Promise.prototype.finally() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)* */* *[tc39/proposal-promise-finally](https://github.com/tc39/proposal-promise-finally)*





## Promise Chaining

프로미스는 후속 처리 메소드를 체이닝(chaining)하여 여러 개의 프로미스를 연결하여 사용할 수 있다.

Promise 객체를 반환한 비동기 함수는 프로미스 후속 처리 메소드인 then, catch, finally 메소드를 사용할 수 있다.

```javascript
function promiseGet() {
  return new Promise({
    // ...
  });
}

// 프로미스 체이닝
promiseGet()
  .then(function(data) {
    // ...
  })
  .finally(function() {
    // ...
  })
  .catch(function(error) {
    // ...
  });

// ES6 화살표 함수 문법
promiseGet()
  .then(data => { /* ... */ })
  .finally(() => { /* ... */ })
  .catch(error => { /* ... */ });

```



## Promise 정적 메소드

Promise는 주로 생성자 함수로 사용되지만 5가지 정적 메소드를 제공한다. (함수도 객체이므로 메소드를 가질 수 있다)

> **Promise의 5가지 정적 메소드**
>
> - Promise.resolve()
> - Promise.reject()
> - Promise.all()
> - Promise.race()
> - Promise.allSettled()



### Promise.resolve()

`Promise.resolve()` 메소드는 인자로 전달된 값을 resolve하는 프로미스를 생성한다.  
(이미 존재하는 값을 프로미스로 래핑하기 위해 사용)

```javascript
// 배열을 resolve하는 Promise 객체를 생성
const resolvedPromise = Promise.resolve([1, 2, 3]);

resolvedPromise.then(console.log); // [1, 2, 3]

```

아래 코드는 위와 동일하다.

```javascript
const resolvedPromise = new Promise(resolve => resolve([1, 2, 3]));

resolvedPromise.then(console.log); // [1, 2, 3]

```



### Promise.reject()

`Promise.reject()` 메소드는 인자로 전달된 값을 reject하는 프로미스를 생성한다.  
(이미 존재하는 값을 프로미스로 래핑하기 위해 사용)

```javascript
// 에러 객체를 reject하는 Promise 객체를 생성
const rejectedPromise = Promise.reject(new Error('Error!'));

rejectedPromise.catch(console.log); // Error: Error!

```

아래 코드는 위와 동일하다.

```javascript
const rejectedPromise = new Promise((resolve, reject) => reject(new Error('Error!')));

rejectedPromise.catch(console.log); // Error: Error!

```



### Promise.all()

`Promise.all()` 메소드는 프로미스가 담겨 있는 배열 등의 이터러블(순환/반복 가능한)을 인자로 전달 받고 프로미스를 모두 연속적으로 처리하고 그 처리 결과를 resolve하는 새로운 프로미스를 반환한다.

```javascript
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log) // [ 1, 2, 3 ]
  .catch(console.error);

```

Promise.all은 배열 내 모든 프로미스의 resolve 또는 첫번째 reject를 기다리고, 모든 프로미스의 처리가 성공하면 각각의 프로미스가 resolve한 처리 결과를 배열에 담아 resolve하는 새로운 프로미스를 반환한다. 

#### 처리 순서 보장

첫번째 프로미스가 가장 나중에 처리되어도 Promise.all 메소드가 반환하는 프로미스는 첫번째 프로미스가 resolve한 처리 결과부터 차례대로 배열에 담아 그 배열을 resolve하는 새로운 프로미스를 반환한다.

#### 프로미스의 처리가 실패하는 경우

처리가 하나라도 실패하면 가장 먼저 실패한 프로미스가 reject한 에러를 reject하는 새로운 프로미스를 즉시 반환한다.

```javascript
// 세번째 프로미스가 가장 먼저 실패하므로 세번째 프로미스가 reject한 에러가 catch 메소드로 전달된다.
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 1!')), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 2!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 3!')), 1000))
]).then(console.log)
  .catch(console.log); // Error: Error 3!

```

#### 이터러블의 요소가 프로미스가 아닌 경우

전달 받은 이터러블의 요소가 프로미스가 아닌 경우, Promise.resolve 메소드를 통해 프로미스로 래핑된다.

```javascript
Promise.all([
  1, // => Promise.resolve(1)
  2, // => Promise.resolve(2)
  3  // => Promise.resolve(3)
]).then(console.log) // [1, 2, 3]
  .catch(console.log);

```



### Promise.race()

`Promise.race()` 메소드는 프로미스가 담겨 있는 배열 등의 이터러블을 인자로 전달 받고 가장 먼저 처리된 프로미스가 resolve한 처리 결과를 resolve하는 새로운 프로미스를 반환한다.

```javascript
Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log) // 3
  .catch(console.log);

```

#### 프로미스의 처리가 실패하는 경우

처리가 하나라도 실패하면 가장 먼저 실패한 프로미스가 reject한 에러를 reject하는 새로운 프로미스를 즉시 반환한다.  
(Promise.all 메소드와 동일하게 처리)

```javascript
// 세번째 프로미스가 가장 먼저 실패하므로 세번째 프로미스가 reject한 에러가 catch 메소드로 전달된다.
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 1!')), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 2!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 3!')), 1000))
]).then(console.log)
  .catch(console.log); // Error: Error 3!

```

> **Promise.all** ***vs*** **Promise.race**
>
> Promise.all 메소드처럼 모든 프로미스를 연속적으로 처리하는 것이 아니라 가장 먼저 처리된 프로미스가 resolve한 처리 결과를 resolve하는 새로운 프로미스를 반환한다.
>
> - `Promise.all()` : 모든 프로미스를 연속적으로 처리하고 순서대로 모두 반환
> - `Promise.race()` :  가장 먼저 처리된 프로미스만 반환



### Promise.allSettled()

`Promise.allSettled()` 는 프로미스가 담겨 있는 배열 등의 이터러블을 인자로 전달 받고 모든 프로미스를 모두 연속적으로 처리하고 상태와 관계없이 그 처리 결과를 배열로 반환한다.

```javascript
Promise.allSettled([
  new Promise(resolve => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error!')), 1000))
]).then(console.log);

```

#### 프로미스의 처리 상태와 상관없이 모두 반환

 fulfilled 또는 rejected 상관없이 인수로 전달받은 모든 프로미스들의 처리 결과를 나타내는 객체를 담은 배열을 반환한다. 

```javascript
// Promise.allSettled 메소드가 반환하는 배열
[
	// 프로미스가 fulfilled 상태인 경우, 프로미스의 처리 결과
  {status: "fulfilled", value: 1},
  // 프로미스가 rejected 상태인 경우, 프로미스의 처리 결과
  {status: "rejected", reason: Error: Error! at ...}
]
```

- fulfilled 상태인 경우: 처리 상태를 나타내는 status 프로퍼티, 처리 결과를 나타내는 value 프로퍼티
  - `{status: "fulfilled", value: /* 결과 값 */ }`
- rejected 상태인 경우: 처리 상태를 나타내는 status 프로퍼티, 에러를 나타내는 reason 프로퍼티
  - `{status: "rejected", reason: /* 에러 메시지 */ }`

> TC39 Stage 4 Draft  
> Expected Publication Year: 2020
>
> *[Promise.allSettled() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)* */* *[tc39/proposal-promise-allSettled](https://github.com/tc39/proposal-promise-allSettled)*





## Callback 패턴과 Promise

비동기 처리 순서를 보장하기 위해 사용하는 전통적인 콜백 패턴은 **가독성이 나쁘고** 비동기 처리 중 발생한 에러의 **예외 처리가 곤란** 하며 **여러 개의 비동기 처리를 한번에 처리하는 것에 한계가 있다.**



### Callback Hell

비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야 하는 경우, 함수의 호출이 중첩(nesting)이 되어 복잡도가 높아지는 현상이 발생하는데 이를 콜백 헬(Callback Hell)이라 한다. 

```javascript
step1(function(value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        step5(value4, function(value5) {
            // value5를 사용하는 처리
        });
      });
    });
  });
});

```

```javascript
get('/step1', a => {
  get(`/step2/${a}`, b => {
    get(`/step3/${b}`, c => {
      get(`/step4/${c}`, d => {
        console.log(d);
      });
    });
  });
});

```



### Callback 패턴과 Promise 비교

callback 패턴으로 구현한 코드

```javascript
// GET 요청을 위한 비동기 함수
const get = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버로부터의 응답을 콜백 함수에 전달하면서 호출하여 응답에 대한 후속 처리를 한다.
      callback(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

// id가 1인 post의 userId를 취득
get('https://jsonplaceholder.typicode.com/posts/1', ({ userId }) => {
  // 취득한 post의 userId로 user 정보를 취득
  get(`https://jsonplaceholder.typicode.com/users/${userId}`, userInfo => {
    console.log(userInfo);
  });
});

```

위의 예제를 promise로 구현한 코드

```javascript
// GET 요청을 위한 비동기 함수
const promiseGet = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
        resolve(JSON.parse(xhr.response));
      } else {
        // 에러 처리를 위해 reject 함수를 호출한다.
        reject(new Error(xhr.status));
      }
    };
  });
};

// id가 1인 post의 userId를 취득
promiseGet('https://jsonplaceholder.typicode.com/posts/1')
  // 취득한 post의 userId로 user 정보를 취득
  .then(({ userId }) => promiseGet(`https://jsonplaceholder.typicode.com/users/${userId}`))
  .then(userInfo => console.log(userInfo))
  .catch(err => console.error(err));

```





## fetch

`fetch()` 함수는 XMLHttpRequest 객체와 마찬가지로 HTTP 요청 전송 기능을 제공하는 Web API, HTTP 응답을 나타내는 Response 객체를 래핑한 프로미스를 반환하므로 후속 처리 메소드 then을 통해 프로미스가 resolve한 Response 객체를 전달받을 수 있다. 

`fetch()`에 HTTP 요청을 전송할 URL과 HTTP 요청 메소드, HTTP 요청 헤더, 페이로드 등을 설정한 객체를 전달한다.

```javascript
const promise = fetch(url [, options]);
```

> fetch 함수는 XMLHttpRequest 객체보다 사용법이 간단하고 프로미스를 지원하기 때문에 비동기 처리를 위한 콜백 패턴의 단점에서 자유롭다. 



### Response 객체

HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환하고 다양한 프로퍼티를 제공한다.

> **Response 객체가 가지는 기본적인 프로퍼티**
>
> - `Response.status` :  HTTP Status 코드, HTTP 상태/응답 코드 (기본값 200)
> - `Response.statusText` : HTTP Status 코드의 메서드와 일치하는 문자열 (기본값 "OK")
> - `Response.ok` : HTTP Status 코드가 200에서 299중 하나임을 체크하는 값 (Boolean 반환)

Response.prototype에는 Response 객체에 포함되어 있는 HTTP 응답 몸체(body)를 위한 다양한 메소드를 제공한다. 

> 예를 들어, fetch 함수가 반환한 프로미스가 래핑하고 있는 HTTP 응답 몸체를 취득하려면 `Response.prototype.json` 메소드를 사용한다.
>
> > **Response.prototype.json 메소드**
> >
> > Response 객체에서 HTTP 응답 몸체(response.body)를 취득하여 역직렬화 한다.



### Request Option 적용

fetch 함수에 요청 옵션을 설정해 다양한 요청을 전송할 수 있다.

- 첫 번째 인수: HTTP 요청을 전송할 URL
- 두 번째 인수: HTTP 요청 메소드, HTTP 요청 헤더, 페이로드 등을 설정한 객체

```javascript
const request = fetch(
  'https:// ...', // HTTP 요청을 전송할 URL
  {
    method: 'POST', // HTTP 요청 메소드
    headers: { 'content-Type': 'application/json' }, // HTTP 요청 헤더
    body: JSON.stringify(payload) // 페이로드
  });

```

```javascript
// 요청 설정 객체, *표시는 기본 옵션 
{
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // no-referrer, *client
  body: JSON.stringify(data), // body data type must match "Content-Type" header
}
```



### fetch 사용 예제

```javascript
const request = {
  get(url) {
    return fetch(url);
  },
  post(url, payload) {
    return fetch(url, {
      method: 'POST', 
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },
  patch(url, payload) {
    return fetch(url, {
      method: 'PATCH',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },
  delete(url) {
    return fetch(url, { method: 'DELETE' });
  }
};

request.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(todos => console.log(todos))
  .catch(err => console.error(err));
// {userId: 1, id: 1, title: "delectus aut autem", completed: false}

request.post('https://jsonplaceholder.typicode.com/todos', {
  userId: 1,
  title: 'JavaScript',
  completed: false
})
  .then(response => response.json())
  .then(todos => console.log(todos))
  .catch(err => console.error(err));
// {userId: 1, title: "JavaScript", completed: false, id: 201}

request.patch('https://jsonplaceholder.typicode.com/todos/1', {
  completed: true
})
  .then(response => response.json())
  .then(todos => console.log(todos))
  .catch(err => console.error(err));
// {userId: 1, id: 1, title: "delectus aut autem", completed: true}

request.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(todos => console.log(todos))
  .catch(err => console.error(err));
// {}
```

> fetch 함수는 비교적 최근에 추가된 Web API로서 인터넷 익스플로어를 제외한 대부분의 브라우저에서 제공하고 있다.





## reference

[Promise - JavaScript | MDN][Promise - JavaScript | MDN]

[Promise | PoiemaWeb][Promise | PoiemaWeb]

[자바스크립트 Promise 쉽게 이해하기 • Captain Pangyo][자바스크립트 Promise 쉽게 이해하기 • Captain Pangyo]

[프라미스 | JavaScript info][프라미스 | JavaScript info]

[⭐️🎀  JavaScript Visualized: Promises & Async/Await][ JavaScript Visualized: Promises & Async/Await]

[Promise - JavaScript | MDN]: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
[Promise | PoiemaWeb]: https://poiemaweb.com/es6-promise
[자바스크립트 Promise 쉽게 이해하기 • Captain Pangyo]: https://joshua1988.github.io/web-development/javascript/promise-for-beginners/
[프라미스 | JavaScript info]: https://ko.javascript.info/promise-basics#ref-592
[ JavaScript Visualized: Promises & Async/Await]: https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke

