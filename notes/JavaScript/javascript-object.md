---
title: JavaScript Object
emoji: ✨
tags:
  - JavaScript
---


# 자바스크립트 객체

자바스크립트는 객체 기반의 프로그래밍 언어로 primitive data type을 제외한 나머지들(function, array, regex 등)은 모두 object type으로서 자바스크립트를 이루고 있다.

- reference type이라고 부르기도 한다.
- mutable value이다.
- 다양한 타입의 값들을 하나의 단위로 구성한 복합적 자료 구조이다.
- 일반 객체는 length를 가진 유사 배열객체(array-like objects)이다.



> 객체의 프로퍼티에 접근하기 위해 사용되는 **[] 연산자**는 **식별자**(식별자는 프로그래머가 프로그램 상에 직접 코딩하여 넣기 때문에 정적이다) 대신, 프로그램 실행 시간에 동적으로 얼마든지 변경할 수 있는 문자열을 사용하여 프로퍼티의 이름을 표현할 수가 있습니다.
>
> 이러한 방식으로 객체를 사용할 때 이를 **연관 배열(associative array)**이라 부릅니다. 
>
> 연관 배열은 동적으로 임의의 값과 임의의 문자열을 연관지어 지정할 수 있는 자료구조입니다.
>
> 이와 관련하여 '대응시키다(map)'라는 용어도 자주 사용합니다. 
>
> 즉, **"자바스크립트는 문자열(프로퍼티의 이름)을 임의의 값으로 대응시킨다"**와 같이 표현합니다.
>
> *출처: [연관 배열로서의 객체 (=유사배열 객체)](https://webclub.tistory.com/73)*



### 객체 생성 방법

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메소드
- 클래스 (ES6)



## 객체는 프로퍼티의 집합

객체는 0개 이상의 프로퍼티의 집합이며 프로퍼키는 key와 value로 구성된다.

```javascript
var object = {
  key: 'value'
};
```



### 프로퍼티 키

프로퍼티 키는 프로퍼티 밸류에 접근할 수 있는 식별자 역할을 하며 빈 문자열을 포함하는 모든 문자열 또는 symbol 값을 사용할 수 있다.

자바스크립트 식별자 네이밍 규칙을 준수해야 하며 따르기 힘든 경우 따옴표로 감싸 사용하여야 한다.

```javascript
var obj = {
  propertyKey: 'property value',
  'property-key': 'property value'
};

```

세 번째 라인의 `'property-key'`에 괄호를 사용하지 않는다면 `-`를 연산자로 해석한다.

#### 이것도 키로 사용 가능하다고?

빈 문자열도 프로퍼티 키로 사용할 수 있다. 하지만 키로서 의미가 없으므로 사용하지 않는 것이 좋다.

```javascript
var obj = {
  '': ''
};

```

자바스크립트에서 사용하는 keyword(예약어)도 사용 가능하다. 하지만 예상치 못한 에러를 발생시킬 여지가 있으니 사용하지 말자

```javascript
var obj = {
  for: 4,
  return: 3
};

```

숫자만 사용하는 것도 가능하다. 이는 암묵적 타입 변환을 통해 문자열로 형 변환이 되기 때문이다.

```javascript
var obj = {
  0: 1,
  1: 2,
  2: 3
};

```



### 프로퍼티 밸류

자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있다.

#### 메서드(method)

프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 **메서드**라 부른다.

자바스크립트의 함수는 일급 객체이기 때문에 값으로 평가 될 수 있기 때문에 프로퍼티 값으로 사용이 가능하다.



## 프로퍼티 접근

프로퍼티 밸류에 접근하는 방법은 두 가지가 있다.

- 마침표 표기법(dot notation)
  - 마침표 표기법으로 접근하려면 프로퍼티 키에 공백, 연산자, 특수 문자가 없어야 한다.
- 대괄호 표기법(bracket notation)
  - 대괄호 연산자 내부의 프로퍼키 키는 반드시 따옴표로 감싸야 한다.

```javascript
var obj = {
  propertyKey: '1st'
};

// 마침표 표기법을 사용한 프로퍼티 접근
console.log(obj.propertyKey); // 1st

// 대괄호 표기법을 사용한 프로퍼티 접근
console.log(obj['propertyKey']); // 1st

```



### 프로퍼티에 접근할 때 주의해야 하는 것 들

마침표 표기법으로 접근하려면 프로퍼티 키에 공백, 연산자, 특수 문자가 없어야 한다.

```javascript
var obj = {
  'property-key': '2nd'
};

console.log(obj.property-Key); 
// 브라우저 환경: NaN
// Node.js 환경: ReferenceError: Key is not defined

```

대괄호 연산자 내부의 프로퍼키 키는 반드시 따옴표로 감싸야 한다.

```javascript
var obj = {
  'property-key': '2nd'
};

console.log(obj[property-Key]); // ReferenceError: property is not defined
console.log(obj['property-Key']); // 2nd

```

프로퍼티 키가 숫자만으로 이루어진 문자열인 경우 따옴표를 생략 가능하다.

```javascript
var obj = {
  1: 1,
  2: 2
};

console.log(obj[1]); // 1
console.log(obj['1']); // 1
console.log(obj[2]); // 2
console.log(obj['2']); // 2

```



## 프로퍼티 값 갱신

이미 존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신된다.

```javascript
var obj = {
  'propertyKey': '1st'
};

obj.propertyKey = '2nd';

console.log(obj); // {propertyKey: "2nd"}

```



## 프로퍼티 동적 생성

존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당된다.

```javascript
var obj = {
  'property-key': '2nd'
};

obj.propertyKey = '1st';

console.log(obj); // {'property-key': '2nd', propertyKey: "1st"}

```



## ES6에서 추가된 기능

ES6에서는 더욱 간편하고 표현력 있는 객체 리터럴의 확장 기능을 제공한다.



### 단축 프로퍼티

ES6에서는 프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프로퍼티 키가 동일한 이름일 때, 프로퍼티 키를 생략(property shorthand)할 수 있다.

```javascript
let x = 1, y = 2;

// 프로퍼티 축약 표현
const obj = { 
  x, // x: x 와 같다
  y, // y: y 와 같다
};

console.log(obj); // {x: 1, y: 2}
```



### 메서드 축약 표현

ES6에서는 메서드를 정의할 때, function 키워드를 생략한 축약 표현을 사용할 수 있다.

```javascript
const obj = {
  name: 'Sop',
  // 메서드 축약 표현
  sayHi() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Sop

```

메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다.



### 계산된 프로퍼티

ES6에서는 객체를 만들 때 객체 리터럴 안의 프로퍼티 키가 대괄호로 둘러싸여 있는 경우, 이를 **계산된 프로퍼티(computed property)** 라고 부른다.

```javascript
let fruit = "apple";

let bag = {
  [fruit]: '사과',
};

console.log(bag.apple);

```

#### 객체 리터럴 내부에서 프로퍼티 키 동적 생성

위를 활용하면 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성할 수 있다.

```javascript
const prefix = 'prop';
let i = 0;

// 객체 리터럴 내부에서 프로퍼티 키 동적 생성
const obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}

```

---



## 퀴즈

Q1. 자바스크립트는 클래스 없이 객체를 생성할 수 없다. ( O / X )

- A.  
  X, 자바스크립트는 클래스 없이 객체 생성이 가능하다.

Q2. 브라우저 환경과 node.js의 각각 전역 객체는 무엇인가

- A.  
  window, global

Q3. window 전역 객체가 가지고 있는 전역 객체 프로퍼티 3가지 이상

- A.  
  Object, String, Number, Boolean, Function, Array, RegExp, Date, Math, Promise
