---
title: JavaScript Memory management
emoji: ✨
tags:
  - JavaScript
---

## 자바스크립트 메모리 관리

### 메모리 누수

메모리 누수는 프로그램에서 버려진 메모리를 해제하지 못한 경우를 말한다. 메모리 누수는 자바스크립트 엔진의 가비지 컬렉터가 메모리를 올바른 방식으로 해제하지 않은 경우 발생할 수 있다.

**객체에 대한 참조**

객체에 대한 참조가 있다면 해당 참조는 메모리에 있는 것이다. 사용하는 참조에 접근하기 위해서 객체 전체를 범위 내에서 로딩해야 하기 때문에 사용하지 않는 참조가 같은 객체 내에 많이 있다면 메모리 낭비가 발생할 수 있다.

**DOM 메모리 누수**

DOM 항목을 가르키는 변수가 이벤트 콜백 외부에 선언된 경우 해당 DOM 항목을 제거하더라도 해당 항목은 여전히 메모리에 남게 된다. (=해당 DOM이 HTML에서 사라지더라도 해당 DOM이 이벤트 콜백에서 사용됐다면 참조는 남는다.) 
HTML DOM 객체들은 삭제된 이후에는 참조돼서는 안 된다.

- 이벤트 콜백 내부에서 참조를 선언하거나 클릭 핸들러를 사용한 뒤 등록 해지는 방법으로 메모리 누수를 피할 수 있다.

**window 전역 객체**

객체가 window 전역 객체에 포함되는 경우 해당 객체는 메모리에 존재한다.
window는 브라우저에서 전역 객체이기 때문에 window의 속성으로 선언된 추가적인 객체는 모두 제거할 수 없다.(window는 브라우저가 실행하는 데 필요한 객체이기 때문이다.)

- 전역변수를 사용하지 않는 것으로 메모리 낭비, 누수를 피할 수 있다.

**객체 참조 제한하기**

객체에 대한 모든 참조가 제거되면 해당 객체는 (가비지 컬럭터에 의해) 제거된다. 객체의 단 하나의 속성만 필요한 경우 전체 객체를 매개변수로 전달해서는 안 된다.

- 전체 객체가 아닌 필요한 속성만 전달하도록 해야 한다.

**delete 연산자**

원치 않는 객체 속성을 제거하기 위해 delete 연자사를 사용할 수 있다.(객체 외의 것들에 관해서는 동작하지 않는다) <- 추천하는 방법은 아니라고 들었음