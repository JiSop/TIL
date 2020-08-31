---
title: 제로초 노드 교과서 정리
emoji: ✨
tags:
  - Node
  - JavaScript
---

## 노드의 정의

Node.js는 V8 엔진으로 빌드된 자바스크립트의 런타임이다. 실행하는 환경이라고 볼 수 있다.

자바스크립트가 브라우저 없이 독립적인 환경에서 동작할 수 있게 해준다.

서버의 역할도 수행할 수 있고, 서버 실행을 위한 http/https/http2 모듈을 제공한다.

> **런타임**
>
> 특정 언어로 만든 프로그램들을 실행할 수 있게 해주는 가상 머신의 상태

libuv: 노드의 특성인 이벤트 기반, 논블로킹 I/O 모델을 구현한 라이브러리



### 이벤트 기반

이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식



### 논 블로킹 I/O

오래 걸리는 함수를 백드라운드로 보내서 다음 코드가 먼저 실행되게 하고, 나중에 오래 걸리는 함수를 실행

논 블로킹 방식 하에서 일부 코드는 백그라운드에서 병렬로 실행됨



블로킹이면서 동기

비동기면서 논블로킹



I/O 작업이 많을 때 노드 활용성이 극대화 된다.



### 프로세스 vs 스레드

프로세스: 운영체제에서 할당하는 작업의 단위, 프로세스 간 자원 공유 X

스레드: 프로세스 내에서 실행되는 작업의 단위, 부모 프로세스 자원 공유



**노드 프로세스는 멀티 스레드이지만 직접 다룰 수 있는 스레드는 하나** 이기 때문에 싱글 스레드라고 표현

노드는 주로 멀티 스레드 대신 멀티 프로세스 활용

노드는 14버전 부터 멀티 스레드 사용이 가능하다



### 싱글 스레드

싱글 스레드는 주어진 일을 하나밖에 처리하지 못한다

> 블로킹이 발생하면 나머니 작업은 모두 대기해야하기 때문에 비효율적이다.



대신 논 블로킹 모델을 채택하여 일부 코드(I/O)를 백그라운드(다른 프로세스)에서 실행 가능하다.

> 요청을 먼저 받고, 완료될 때 응답한다.
>
> I/O 관련 코드가 아닌 경우 싱글 스레드, 블로킹 모델과 같아진다.



### 멀티 스레드 모델과 비교

싱글 스레드 모델은 에러 처리를 못하는 경우 멈춘다. 

하지만 프로그래밍 난이도가 쉽고, CPU, 메모리를 적게 사용한다. (코스트가 적게든다)



멀티 스레드 모델은 에러 발생 시 새로운 스레드를 생성하여 극복한다.

> 단, 새로운 스레드 생성이나 놀고 있는 스레드 처리에 비용 발생
>
> 프로그래밍 난이도가 높다
>
> 스레드 수만큼 자원을 많이 사용한다



## 서버로서의 노드

노드 서버의 장단점

- 장점
  - 멀티 스레드 방식에 비해 자원을 적게 사용
  - I/O 작업이 많은 서버로 적합
  - 멀티 스레드 방식보다 쉬움
  - 웹 서버가 내장되어 있음
  - 자바스크립트 기반
  - JSON 형식과 호환성이 좋다
- 단점
  - 싱글 스레드이기 때문에 CPU 코어를 하나만 사용한다
  - CPU 작업이 많은 서버로는 부적합
  - 하나뿐인 스레드가 멈추지 않도록 관리해야 함
  - 서버 규모가 커졌을 때 서버 관리가 어렵다
  - 어중간한 성능

CPU 작업을 위해 AWS lambda나 GCF 같은 별도 서비스를 사용한다

> 페이팔, 넷플릭스, 나사, 월마트, 링크드인, 우버 등에서 메인 또는 서브 서버로 사용



다시는 PHP를 무시하지 말아라



> 이벤트 기반
>
> 논블로킹
>
> 프로토타입
>
> 실행컨텍스트
>
> ​	this
>
> ​	스코트

> 실행컨텍스트
>
> 이벤트루프
>
> 프로토타입



## 호출 스택
