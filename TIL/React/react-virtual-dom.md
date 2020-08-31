# Virtual DOM

- 버추얼 돔은 HTML DOM의 추상화 개념이고 브라우저 스펙의 구현체와는 분리되어있다.

  (사실, 돔은 이미 추상화 개념이기 때문에 버추얼 돔은 추상화를 또 추상화한 개념이다)

- 버추얼 돔을 사용하여 실제 DOM에 접근해 조작하지 않고 추상화한 자바스크립트 객체를 구성해 사용한다.

  (실제 HTML DOM의 간소화된 복사본이라고 생각하면 된다)

- 리액트와 Virtual DOM은 UI를 업데이트하는 과정에서 생기는 복잡함을 해소하고, 쉽게 업데이트에 접근할 수 있게 해준다.

  (컴포넌트를 정의 해주면, HTML DOM API를 호출하는 등 단순한 작업은 리액트가 대신 처리한다)





## Regular DOM

### 기존의 DOM은 정적이다.

HTML DOM은 정적이기 때문에 동적 UI에 최적화가 되어있지 않다. DOM을 최소한으로 조작하여 작업을 처리하는 방식으로 개선 가능하게 도와주는 것이 버추얼 돔이다.



### 리페인트 과정이 느리게 만든다.

repaint와 reflow 연산작업의 빈번한 발생이 UI/UX렌더링에 많은 리소스를 소비한다.

DOM에 변화가 일어나면 웹 브라우저가 CSS를 다시 연산하고, 레이아웃을 구성하고 페이지를 리페인트하는 과정에서 시간이 허비 된다. 

> ⚠️ **주의** 
>
> 사실 무조건 repaint와 reflow가 발생하는것은 아니다. style에 대한 작업이 더 없고 다른 연산으로 들어갈 때 `Batched DOM Update`가 발생하여 style변경에 대한 작업을 일괄적으로 처리하게 된다. 즉, 매 한 줄 마다 reapint, reflow연산을 하지 않는다는 것이다. 하지만 한줄 한줄 강제로 reflow연산을 발생시키는 동작들이 있고 `Forced Reflow`라고 부른다.
>
> `Forced Reflow` 참고: [What forces layout/reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)





## 리액트의 Virtual DOM

*Virtual DOM은 리액트에만 있는 개념은 아니다.*

리액트는 Virtual DOM 방식을 사용하여 **DOM 업데이트를 추상화함으로써 DOM 처리 횟수를 최소화하고 효율적으로 진행한다.**

> **리액트가 웹 브라우저에 실제 DOM을 업데이트하는 과정**
>
> 1. 데이터를 업데이트하면 전체 UI를 Virtual DOM에 리렌더링
> 2. 이전 Virtual DOM에 있던 내용과 현재 내용을 비교
> 3. 바뀐 부분만 실제 DOM에 적용

Virtaul DOM Tree와 regular DOM Tree가 맵핑되어 어떤 DOM Node가 다른지 찾는다.



### 재조정 (Reconciliation)

리액트에서 뷰를 업데이트할 때는 "업데이트 과정" 보다는 "재조정(Reconciliation) 과정"이라고 한다.

컴포넌트에서 데이터에 변화가 있을 때 우리가 보기에는 변화에 따라 뷰가 변형되는 것처럼 보이지만, 사실은 새로운 요소로 갈아 끼우기 때문이다.



### 비교 알고리즘 (Diffing Algorithm)

렌더링되어 사용되고 있는 실제 regular DOM Tree와 React에서 쓰는 in-momery 안에있는 Virtual DOM Tree를 비교하는 알고리즘이다. 최소한의 연산으로 수정작업이 요구되는 실제 돔 객체를 찾아서 수정 및 변경작업을 한다.

두 개의 트리를 비교할 때, React는 두 엘리먼트의 루트(root) 엘리먼트부터 비교하고 이후의 동작은 루트 엘리먼트의 타입에 따라 달라진다.

이 알고리즘은 이전과 새로 그려질 태그들의 내용을 비교하여 변경된 부분만 새로 그려 repaint와 reflow연산을 줄여준다.





## Virtual DOM을 사용하는 이유

Virtual DOM은 빈번한 repaint와 reflow문제를 보안하고 Dynamic UI를 만들기 위해 적합한 기능들을 제공한다. 

> **렌더링 횟수를 줄이는건 Virtual DOM 없이도 가능하다.**
>
> 최종적인 변화를 하나로 묶어 DOM fragment에 적용한 다음 기존 DOM에 반영하면 Virtual DOM 없이도 렌더링 획수를 줄이는게 가능하다.
>
> DOM fragment를 관리하는 과정 중 수정 할 필요가 없는 DOM 트리도 업데이트를 방지하기 위해 (기존 값 중 어떤게 바뀌었고 어떤게 바뀌지 않았는지) 상태를 계속 파악하고 있어야 한다. 
>
> 이 과정은 매우 복잡하고 시간이 오래걸려 생상선을 떨어 뜨린다.
>
> Virtual DOM은 DOM fragment를 관리하는 과정을 수동으로 하나하나 작업 할 필요 없이 자동화하고 추상화한다.



### 렌더링 연산 횟수를 줄여준다.

> Virtual DOM은 변화의 모든 과정을 렌더링 하지 않기 때문에 연산 비용이 적다.

연산이 끝나면 모든 최종적인 변화를 하나로 묶어서 실제 DOM에 적용한다. 이렇게 하면 레이아웃 계산과 리렌더링의 규모는 커지지만, 연산 횟수는 줄어든다.



### 자동으로 상태를 파악 해준다.

> 각 변화들의 동기화 작업을 거치지 않고도 모든 작업을 하나로 묶을 수 있다.

Virtual DOM은 자동으로 상태를 파악 해주기 때문에 특정 DOM의 상태변화 정보를 공유 할 필요가 없고, 컴포넌트가 DOM 조작 요청을 할 때 다른 컴포넌트들과 상호작용 하지 않아도 된다.





## DOM과 Virtual DOM에 대한 오해

> **Regular DOM과 Virtual DOM 비교**
>
> |     구분     | regular DOM |         Virtual DOM         |
> | :----------: | :---------: | :-------------------------: |
> |     성격     |    정적     |            동적             |
> |   생명주기   |    부재     |            존재             |
> | 성능:동적 웹 |   Defeat    |             Win             |
> | 성능:정적 웹 |     Win     |           Defeat            |
> | EventElement |      -      |    regular DOM하고 다름     |
> |    추상화    |      -      | regular DOM에서 추상화 해옴 |



### DOM은 느리지 않다.

DOM 자체를 읽고 쓸 때의 성능은 자바스크립트 객체를 처리할 때의 성능과 비교하여 큰 차이없이 빠르다. 최적화 작업을 직접 제대로 한다면 리액트를 사용 했을때 보다 더 빠르다.



### Virtual DOM이 무조건 빠른 것은 아니다.

Virtual DOM을 사용한다고 해서 무조건 빠른 것은 아니다. 리액트를 사용하지 않아도 코드 최적화 작업을 하면 DOM 작업이 느려지는 것을 개선 가능하다.

대부분의 경우 충분히 빠르지만, 단순 라우팅 정도만하는 정적인 페이지 같이 작업이 매우 간단하면 오히려 리액트를 사용하지 않는 편이 더 나은 성능을 보이기도 한다.





## 요약

- 렌더링 연산 횟수를 줄여준다.

모든 DOM을 렌더링 하지 않고 최종적인 변화를 하나로 묶어서 실제 DOM에 적용한다. 이렇게 하면 레이아웃 계산과 리렌더링의 규모는 커지지만, 연산 횟수는 줄어든다.

- Virtual DOM 없이 렌더링 횟수를 줄이는 것은 가능하지만 관리하기 힘들다
- 자동으로 상태를 파악 해준다.

DOM의 상태를 하나하나 파악하여 관리해야 하는 과정을 Diffing Algorithm을 기반으로 자동화하고 추상화해 파악 해주기 때문에 UI를 업데이트하는 과정에서 생기는 복잡함을 해소하고, 쉽게 업데이트에 접근할 수 있게 해준다.



### 한 줄 요약

Virtual DOM은 변화의 연산이 끝나고 모든 최종적인 변화를 하나로 묶어서 실제 DOM에 적용하는 것을 쉽게 핸들링하면서 렌더링 횟수를 줄일 수 있도록 도와준다.



### P.S

한 마디로 Virtual DOM을 사용하면 **DOM의 변화를 쉽게 핸들링 가능하다!**

정리하면서 공부하고 보니 버추얼 돔은 리액트를 사용하는 근본적인 이유이자 개념 중 하나인것 같다.





## reference

리액트를 다루는 기술(개정판)

[가상 돔과 돔의 차이점 · FEDevelopers/tech.description Wiki](https://github.com/FEDevelopers/tech.description/wiki/가상-돔과-돔의-차이점)

[[React] Virtual DOM(가상 돔)](https://pgg-dev.tistory.com/14)

[ReactJS의 Virtual DOM과 Repaint, Reflow | DrakeJin](http://blog.drakejin.me/React-VirtualDOM-And-Repaint-Reflow/)

[[번역] 리액트에 대해서 그 누구도 제대로 설명하기 어려운 것 – 왜 Virtual DOM 인가? | VELOPERT.LOG](https://velopert.com/3236)

[재조정 (Reconciliation) – React](https://ko.reactjs.org/docs/reconciliation.html)

[Reconciliation: React의 렌더링 알고리즘 | Huskyhoochu 기술 블로그](https://www.huskyhoochu.com/virtual-dom/)

