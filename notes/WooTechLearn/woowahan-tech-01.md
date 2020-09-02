---
title: 우아한테크러닝 React&TypeScript 01
emoji: 👨‍💻
tags:
  - 우아한테크러닝
  - React
  - TypeScript
---



## 소개

지금은 예전 처럼 바닥부터 하나하나 만드는 시대가 아니다.

라이브러리, 프레임워크 등 생산성을 높혀주는 많은 도구들이 있고 사실상 도구 사용법을 익히는 시대이다.

하지만 도구가 너무 많아 어떤 것을 사용할지, 어떻게 사용할지가 어렵다.

이런 고민들, 적정기술 선택을 어떻게 해야하나가 주요 강의 주제



### 키워드

```
(상태 State)
환경 (Env)
제품 Prod;
목표 (Mission))
코드 (Quality]
상대적 {E=mc2}
```

> - **상태**: 주로 다루고 강의 전반적으로 계속 얘기할 예정
> - **환경**: 여러 환경에 어떻게 대응 할 것인가 (개발 환경 등 포괄적)
> - **목표**: 목적, 목표에 맞는 적절한 도구를 선택하는 방법
> - **상대적**: 결국 모든게 상대적이다. 상대적인 것을 서로 이해할 수 있을까



### 강의에서 사용할 문서와 도구

- [TypeScript Playground](https://www.typescriptlang.org/play) : 타입스크립트 학습

- [CodeSanbox](https://codesandbox.io/) : 예제 배포

- [React](https://ko.reactjs.org/)
- [Redux](https://redux.js.org/)
- [MobX](https://mobx.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [Blueprint](https://blueprintjs.com/) : UI 프레임 워크
  - TS로 만들어져 있음
  - 잘 만들어진 Example
  - 논 해보기 좋은 프레임 워크
- [Testing Library](https://testing-library.com/) : 테스팅 도구





## TypeScript

### 타입 지정

```ts
let foo = 10;
foo = false; // Type 'boolean' is not assignable to type 'number'.
```

TS는 변수에 처음 할당된 값(초기화)의 타입과 다른 타입의 값으로 재할당 하면 오류가 발생한다.  



#### 암묵적 타입 지정

```ts
let foo = 10;
```

TS도 자바스크립트와 마찬가지로 타입추론을 하는데 이를 통해 값의 타입을 지정한다.

이렇게 타입추론을 통해 값이 지정되는 것을 '암묵적 타입 지정'이라 한다.

> 타입 지정을 하지 않았지만 오류가 발생하는 원인이다.



#### 명시적 타입 지정

```ts
let foo: number = 10;
```

위와 같은 방법으로 명시적 타입 지정을 할 수 있다.

실제로는 암묵적 타입 지정과 차이가 없지만 명시적으로 의도를 들어내는 것이 중요하다.

이렇게 하면 코드를 봤을때 바로 의도를 파악 할 수 있다.



> **명시적인 코드의 장점**
>
> 예전에는 복잡하고 가독성이 떨어져도 짧은 코드가 좋은 코드라고 생각하였다.
>
> 하지만 요즘은 조금 길더라도 명시적인 코드가 좋은 코드라고 생각하는 경향이 있고
>
> 암묵적이면 코드를 파악하기 힘든 경우가 있다.
>
> 이때 명시적으로 작성하면 코드를 파악하기 쉽다.
>
> ```js
> // 에디터에서 코드가 접혀있는 함수 bar가 있다고 생각해보자
> 
> function bar () {
> 	/* ... */
> }
> 
> bar(10,20); // 함수 bar는 매개변수가 없는데 왜 인자를 주는거지?
> 
> ```
>
> 함수 bar의 내부 코드를 확인해야 가변인자를 받아서 처리한다는 것을 파악 할 수 있다.
>
> ```js
> function bar (...args){
>   /* ... */
> }
> 
> bar(10,20); // 함수 bar는 가변인자를 받아서 처리하는구나
> 
> ```
>
> 이렇게 rest parameter로 명시적으로 표현하면 코드를 파악하기 훨씬 편하다.



### 타입 알리아스

`type` 키워드를 사용하면 타입에 더 의미를 부여하고 명시적으로 만들 수 있다.

```ts
type Age = number; // 이제 Age라고 부를꺼야 (실제로는 넘버 타입의 다른 이름)
let age: Age = 10; // 아 얘는 나이라는 타입을 가지고 있구나 (명시적)
```

말그대로 타입에 별칭을 붙여주는 것으로 타입만 일치한다면 오류를 발생시키지 않는다.



### 객체 타입 알리아스, 타입 정의

```ts
type Age = number;
type Foo = {
    age: Age;
    name: string;
};

const foo: Foo = {
    age: 10,
    name: 'J',
};
```

객체가 가진 프로퍼티의 타입을 함께 지정해주어야 한다.

```ts
/* ... */

const foo: Foo = {
    age: '10', // Type 'string' is not assignable to type 'number'.
    name: 'J',
};
```

프로퍼티의 타입이 일치하지 않으면 오류가 발생한다.

#### 인터페이스로 객체 타입 정의

```ts
interface Bar {
    age: number,
    name: string
}

const bar: Bar = {
    age: 10,
    name: 'J',
};
```

`interface` 키워드를 사용해서 타입을 정의하는 것도 가능하다.

> **인터페이스와 타입 중 어떤 것을 사용해야 할까?**
>
> 타입 알리아스와 인터페이스는 비슷하지만 선언적으로 차이가 존재한다.
>
> 강의를 진행하면서 React와 함께 더 알아볼 예정.
>
> [TypeScript: Handbook - interfaces-vs-type-aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#interfaces-vs-type-aliases)





## React

### CRA

리액트 프로젝트를 간편하게 프로젝트를 간편하게 생성할 수 있다.

> **리액트 환경 세팅은 고통스러워**
>
> 예전에는 hello word 찍으려고 세팅하는데 하루 걸린다고 조롱 받기도 함
>
> 짜잔 그래서 만들었습니다! `create-react-app`

#### CRA 단점

- 세세한 설정 어려움
  - 프로젝트 막바지에 문제가 생기기 쉽다

- 다양한 환경에 대응하기 어려움
  - 여러가지 환경으로 App이 빌드되야 하는데 지원하지 않음
  - 개발, 빌드 두 개만 지원

프로덕션 용으로는 비추천한다. 연습용, 토이 프로젝트에만 사용하자



### React + TypeScript 프로젝트 생성

```bash
$ yarn create react-app <name> --template typescript
```

```bash
$ npx create-react-app <name> --template typescript
```

CRA에서 `--template typescript` 커멘드를 사용하면 TypeScript를 적용한 프로젝트를 간편하게 생성할 수 있다.

> 일반적으로 yarn을 많이 사용하지만 npx를 사용해도 된다.
>
> npx를 사용하면 create-react-app을 임시로 인스톨하고 CRA를 사용해서 프로젝트를 생성한 뒤
>
> create-react-app를 다시 삭제한다.
>
> 이렇게 하면 CRA를 항상 최신 버전으로 사용할 수 있고 용량도 절약할 수 있다.



### 가장 기본적인 형태의 리액트 앱

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
  title: string;
  color: string;
}

/* props는 객체로 트렌트 파일링 되기 때문에 객체이다 */
function App(props: AppProps) {
  return(
    <h1>{ props.title }</h1>
  )
}

/*
  ReactDOM.render는 최상위에 하나만 존재
  DOM 처럼 단일트리 구조
*/
ReactDOM.render(
  <React.StrictMode>
    <App title="Tech Hello" color="red" />
  </React.StrictMode>,
  document.getElementById('root') 
); // 트렌스 파일링 됨, 컴포넌트를 DOM으로 만들어서 root에 붙일꺼야

```

JSX 문법은 createElement를 편하게 사용하기 위해서 존재한다.



### 리액트 트렌스 파일링

리액트가 트렌스 파일링 되는 형태를 보면 학습에 큰 도움이 된다.

```jsx
import React from 'react';

function App() {
  return (
  	<h1 id="header">Hello Tech</h1> 
  )
}
```

바벨로 트렌스 파일링 된 형태

```js
"use strict";

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  return /*#__PURE__*/_react.default.createElement("h1", {
    id: "header"
  }, // 컴포넌트의 props가 객체의 형태를 가지는 이유
	"Hello Tech");
}
```

[Babel - Try it out](https://babeljs.io/repl)



### 상태관리

제일 먼저나온 어프로치는 flux 아키텍처

리액트 자체가 이뮤터블을 지향함

> 리액트와 전역 상태관리 도구는 하나의 단짝

redux는 지금도 유용함

#### Redux

리덕스는 너무 간단한데 너무 간단해서 어려워함

> 개인적으로는 redux를 오래 사용해서 선호함

리덕스가 제공하는 기능은 정말 단순 하지만 복잡한 것을 하려다 보면 어렵고 난해해짐

#### MobX

redux를 대체 하기 보다는 상태를 바라보는 개념, 관점이 다름

기능이 많으면 다른 방식으로 사용하는 사람이 많음

저작자의 의도와 다르게 사용되는 경우가 많고 혼란을 일으키기 쉽다

> 개발자의 실수를 방지
>
> 유연하고 많은 기능은 실수를 일으키기 쉽게 만든다.
>
> TS는 개발자의 실수를 방지해준다.
>
> 만의하나 런타임 단계에 발생할 수 있는 실수를 컴파일 단계에서 잡아준다.



## note

> 제대로 고민하는 방법을 익히고 생각을 나누는 강의
>
> 생각을 나누고 토론하는 것을 중요하게 생각하시는 것 같다.

