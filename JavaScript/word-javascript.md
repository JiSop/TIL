# 단어와 문장으로 정리하는 자바스크립트

- 새로 나오는 단어는 해당 색션 상단 블록인용구 안에 넣는다.
- 색션 상단 블록인용구에서 중요한 단어는 굵게 표시한다.



## 리터럴과 표현식 그리고 식별자와 변수

> literal, expression, evaluation, operator, value, variable, identifier, declarations, assignment, constant

리터럴(literal)은 소스 코드에서 표현식(expression)으로 평가(evaluation) 되거나 표현식의 일부가 될 수 있다.

표현식은 리터럴과 연산자(operator)로 이루어져 있다.

표현식은 평가되어 값(value)이 될 수 있다.

변수 선언 키워드(`var`, `let`, `const`)로 변수(variable)에 식별자(identifier)를 바인딩 한다.

식별자는 선언문(변수 선언문, 함수 선언문)에서만 사용된다. 

식별자를 만들어 내는 일을 선언(declaration)이라고도 할 수 있다.

모든 식별자는 전역 객체의 프로퍼티가 된다.

모든 변수 선언은 `undefined`로 초기화 값이 할당 된다.

선언된 변수에 할당 연산자(`=`)를 이용해 값을 할당(assignment) 할 수 있다.  
(이때 변수는 값의 메모리 공간의 위치를 가르킨다, 변수가 메모리 공간은 아니다)

식별자를 이용해 변수를 호출하여 값을 사용 할 수 있다.

수학적 의미의 상수가 아니라 재할당을 못하는 변수를 상수(constant)라고 부른다.  
(재할당을 할 수 없어서 변수에 저장된 값을 변경할 수 없다면 변수가 아니라 상수라 부른다)



## 데이터 타입에는 원시형과 참조형이 있다

> data type, primitive data type, reference type / object type, immutable value, pass-by-value, mutable value, pass-by-reference, type casting, implicit coercion, type coercion

자바스크립트의 자료형(data type)에는 크게 원시 데이터 타입(primitive data type)과 참조 타입 / 객체 타입(reference type / object type)으로 분류 된다.

원시 데이터 타입은 변경 불가능한 값(immutable value), 값에 의한 전달(pass-by-value)이고 `string`, `number`, `boolean`, `undefined`, `null`, `symbol`, `bigint`이 있다.

`string`  
큰 따옴표(“) 혹은 작은 따옴표(‘)로 묶인 0개 이상의 문자열을 표현

`number`  
숫자를 표현, 특수한 값인 `NaN`(Not a Number)도 있다.  
표현할 수 있는 정수의 한계는 ±2<sup>53</sup> 이다.

`boolean`  
논리 `true` / `false`를 표현

`undefined`  
초기화 과정에서 할당되는 특수한 값, 선언 이후 값을 할당하지 않은 변수는`undefined`를 가진다. 

`null`  
의도적으로 값이 없다는 것을 명시할 때 사용
(함수가 호출되었으나 유효한 값을 반환할 수 없는 경우, 명시적으로 `null`을 반환하기도 한다)

`symbol`  
유일한 식별자를 만들기 위해 사용되며 모든 심볼 값은 고유하고, 심볼을 반환하는 `Symbol()` 메소드로 만들수 있다.

`bigint`  
길이에 상관없이 정수를 나타낼 수 있고 정수 리터럴 끝에 n을 붙이면 만들 수 있다.  
(숫자형이 가진 한계보다 더 큰 정수를 표현하기 위해 만들어졌고 가장 최근에 추가된 원시 데이터 타입이다)

참조 타입 / 객체 타입은 변경 가능한 값(mutable value), 참조에 의한 전달(pass-by-reference)이다.

자바스크립트는 원시 데이터 타입 값을 제외한 모든 값의 데이터 타입은 `object`이다.  
(함수 또한 `object` 이지만 `typeof`로 확인하면 `function`으로 나온다)

값의 타입은 다른 타입으로 변환할 수 있다.

개발자가 의도적으로 타입을 변환하는 것을 명시적 타입 변환, 타입 캐스팅(type casting)이라 한다.

자바스크립트 엔진에 의해 자동으로 타입이 변환 되는 것을 암묵적 타입 변환(implicit coercion), 타입 강제 변환(type coercion)이라고 한다.



## 객체는 프로퍼티를 싣고

> object, property, method, property key, property value, symbol 

상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료 구조를 객체(object)라 한다.

자바스크립트에서 객체를 생성하는 5가지 방법

- 객체 리터럴
- 생성자 함수
- 클래스 (ES6)
- Object 생성자 함수 (비 권장)
- Object.create 메소드 (비 권장)

객체 내부는 상태 데이터인 프로퍼티(property)와 동작을 하는 메서드(method)로 이루어져 있다.

프로퍼티는 프로퍼티 키(property key)와 프로퍼티 값(property value)으로 이루어져 있다.

프로퍼티 키는 프로퍼티의 식별자로 사용되고 빈 문자열을 포함하는 모든 문자열 또는 symbol 값만 사용한다. 또한 문자 열이지만  ` '`를 생략한다. 그리고 식별자 명명규칙에 따라 이름을 정한다.

프로퍼티 값은 자바스크립트에서 사용할 수 있는 모든 값을 가질 수 있다.

프로퍼티의 값이 함수인 것을 메서드라고 한다. (함수도 값으로 평가 될수 있다)



---

- 리터럴
- 데이터 타입
  - 프라이미티브 데이터 타입
  - 오브젝트 타입 / 레퍼런스 타입
- 변수
- 식별자
- 호이스팅
  - 함수 호이스팅
  - 변수 호이스팅
- 값
- 표현식
- 문(statement)
- 연산자
- 할당문
- 제어문
- 타입 변환
  - 암묵적 타입변환
  - 명시적 타입변환
- 객체
  - 일반 객체
  - 함수 객체
  - 전역 객체
  - 객체의 생성 방법
    - 객체 리터럴
    - 생성자 함수 이용
- 프로퍼티
  - 프로퍼티 키
  - 프로퍼티 값
  - 데이터 프로퍼티
  - 액세스 프로퍼티
  - 정적 프로퍼티
- 함수
  - 파라미터
  - 아규먼트
  - 함수가 가지는 프로퍼티 5가지
- 메소드
- 내부 메소드
- 정적 메소드
- 생성자 함수
- 스코프
  - 스코프 체인
  - 렉시컬 스코프
- 프로토타입
  - 프로토타입 체인
- this
- 실행 컨텍스트
- 클로저
- 아규먼트
- 비동기
- 이벤트 루프
