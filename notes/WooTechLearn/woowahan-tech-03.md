---
title: 우아한테크러닝 React&TypeScript 03
emoji: 👨‍💻
tags:
  - 우아한테크러닝
  - React
  - TypeScript
---



## 간단한 리액트 구현



### 버추얼 돔 구조

```js
const vdom = {
  type: `ul`,
  props: {},
  children: [
    { type: `li`, props: { className: "item" }, children: "React" },
    { type: `li`, props: { className: "item" }, children: "Redux" },
    { type: `li`, props: { className: "item" }, children: "TypeScript" }
  ]
};
```



### createElements

버추얼 돔을 만드는 친구

DOM으로 컨버팅한다.

```js
function createElements(type, props = {}, ...children) {
  return { type, props, children };
}
```

바벨 옵션 주석

```js
/* @jsx createElement */
```

> 리액트 컴포넌트는 왜 대문자로 시작해야하는가
>
> > 바벨이 해석하는 방식 때문에 컴포넌트는 대문자로 시작해야한다.
> >
> > 대문자로 시작하면 함수

```js
function createElement(type, props = {}, ...children) {
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children };
}
```



### render

버추얼 돔을 돔으로 컨버팅

```js
function render(vdom, container) {
  container.appendChild(renderElement(vdom));
}
```



### renderElement

재귀 함수이다

모든 요소를 파악해야 함으로 

```js
function renderElement(node) {
  // 방어 코드
  // 가장 하위 요소는 문자열이 된다.
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.type);

  // 자식 요소 렌더링
  node.children.map(renderElement).forEach((element) => {
    el.appendChild(element);
  });

  return el;
}
```



### 전체 코드

```js
/* @jsx createElement */

function renderElement(node) {
  // 방어 코드
  // 가장 하위 요소는 문자열이 된다.
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.type);

  // 자식 요소 렌더링
  node.children.map(renderElement).forEach((element) => {
    el.appendChild(element);
  });

  return el;
}

function render(vdom, container) {
  // 여기에 기존 버추얼 돔과 비교하는 로직이 들어온다
  container.appendChild(renderElement(vdom));
}

// 바벨리 트렌스 파일링 할때 jsx 형태로 바뀜
// 컴파일 타임에 일어남
function createElement(type, props = {}, ...children) {
  if (typeof type === "function") {
    return type.apply(null, [props, ...children]);
  }
  return { type, props, children };
}

function Row(props) {
  return <li>{props.label}</li>;
}

function List(props) {
  return (
    <ul>
      <Row label="핫챠" />
      <li>React</li>
      <li>Redux</li>
      <li>TypeScript</li>
    </ul>
  );
}

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <List />
    </div>
  );
}

render(<App />, document.getElementById("root"));
console.log(<App />);

```



## 리액트 상태관리



### 클래스형 컴포넌트

- 라이프사이클 메소드 지원
- 클래스는 상태를 자연스럽게 가질 수 있다.
  - 생성자에서 초기화를 통해 상태 유지 가능
- setState 메소드를 통해 상태(값)를 변경하여 변화를 감지
  - setState 메소드를 사용하지 않으면 리액트는 변화를 감지하지 못한다. 





### 함수형 컴포넌트

- 함수는 호출될 때 마다 초기화가 일어나기 때문에 상태를 유지하는 것이 불가능하다.  
  마찬가지로 라이프사이클 또한 가질 수 없다.
- 하지만 hooks API를 추가하면서 상태 유지, 라이프사이클과 유사한 기능을 지원한다.

#### useState

기본적으로 배열을 리턴

```
[1, function bound dispatchAction()]
 0: 1
 1: function bound dispatchAction() {}
  <constructor>: "Function"
```

훅 전역 배열에 상태를 저장

두 번째 호출 이상 일때는 초기 값을 무시

컴포넌트를 키로해서 생성된 순서대로 인덱싱

> **훅이 최상위에서 호출되어야 하는 이유**
>
> > 인덱싱이 꼬리는 상황이 생길 가능성이 생기고
> >
> > 예상하지 못한 다른 데이터를 출력하게 된다

함수형 컴포넌트의 장점 : 간단하고 선언적이다



## note

> **어떤 방식이던지 일관성을 유지하는게 중요하다.**



> **상태관리, 지역과 전역 중 상태 관리를 어디서하는 것을 선호하나요?**
>
> > 왠만해서는 중앙에서, 스토어에서 상태관리 하는걸 선호한다.
> >
> > 규칙과 일관성을 유지하더라도 시간이 지나면서 희미해지는 경우가 많다
> >
> > 그렇게 되면 후에 코드를 수정하기가 어려워진다.
> >
> > (어떤 영향을 끼치게 될지 예측하기 힘듬)



> **성장 가능성은 어떻게 보나요? 구체적으로 어떤 면모를 보는지 궁금합니다.**
>
> > 면접관에 따라 다르다고 생각한다.
> >
> > 1. 기술 학습이 어느정도 되어 있는가
> >    - 어설프게 알고 있다면 fail
> > 2. 진지하게 학습하고 있는지 보여줘야 한다.
> >    - 밀도도 중요하다
> > 3. 개발을 좋아하는지, 열정이 있는지 등



- pub-sub 패턴
- observable 패턴



> **리액트 def 알고리즘**
>
> > 궁금하다면
> >
> > 버추얼 돔 구현체를 찾아보고 주석을 달면서 공부하는거 추천



> **백엔드와 의견 조율**
>
> > 객관적인 이유, 타당성
> >
> > '유명한 ~에서 사용하던데요' 이런 말투는 지양



> **까보는 요령 (소스 보는 요령)**
>
> > 초기 버전의 로직을 봐라
> >
> > 방어코드나 뎁스가 너무 깊으면 보기 힘듬



> **최적화 기준점**
>
> > hook은 클로저를 사용하고 있는게 아니라고 봄
> >
> > 적어도 메인 아키텍쳐로
> >
> > 판단하기 힘듬.
> >
> > 프로파일러 찍어보면서 확인 해보세요



### reference

https://jasonformat.com/wtf-is-jsx/