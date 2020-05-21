## 자바스크립트는 Single-Thread 기반

자바스크립트 엔진이 동작하는 브라우저 환경이나 Node.js 환경은 한번에 하나의 태스크(task)만을 실행할 수 있는 *싱글 스레드(single thread)* 이다.



### 한번에 하나의 태스크만 처리

자바스크립트는 함수의 실행 순서를 실행 컨텍스트 스택으로 관리하고 **자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택**을 갖는다. 때문에 한번에 하나의 태스크만을 처리할 수 있고, 이것을 *콜 스택* 이라 부른다.

> one thread == one call stack == one thing at a time

하나의 태스크만을 실행할 수 있기 때문에 시간이 오래 걸리는 태스크를 실행하면 블로킹이 발생한다.   
블로킹이 발생하면 브라우저 화면이 멈추거나 느려지는걸 볼 수 있다. 이는 태스크를 실행하는 동안 랜더링이 불가능 하기 때문이다.

> **콜 스택(Call stack, 실행 컨텍스트 스택)**  
> 소스 코드(전역 코드나 함수 코드 등) 평가에 의해 생성된 실행 컨텍스트가 추가(push)되고 제거(pop)되는 스택 자료 구조

> **블로킹(Blocking, 작업 중단)**  
> 코드 실행을 느리거나 멈추게 만드는 것.



## 자바스크립트는 동시성을 지원한다.

자바스크립트는 싱글 스레드로 동작하여 한번에 하나의 태스크만 처리할 수 있는 *동기식 처리 모델* 이지만 *이벤트 루프(Event Loop)* 와 *태스크 큐(Task Queues)* 를 이용해 *동시성(Concurrency)*을 지원하여 싱글 스레드의 단점을 보완해 준다.

> **동기식 처리 모델(Synchronous processing model)**  
> 실행중인 태스크가 종료될 때가지 다음 실행될 태스크가 대기하는 방식

> **비동기식 처리 모델(Asynchronous processing model)**  
> 현재 실행중인 태스크가 종료되지 않은 상태라 하더라도 다음 태스크를 곧바로 실행하는 방식



## 비동기 프로그래밍

자바스크립트는 싱글 스레드의 단점을 극복하기 위해 비동기 프로그래밍을 사용하고 **비동기 요청 처리는 자바스크립트 엔진을 구동하는 환경이 담당**한다.

실제 자바스크립트가 구동되는 환경(브라우저, Node.js등)에서는 주로 여러 개의 스레드가 사용되며, 이러한 **구동 환경이 단일 호출 스택을 사용하는 자바스크립트 엔진과 상호 연동하기 위해 사용하는 장치가 바로 '이벤트 루프'** 인 것이다.

시간이 오래 걸리는 태스크는 다른 스레드(WebAPI, Node API)에 위임하고 **논 블로킹으로 태스크를 처리**한다. **위임 받은 스레드에서 태스크가 완료되면 콜백 함수를 Task Queue에 추가**한다.

> **논 블로킹(Non-Blocking)**  
> 다른 스레드에 위임한 태스크를 기다리지 않고 바로 다음 태스크를 처리하는 것.



### Event Loop

콜 스택에 현재 실행중인 실행 컨텍스트가 있는지 그리고 태스크 큐에 대기 중인 함수(콜백 함수, 이벤트 핸들러 등)가 있는지 반복하여 확인한다.

**콜 스택이 비어있다면 태스크 큐에서 대기 중인 함수를 순차적(FIFO)으로 콜 스택으로 이동시킨다.**

*(이때 태스크 큐에 있는 함수들이 콜 스택에 들어갈 틈을 잘 만들어 주는 것이 자바스크립트 비동기 프로그래밍에서 중요한 점인 것 같다)*



### Task Queue(Event queue/Callback queue)

태스크 큐는 비동기 처리 함수의 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역이다.  
이곳에 임시 보관된 함수들은 비동기 처리 모델로 동작한다.

**대기 중인 함수는 콜 스택이 비어졌을 때 Event loop에 의해 FIFO로 콜 스택으로 이동되어 실행된다.**



## 예제

브라우저에서 이벤트 루프가 어떻게 동작하는지 그림으로 잘 보여주는 예제

```javascript
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();

```

![Visualized Event Loop](./img/eventLoop.gif)

*출처:*  *[✨♻️ JavaScript Visualized: Event Loop][JavaScript Visualized: Event Loop]*

위 와는 다르지만 <http://latentflip.com/loupe>에 들어가 코드를 작성하면 event loop가 동작하는 모습을 시각화 해준다. 



## 요약

- 자바스크립트는 싱글 스레드이다.
- 자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 갖는다.

자바스크립트는 싱글 스레드이고 하나의 실행 컨텍스트 환경을 갖고 있으며, 실행중인 태스크가 종료될 때가지 다음 실행될 태스크가 대기하는 동기식 처리 모델이다.

- 비동기 요청 처리는 자바스크립트 엔진을 구동하는 환경인 브라우저나 Node.js가 담당한다.
- 이벤트 루프와 태스크 큐를 이용해 동시성을 지원한다.

비동기 요청 처리는 자바스크립트 엔진을 구동하는 환경이 담당하며, 이벤트 루프를 이용해 단일 콜 스택과 상호 연동된다.

- 모든 비동기 API들은 작업이 완료되면 콜백 함수를 태스크 큐에 추가한다.
- 이벤트 루프는 '현재 실행중인 태스크가 없을 때'(주로 콜 스택이 비워졌을 때) 태스크 큐의 첫 번째 태스크를 꺼내와 실행한다.

비동기 작업이 완료되면 콜백 함수를 태스크 큐에 추가하고 이벤트 루프는 콜 스택이 비워져 있을 때 태스크 큐에서 첫 번째 태스크를 콜 스택으로 이동시키고 콜 스택은 이것을 실행한다.



### 한 줄 요약

'싱글 스레드 기반 이지만 비동기 처리가 가능하다'



## reference

[What the heck is the event loop anyway?][What the heck is the event loop anyway?] (이 영상부터 보면 이해하기가 더 쉽다)

[Event | PoiemaWeb][Event | PoiemaWeb]

[자바스크립트와 이벤트 루프][자바스크립트와 이벤트 루프]

[✨♻️ JavaScript Visualized: Event Loop][JavaScript Visualized: Event Loop]

[JS 비동기는 어떻게 구현되어있는가??][JS 비동기는 어떻게 구현되어있는가??]

[What the heck is the event loop anyway?]: https://youtu.be/8aGhZQkoFbQ
[Event | PoiemaWeb]: https://poiemaweb.com/js-event
[자바스크립트와 이벤트 루프]: https://meetup.toast.com/posts/89
[JavaScript Visualized: Event Loop]: https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif
[JS 비동기는 어떻게 구현되어있는가??]: https://velog.io/@thsoon/JS-비동기는-어떻게-구현되어있는가

