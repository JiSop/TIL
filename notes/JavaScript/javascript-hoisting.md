---
title: JS Hoisting
emoji: 📙
tags:
  - JavaScript
---

# 자바스크립트의 호이스팅(Hoisting)

호이스팅(hoisting)이란 선언문을 **스코프(scope)의 선두로 옮긴 것처럼 동작하는 특성** 으로 스코프 단위로 일어난다.

모든 선언문(var, let, const, function, function*, class)은 런타임 이전 단계에서 먼저 실행되기 때문에 선언되기 이전에 참조 가능하다.

하지만 let, const, class는 호이스팅이 발생하지 않는 것처럼 동작하고 선언되기 이전에 참조하려 하면 ReferenceError가 발생한다.





## 호이스팅이 발생하는 이유

모든 선언문은 런타임 이전에 코드 평가 과정에서 실행되기 때문이다.

코드 실행을 위한 준비 단계인 코드의 평가 과정에서 자바스크립트 엔진은 모든 선언문을 코드에서 찾아내어 먼저 실행하고, 코드의 평가 과정이 끝나면 모든 선언문을 제외하고 코드를 한 줄씩 순차적으로 실행한다.

자바스크립트 엔진은 선언문이 코드 어디에 있든 상관 없이 다른 코드보다 먼저 실행하기 때문에 선언문이 어디에 위치하는지와 상관없이 참조할 수 있다.





## 변수 호이스팅(Variable hoisting)

변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 것을 변수 호이스팅이라 한다.

> **변수가 생성되는 3단계**
>
> 1. **선언 단계(Declaration phase)**
>
>    변수를 실행 컨텍스트의 변수 객체(Variable object)에 등록한다. 이 변수 객체는 scope가 참조하는 대상이 된다.
>
> 2. **초기화 단계(Initialization phase)** 
>
>    변수 객체(Variable object)에 등록된 변수를 위한 공간을 메모리에 확보한다. 이 단계에서 변수는 undefined로 초기화된다.
>
> 3. **할당 단계(Assignmnet phase)**
>
>    undifined로 초기화된 변수에 실제 값을 할당한다.

### var 키워드로 선언된 변수

`var` 키워드로 선언된 변수는 변수 선언문 이전에 변수에 참조하여도 변수 객체(variable object)에 변수가 존재하기 때문에 ReferenceError가 발생하지 않고 `undefined`를 반환한다. 

### let, const 키워드로 선언된 변수

let, const 키워드로 선언된 변수는 '선언 단계'와 '초기화 단계'가 분리되어 진행되기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.

코드가 평가되는 과정에서 식별자를 등록하는 선언 단계는 실행되지만, 초기화 단계는 변수 선언문에 도달했을 때 실행된다.





## 함수 호이스팅(Function hoisting)

함수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징을 함수 호이스팅이라 한다.

### 함수 선언문으로 정의한 함수는 함수 선언문 이전에 호출할 수 있다

함수 선언문으로 함수를 정의하면 런타임 이전 코드 평가 과정에서 함수 객체를 생성하고, 전역 객체에 함수 이름과 동일한 식별자를 등록하고 생성된 함수 객체를 할당한다.

> 객체 환경 레코드에 바인딩된 BindingObject를 통해 전역 객체에 식별자를 키로 등록한다.

런타임 단계에서 이미 함수 객체가 생성되어 식별자에 바인딩까지 완료된 상태이기 때문에 함수 선언문 이전에 참조할 수 있고 호출도 가능하다.

### 함수 표현식으로 정의한 함수는 함수 표현식 이전에 호출할 수 없다

함수 표현식으로 함수를 정의하면 함수 호이스팅이 발생하는 것이 아니라 변수 호이스팅이 발생한다.

함수 표현식은 함수 리터럴을 변수에 할당하는 것이다. 변수 할당문의 값은 할당문이 실행되는 시점인 런타임에 평가되므로 함수 표현식의 함수 리터럴도 할당문이 실행되는 시점에 평가되는 함수 객체가 된다.

### 함수는 함수 표현식으로

함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수 둘다 호이스팅은 발생하지만 생성 시점이 다르기 때문에 차이가 발생한다.

함수 호이스팅은 함수를 호출하기 전에 반드시 함수를 선언해야 한다는 당연한 규칙을 무시하기 때문에 함수 선언문 대신 함수 표현식을 사용하는 것이 좋다.





## 변수 호이스팅과 함수 호이스팅

변수 선언문과 함수 선언문은 런타임 이전 코드 평가 단계에서 먼저 실행되고 식별자를 생성, 객체 환경 레코드에 바인딩된 BindingObject를 통해 전역 객체에 식별자를 키로 등록 한다는 점은 같다. 하지만, var 키워드로 선언된 변수는 `undefined`로 초기화되고, 함수 선언문을 통해 암묵적으로 생성된 식별자는 함수 객체로 초기화된다.

var 키워드를 사용한 변수 선언문 이전에 변수를 참조하면 변수 호이스팅에 의해 undefiend로 평가된다.

함수 선언문으로 정의한 함수를 함수 선언문 이전에 호출하면 함수 호이스팅에 의해 호출이 가능하다.
