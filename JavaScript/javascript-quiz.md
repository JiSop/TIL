# JavaScript Quiz

문제의 이름과 해설은 내 마음대로 작성하였다.

- 퀴즈 출처: [lydiahallie/javascript-questions](https://github.com/lydiahallie/javascript-questions)
  - [한국어](https://github.com/lydiahallie/javascript-questions/blob/master/ko-KR/README-ko_KR.md)
  - [영어](https://github.com/lydiahallie/javascript-questions/blob/master/en-EN/README.md)



### Q1. 변수 호이스팅과 일시적 사각지대

```javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = "Lydia";
  let age = 21;
}

sayHi();

```

- **답**: undefined, ReferenceError
- **필요한 지식**: 변수 호이스팅, var와 let키워드로 선언된 변수의 초기화 시점, 일시적 사각지대(TDZ)

1. `sayHi()` 함수 실행

2. 변수 `name`이 호이스팅 되면서 선언, 초기화 되고 `undefined` 할당

   > `var` 키워드로 선언 되었기 때문에 호이스팅이 발생하면서 선언과 초기화가 이루어 진다. 

3. 변수 `age`가 호이스팅 되면서 선언되지만 초기화는 이루어지지 않는다.

   > `let` 키워드로 선언 된 변수는 호이스팅이 이루어지지 않은 것 처럼 동작한다.

4. `console.log(name)` 실행, undefined 출력

   >  변수 `name`의 값은 아직 초기화만 이루어 졌기 때문에 `undefined`이다.

5. `console.log(age)` 실행, ReferenceError(참조 에러) 발생

   > 변수 `age`는 아직 초기화가 이루어지지 않아, TDZ에 있기 때문에 참조할 수 없다.

6. `var name = "Lydia"` 실행

   > 변수 `name`에 string 타입의 값 `"Lydia"` 할당

7. `let age = 21` 실행

   > 변수 `age` 초기화, number 타입의 값 `21` 할당

`sayHi()` 함수가 실행 되면서 `var` 키워드로 선언된 변수 `name`은 호이스팅이 발생하면서 초기화 단계가 실행 되고 `undefined` 값을 가진 상태가 된다. 변수 `age` 또한 호이스팅에 의해 선언되지만 `let` 키워드로 선언되었기에 초기화 단계는 이루어지지 않는다.

L2, 변수 `name`을 출력 하지만 값은 아직 `undefined`이므로 undefined가 출력 된다.

L3, 변수 `age`는 아직 초기화 단계가 이루어지지 않아 참조할 수 없기 때문에 ReferenceError가 발생한다.

L4, 변수 `name`에 문자열 값 `"Lydia"`를 할당한다. L5, 변수 `age` 초기화가 이루어지고 숫자 값 `21`을 할당한다.



### Q2. var와 let 으로 선언된 변수의 스코프

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

```

- **답**: 3 3 3, 0 1 2
- **필요한 지식**: var 키워드와 let 키워드로 선언된 변수의 스코프, 이벤트 루프, 태스크 큐(이벤트 큐)

`var` 키워드로 선언된 변수는 함수 레벨 스코프 만을 지역 스코프로 인정하고, `let` 키워드로 선언된 변수는 블록 레벨 스코프를 지역 스코프로 인정한다.

1. L1~L3 의 첫 번째 `for` 문(루프) 실행

2. 변수 `i` 선언, 초기화, number 타입의 값 `0` 할당

   > 이때 `var` 키워드로 선언 변수 `i`는 전역 변수가 된다.

3. 평가 `i < 3` 비교 (`i`: 0), `true`이므로 반복 문 실행 

4. `setTimeout()` 함수 실행, WebAPI에 위임

   - `setTimeout()` 함수의 콜백 함수는 1ms 후에 Task Queue로 이동

     > 여기서 말하는 콜백 함수는 `() => console.log(i)` 이다.

5. 변수 `i`는 `++` 증감 연산자에 의해 `1`이 된다.

6. 평가 `i < 3` 비교 (`i`: 1), `true`이므로 반복 문 실행

7. `setTimeout()` 함수 실행, WebAPI에 위임

   - `setTimeout()` 함수의 콜백 함수는 1ms 후에 Task Queue로 이동

8. 변수 `i`는 `++` 증감 연산자에 의해 `2`가 된다.

9. 평가 `i < 3` 비교 (`i`: 2), `true`이므로 반복 문 실행

10. `setTimeout()` 함수 실행, WebAPI에 위임

    - `setTimeout()` 함수의 콜백 함수는 1ms 후에 Task Queue로 이동

11. 변수 `i`는 `++` 증감 연산자에 의해 `3`이 된다.

12. 평가 `i < 3` 비교 (`i`: 3), `false`이므로 `for` 문 종료

    > 이때 `for`문이 종료 되면서 Call Stack이 비워진다.

13.  Event Loop에 의해 Task Queue에 있던 콜백 함수가 Call Stack으로 이동

    > 위 4번의 콜백 함수

14. `() => console.log(i)` 실행, `3` 출력

    > `i`는 전역 변수이고 11번에서 `i`의 값은 `3`이 되었다.

15.  Event Loop에 의해 Task Queue에 있던 콜백 함수가 Call Stack으로 이동

    > 위 7번의 콜백 함수

16. `() => console.log(i)` 실행, `3` 출력

17.  Event Loop에 의해 Task Queue에 있던 콜백 함수가 Call Stack으로 이동

    > 위 10번의 콜백 함수

18. `() => console.log(i)` 실행, `3` 출력

L1~L3 의 첫 번째 `for` 문 실행, `var` 키워드로 선언된 변수는 함수 레벨 스코프 만을 지역 스코프로 인정하기 때문에 전역 변수가 되고 때문에 루프가 종료되고 `() => console.log(i)` 콜백 함수가 실행 될때 전역 변수의 영향을 받아 `3 3 3`이 출력된다.

L5~L7 의 두 번째 `for` 문 또한 첫 번째 루프와 큰 차이 없이 동작하지만 `let` 키워드를 사용했기 때문에 변수 `i`가 블록 레벨 스코프를 가진다는 것이다. 

블록 레벨 스코프는 해당 블록 내에서만 유효한 것으로 인정하기 때문에 루프가 종료되고 `() => console.log(i)` 콜백 함수가 실행 될때 전역 변수의 영향을 받지 않아 `0 1 2`가 출력되는 것이다.

`for` 문이 종료 되었지만 값이 유지 될 수 있는 이유는 반복 되면서 생성 된 각각의 렉시컬 환경이 사라지지 않고 남아 있기 때문이다.

**p.s** - 문제의 의도 내에서 최대한 자세하게 작성하려 하니 시간도 오래 걸리고 너무 고통스럽다. 😫 좀 더 간단하게 써야지...



### Q3. 화살표 함수의 this

```javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius
};

console.log(shape.diameter());
console.log(shape.perimeter());

```

- **답**: 20, NaN
- **필요한 지식**: 화살표 함수의 `this` 바인딩

L6의 `perimeter` 메서드는 화살표 함수로 정의 되었기 때문에 `perimeter`의 `this`는 상위 스코프인 `window`를 가르킨다. 따라서 `undefined`이기 때문에 `NaN`가 출력되는 것이다. 

> **TMI** - `NaN`는 'Not a Number'의 약자이고 number 타입이다.
>
> 숫자가 아니지만 숫자이다 ㅋㅋㅋ엌ㅋㅋㅋㅋㅋ

화살표 함수는 함수 자체에 this 바인딩이 없고, 함수가 정의된 위치의 상위 스코프의 `this`를 참조한다.

'화살표 함수 내부의 this'는 호출한 객체를 가르키지 않고, '상위 스코프의 this'를 가르키기 때문에 화살표 함수로 메서드를 정의하는 것은 피해야 한다.

> ECMAScript 스펙에서는 ES6의 '메서드 축약 표현'을 사용해야 메서드로 인정한다.



### Q4. 암묵적 타입 변환

```javascript
+true;
!"Lydia";

```

- **답**: 1, false
- **필요한 지식**: 암묵적 타입 변환

L1, `+true`는 `+` 단항 연산자에 의해 number 타입의 값 `1`로 암묵적 타입 변환 된다. 반대로 `+false`일 경우에는 `0`으로 변환한다.

> `+` 단항 연산자는 피연산자가 숫자 타입의 값이 아니면 숫자 타입의 값으로 암묵적 타입 변환을 수행한다.

L2, `!"Lydia"`는 `!`(논리 NOT) 단항 연산자에 의해 boolean 타입의 값 `false`로 암묵적 타입 변환 된다.  
`!""` 같이 빈 문자열인 경우 `true`로 변환한다.

> `!` 연산자는 언제나 불리언 값을 반환하고, 피연산자가 불리언 값이 아니면 불리언 타입으로 암묵적 타입 변환된다. 

> `!` 연산자는 단일 피연산자를 `true`로 변환할 수 있으면 `false`를 반환하고, 그렇지 않으면 `true`를 반환한다.
>
> 간단하게 말하면 피연산자가 평가되는 논리를 반전 시킨다.

`""`같이 문자열이 비어있는 경우 자바스크립트 엔진은 Falsy로 보는데 이것은 거짓으로 평가될 수 있다는 것 이지 boolean `false`랑은 다르다. `"strung"` 같이 문자열이 비어있지 않다면 Truthy로 보고 역시 `true`랑은 다르다.

이렇게 *'참이라고 볼 수 있는 값(truthy)'* 이나 *'거짓이라고 볼 수 있는 값(falsy)*' 자체를 조건문에 사용하지 말아야 하고 반드시 타입 변환을 통해 boolean으로 변환하여 사용해야한다.



### Q5.

```javascript
const bird = {
  size: "small"
};

const mouse = {
  name: "Mickey",
  small: true
};

```

- **선택지**
  - A: `mouse.bird.size` 는 유효하지 않아요
  - B: `mouse[bird.size]` 는 유효하지 않아요
  - C: `mouse[bird["size"]]` 는 유효하지 않아요
  - D: 이 모든 것들은 유효해요.
- **답**: A
- **필요한 지식**: 객체의 키, 객체 점 표기법 접근, 객체 대괄호 표기법 접근



### Q6.

```javascript
let c = { greeting: "Hey!" };
let d;

d = c;
c.greeting = "Hello";
console.log(d.greeting);

```

- **선택지**
  - A: `Hello`
  - B: `Hey!`
  - C: `undefined`
  - D: `ReferenceError`
  - E: `TypeError`
- **답**: A
- **필요한 지식**: pass-by-reference, mutable value



### Q7.

```javascript
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);

```

- **선택지**
  - A: `true` `false` `true`
  - B: `false` `false` `true`
  - C: `true` `false` `false`
  - D: `false` `true` `true`
- **답**: C
- **필요한 지식**: Number 생성자 함수, 동등 연산자(`==`), 일치 연산자(`===`)

L2, `new Number(3)`는 `3`을 할당한 Number 래퍼 객체를 생성한다. 때문에 변수 `b`는 object 타입이다.

L5, `console.log(a == b)`는 동등 연산자로 비교하여 타입과 관계없이 값의 동등만을 판별하기 때문에 `true`이다.

L6, `console.log(a === b)`는 일치 연산자로 비교하여 값과 타입이 모두 일치해야 하기 때문에 `false`이다. (변수 `a`는 숫자 리터럴로 생성한 number 타입의 값 `3`이다)



### Q8.

```javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = "green" } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: "purple" });
console.log(freddie.colorChange("orange"));

```

- **선택지**
  - A: `orange`
  - B: `purple`
  - C: `green`
  - D: `TypeError`
- **답**: D
- **필요한 지식**: 클래스, 인스턴스, 정적 메소드

정적 메소드인 `colorChange()`는 인스턴스 `freddie`의 프로토타입 체인에 없다.

인스턴스 `freddie`의 프로토타입 체인에 `Chameleon` 클래스가 없기 때문에 `colorChange()`를 호출하지 못하고 `TypeError`가 발생하는 것이다.

클래스로 생성한 인스턴스의 프로토타입 체인에 해당 클래스는 존재하지 않고, 해당 클래스가 소유하고 있는 정적 메소드 또한 존재할 수 없기 때문에 인스턴스에서 호출할 수 없다. 

한 마디로 인스턴스는 클래스의 정적 메소드를 상속받을 수 없다. 

> **정적 메소드**
>
> 클래스에서 `static` 키워드를 사용하면 정적 메소드를 정의할 수 있고, 해당 클래스의 메소드가 된다.

>  **클래스는 프로퍼티/메소드를 가질 수 있다.**
>
> Class는 '함수'로 평가되고 함수는 '일급 객체'이기 때문에 프로퍼티/메소드를 소유할 수 있다.



### Q9.

```javascript
let greeting; // Typo!
greetign = {};
console.log(greetign);

```

- **선택지**
  - A: `{}`
  - B: `ReferenceError: greetign is not defined`
  - C: `undefined`
- **답**: A

변수 `greetign`은 키워드를 사용하지 않고 선언 하지 않았기에 `var` 키워드로 선언한 변수 처럼 전역 변수가 된다.

strict 모드를 사용하거나 ESLint 같은 도구를 사용하면 이런 문제를 예방할 수 있다.



### Q10.

```javascript
function bark() {
  console.log("Woof!");
}

bark.animal = "dog";

```

- **선택지**
  - A: 별일 없어요, 이건 완전히 괜찮아요!
  - B: `SyntaxError` 이 방법으로 함수에 속성을 추가할 수 없어요.
  - C: `"Woof"`이 출력돼요.
  - D: `ReferenceError`
- **답**: A

함수는 '일급 객체'이기 때문에 프로퍼티/메소드를 소유할 수 있다.



### Q11.

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

console.log(member.getFullName());

```

- **선택지**
  - A: `TypeError`
  - B: `SyntaxError`
  - C: `Lydia Hallie`
  - D: `undefined` `undefined`
- **답**: A



### Q12.

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person("Lydia", "Hallie");
const sarah = Person("Sarah", "Smith");

console.log(lydia);
console.log(sarah);

```

- **선택지**
  - A: `Person {firstName: "Lydia", lastName: "Hallie"}` 그리고 `undefined`
  - B: `Person {firstName: "Lydia", lastName: "Hallie"}` 그리고 `Person {firstName: "Sarah", lastName: "Smith"}`
  - C: `Person {firstName: "Lydia", lastName: "Hallie"}` 그리고 `{}`
  - D:`Person {firstName: "Lydia", lastName: "Hallie"}` 그리고 `ReferenceError`
- **답**: A

L10, `new` 키워드를 사용하지 않아 생성자 함수가 아니라 일반 함수로 호출되어 `Person` 함수 내부의 `this`는 전역을 참조하기 때문에 `undefined`를 반환한다.



### Q13. 이벤트 전달의 3단계는 무엇일까요?

- **선택지**
  - A: Target > Capturing > Bubbling
  - B: Bubbling > Target > Capturing
  - C: Target > Bubbling > Capturing
  - D: Capturing > Target > Bubbling
- **답**: D



### Q14. 모든 객체는 프로토타입을 가져요.

- **선택지**
  - A: true
  - B: false
- **답**: B

프로토타입 체인 최상위에는 있는 `Object.prototype` 객체는 프로토타입을 가지고 있지 않다.  

> `Object.prototype` 내부 슬롯 `[[Prototype]] `의 값은 `null`

이 최상위 객체를 제외한 모든 객체는 프로토타입을 가지고있다.



### Q15.

```javascript
function sum(a, b) {
  return a + b;
}

sum(1, "2");

```

- **선택지**
  - A: `NaN`
  - B: `TypeError`
  - C: `"12"`
  - D: `3`
- **답**: C

암묵적 타입변환



### Q16.

```javascript
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);

```

- **선택지**
  - A: `1` `1` `2`
  - B: `1` `2` `2`
  - C: `0` `2` `2`
  - D: `0` `1` `2`
- **답**: C

L2, 증감 연산자가 접미에 사용되었기 때문에 `0` 출력 이후 변수 `number`의 값이 `1`증가  
L3, 증감 연산자가 접두에 사용되었기 때문에 변수 `number`의 값이 `1`증가하여 `2` 출력  



### Q17.

```javascript
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = "Lydia";
const age = 21;

getPersonInfo`${person} is ${age} years old`;

```

- **선택지**
  - A: `"Lydia"` `21` `["", " is ", " years old"]`
  - B: `["", " is ", " years old"]` `"Lydia"` `21`
  - C: `"Lydia"` `["", " is ", " years old"]` `21`
- **답**: B

처음보는 문법이라 당황스럽다 😯

Tagged templates이라고 한다 자세한 내용은 [Template literals - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals) 참고



### Q18.

```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log("You are an adult!");
  } else if (data == { age: 18 }) {
    console.log("You are still an adult.");
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });

```

- **선택지**
  - A: `You are an adult!`
  - B: `You are still an adult.`
  - C: `Hmm.. You don't have an age I guess`
- **답**: C

Reference Type은 값이 아니라 참조가 같아야 한다. 따라서 C



### Q19.

```javascript
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);

```

- **선택지**
  - A: `"number"`
  - B: `"array"`
  - C: `"object"`
  - D: `"NaN"`
- **답**: C



### Q20.

```javascript
function getAge() {
  "use strict";
  age = 21;
  console.log(age);
}

getAge();

```

- **선택지**
  - A: `21`
  - B: `undefined`
  - C: `ReferenceError`
  - D: `TypeError`
- **답**: C



### Q21. `sum`의 값은 무엇일까요?

```javascript
const sum = eval("10*10+5");
```

- **선택지**
  - A: `105`
  - B: `"105"`
  - C: `TypeError`
  - D: `"10*10+5"`
- **답**: A



### Q22. cool_secret에 몇 시간이나 접근이 가능할까요?

```javascript
sessionStorage.setItem("cool_secret", 123);
```

- **선택지**
  - A: 영원히, 데이터는 사라지지 않아요.
  - B: 사용자가 탭을 닫을 때.
  - C: 사용자가 탭뿐만 아니라, 브라우저 전체를 닫을 때.
  - D: 사용자가 자신의 컴퓨터를 종료시켰을 때.
- **답**: B



### Q23.

```javascript
var num = 8;
var num = 10;

console.log(num);
```

- **선택지**
  - A: `8`
  - B: `10`
  - C: `SyntaxError`
  - D: `ReferenceError`
- **답**: B

p.s - 문제의 순서가 난이도에 따라서 있는건 아닌가보다



### Q24.

```javascript
const obj = { 1: "a", 2: "b", 3: "c" };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty("1");
obj.hasOwnProperty(1);
set.has("1");
set.has(1);
```

- **선택지**
  - A: `false` `true` `false` `true`
  - B: `false` `true` `true` `true`
  - C: `true` `true` `false` `true`
  - D: `true` `true` `true` `true`
- **답**: C

L4, 객체의 프로퍼티 키는 문자열(혹은 심볼) 이다.  
`1: "a"`의 `1`은 사실 숫자로 이루어진 문자열이고 따옴표가 생략되어 있는 것이기 때문에 `true`

L6, 변수 `set`은 문자열 타입의 `"1"`을 가지고있지 않기 때문에 당연히 `false`



### Q25.

```javascript
const obj = { a: "one", b: "two", a: "three" };
console.log(obj);
```

- **선택지**
  - A: `{ a: "one", b: "two" }`
  - B: `{ b: "two", a: "three" }`
  - C: `{ a: "three", b: "two" }`
  - D: `SyntaxError`
- **답**: C

`a: "one"`와 `a: "three"`는 동일한 키를 사용하고 있기 때문에 더 뒤에있는 `a: "three"`로 대체된다.



### Q26. JavaScript의 global execution context는 두개를 작성해요. : 전역객체와 "this" 키워드에요.

- **선택지**
  - A: true
  - B: false
  - C: 경우에 따라 달라요
- **답**: A

문제가 무슨 뜻인지 잘모르겠다.

(동작환경에 따라서) 전역객체를 생성하고 전역객체에 this를 바인딩하는 걸 질문하는건가..

p.s - 곧 globalThis로 편하게 구분하는 날이 온다. (<https://github.com/tc39/proposal-global>)



### Q27.

```javascript
for (let i = 1; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
```

- **선택지**
  - A: `1` `2`
  - B: `1` `2` `3`
  - C: `1` `2` `4`
  - D: `1` `3` `4`
- **답**: C



### Q28.

```javascript
String.prototype.giveLydiaPizza = () => {
  return "Just give Lydia pizza already!";
};

const name = "Lydia";

name.giveLydiaPizza();
```

- **선택지**
  - A: `"Just give Lydia pizza already!"`
  - B: `TypeError: not a function`
  - C: `SyntaxError`
  - D: `undefined`
- **답**: A



### Q29.

```javascript
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```

- **선택지**
  - A: `123`
  - B: `456`
  - C: `undefined`
  - D: `ReferenceError`
- **답**: B

`a["[object Object]"]`



### Q30.

```javascript
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"));
const baz = () => console.log("Third");

bar();
foo();
baz();
```

- **선택지**
  - A: `First` `Second` `Third`
  - B: `First` `Third` `Second`
  - C: `Second` `First` `Third`
  - D: `Second` `Third` `First`
- **답**: B



### Q31. 버튼을 클릭했을때 event.target은 무엇일까요?

```html
<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">
      Click!
    </button>
  </div>
</div>
```

- **선택지**
  - A: 외부의 `div`
  - B: 내부의 `div`
  - C: `button`
  - D: 중첩된 모든 요소의 배열
- **답**: C



### Q32. p 태그를 클릭하면 로그의 출력은 무엇일까요?

```html
<div onclick="console.log('div')">
  <p onclick="console.log('p')">
    Click here!
  </p>
</div>
```

- **선택지**
  - A: `p` `div`
  - B: `div` `p`
  - C: `p`
  - D: `div`
- **답**: A

target인 `<p>` 태그에서 부터 버블링 되면서 이벤트 핸들러가 동작한다.



### Q33.

```javascript
const person = { name: "Lydia" };

function sayHi(age) {
  console.log(`${this.name} is ${age}`);
}

sayHi.call(person, 21);
sayHi.bind(person, 21);
```

- **선택지**
  - A: `undefined is 21` `Lydia is 21`
  - B: `function` `function`
  - C: `Lydia is 21` `Lydia is 21`
  - D: `Lydia is 21` `function`
- **답**: D

`Function.prototype.call()` 메소드는 함수에 인수를 전달해 this에 바인딩하고 호출(실행)한다.

> `call()` 은 유사 배열 객체에 배열 메소드(고차 함수)를 사용하려고 할 때 유용하다.

`Function.prototype.bind()` call과 마찬가지로 인수를 전달해 this에 바인딩 하지만 호출은 하지 않고 해당 함수의 복사본을 리턴한다.

> `bind()` 는 **메소드의 this** 와 **메소드 내부의 중첩 함수의 this** 를 일치시켜줄 때 유용하다.



### Q34.

```javascript
function sayHi() {
  return (() => 0)();
}

console.log(typeof sayHi());
```

- **선택지**
  - A: `"object"`
  - B: `"number"`
  - C: `"function"`
  - D: `"undefined"`
- **답**: B

함수 `sayHi()`는 즉시 실행 함수를 반환하고 이 즉시 실행 함수는 숫자 타입의 값 `0`을 반환한다.



### Q35. 이 값들 중 어느 것이 거짓 같은 값 일까요?

```javascript
0;
new Number(0);
("");
(" ");
new Boolean(false);
undefined;
```

- **선택지**
  - A: `0`, `''`, `undefined`
  - B: `0`, `new Number(0)`, `''`, `new Boolean(false)`, `undefined`
  - C: `0`, `''`, `new Boolean(false)`, `undefined`
  - D: 모든 값은 거짓
- **답**: A



### Q36.

```javascript
console.log(typeof typeof 1);
```

- **선택지**
  - A: `"number"`
  - B: `"string"`
  - C: `"object"`
  - D: `"undefined"`
- **답**: B

p.s - 😮... 상상도 못한 문제 ㄴ(°0°)ㄱ



### Q37.

```javascript
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
```

- **선택지**
  - A: `[1, 2, 3, 7 x null, 11]`
  - B: `[1, 2, 3, 11]`
  - C: `[1, 2, 3, 7 x empty, 11]`
  - D: `SyntaxError`
- **답**: C

실행 환경에 따라 다르게 나옴

`numbers[3]` 부터 `numbers[9]` 의 값은 `undefined`



### Q38.

```javascript
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();
```

- **선택지**
  - A: `1` `undefined` `2`
  - B: `undefined` `undefined` `undefined`
  - C: `1` `1` `2`
  - D: `1` `undefined` `undefined`
- **답**: A



### Q39. JavaScript의 모든 것은...

- **선택지**
  - A: primitive 또는 object
  - B: function 또는 object
  - C: 함정 문제! objects만
  - D: number 또는 object
- **답**: A



### Q40.

```javascript
[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2]
);
```

- **선택지**
  - A: `[0, 1, 2, 3, 1, 2]`
  - B: `[6, 1, 2]`
  - C: `[1, 2, 0, 1, 2, 3]`
  - D: `[1, 2, 6]`
- **답**: C

초기값 `[1, 2]`를 가지고 실행된다.



### Q41.

```javascript
!!null;
!!"";
!!1;
```

- **선택지**
  - A: `false` `true` `false`
  - B: `false` `false` `true`
  - C: `false` `true` `true`
  - D: `true` `true` `false`
- **답**: B

`null`, `""`은 Falsy

`1`은 Truthy



### Q42. `setInterval` 메소드는 브라우저에게 무엇을 리턴 할까요?

```javascript
setInterval(() => console.log("Hi"), 1000);
```

- **선택지**
  - A: 유니크한 id
  - B: 지정된 밀리초
  - C: 통과된 함수
  - D: `undefined`
- **답**: A

숫자로 이루어진 `intervalID`를 반환한다.

> `setInterval()`과 `setTimeout()`은 ID를 공유한다.



### Q43.

```javascript
[..."Lydia"];
```

- **선택지**
  - A: `["L", "y", "d", "i", "a"]`
  - B: `["Lydia"]`
  - C: `[[], "Lydia"]`
  - D: `[["L", "y", "d", "i", "a"]]`
- **답**: A



### Q44.

```javascript
function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);
```

- **선택지**
  - A: `[0, 10], [10, 20]`
  - B: `20, 20`
  - C: `10, 20`
  - D: `0, 10` 그리고 `10, 20`
- **답**: C

> 제너레이터 함수는 `yield` 키워드를 만나면 실행을 중단하고 뒤에 있는 값을 반환한다.

L6, 제너레이터 객체 생성하고 `i`를 숫자 값 `10`으로 초기화

L8, `next()` 메소드가 실행되고 `yield i`를 만나서 `10`을 출력

L9, 다시한번 `next()` 메소드가 실행되고 `yield i * 2`를 만나서 `20`을 출력



### Q45.

```javascript
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, "one");
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, "two");
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```

- **선택지**
  - A: `"one"`
  - B: `"two"`
  - C: `"two" "one"`
  - D: `"one" "two"`
- **답**: B

`Promise.race()`는 가장 먼저 처리된 프로미스가 resolve한 처리 결과를 resolve하는 새로운 프로미스를 반환하기 때문에 `secondPromise`의 `two`가 출력된다.



### Q46.

```javascript
let person = { name: "Lydia" };
const members = [person];
person = null;

console.log(members);
```

- **선택지**
  - A: `null`
  - B: `[null]`
  - C: `[{}]`
  - D: `[{ name: "Lydia" }]`
- **답**: D

L2, 변수 `members`의 값은 `[{ name: "Lydia" }]`이 되고 `members[0]`과 변수 `person`은 같은 객체를 참조하고 있다.

L3, 변수 `person`의 값을 `null`로 변경하여도 `members[0]`의 참조는 바뀌지 않기 때문에 그대로 남게된다.



### Q47.

```javascript
const person = {
  name: "Lydia",
  age: 21
};

for (const item in person) {
  console.log(item);
}
```

- **선택지**
  - A: `{ name: "Lydia" }, { age: 21 }`
  - B: `"name", "age"`
  - C: `"Lydia", 21`
  - D: `["name", "Lydia"], ["age", 21]`
- **답**: B

객체의 키를 출력한다. 값을 출력하고 싶다면 아래와 같이 하면 된다.

```javascript
const person = {
  name: "Lydia",
  age: 21
};

for (const item in person) {
  console.log(person[item]);
}
```



### Q48.

```javascript
console.log(3 + 4 + "5");
```

- **선택지**
  - A: `"345"`
  - B: `"75"`
  - C: `12`
  - D: `"12"`
- **답**: B



### Q49. `num`의 값은 무엇일까요?

```javascript
const num = parseInt("7*6", 10);
```

- **선택지**
  - A: `42`
  - B: `"42"`
  - C: `7`
  - D: `NaN`
- **답**: C

문자열에서 첫 번째 10진수인 `7`을 변수 `num`에 할당한다.

> `parseInt()`는 첫 번째 문자열을 숫자로 변환할 수 없는 경우 `NaN`를 반환한다



### Q50.

```javascript
[1, 2, 3].map(num => {
  if (typeof num === "number") return;
  return num * 2;
  });
```

- **선택지**
  - A: `[]`
  - B: `[null, null, null]`
  - C: `[undefined, undefined, undefined]`
  - D: `[ 3 x empty ]`
- **답**: C

객체 내부의 `[1, 2, 3]`은 모두 숫자이기 때문에 L2의 if문이 실행되어 암묵적으로 `undefined`를 반환한다.



### Q51.

```javascript
function getInfo(member, year) {
  member.name = "Lydia";
  year = "1998";
}

const person = { name: "Sarah" };
const birthYear = "1997";

getInfo(person, birthYear);

console.log(person, birthYear);
```

- **선택지**
  - A: `{ name: "Lydia" }, "1997"`
  - B: `{ name: "Sarah" }, "1998"`
  - C: `{ name: "Lydia" }, "1998"`
  - D: `{ name: "Sarah" }, "1997"`
- **답**: A

변수 `birthYear`는 원시형 타입(Primitive Type)인 문자열 `"1997"`이다.  
원시형은 pass-by-value이기 때문에 함수 `getInfo()`의 인수 `year`로 사용될때 값이 복사되어 전달된다. 따라서 `birthYear`와 `year`는 같은 문자열 타입의 값 `"1997"`을 가지고 있을 뿐 서로 다른 참조를 가지고있기 때문에 함수 `getInfo()` 내부, L3에서 `year = "1998"`로 값을 변경해도 변수 `birthYear`에 는 영향이 없다.

변수 `person`은 객체 타입(Object Type)이다.  
객체 타입은 pass-by-reference이기 때문에 함수 `getInfo()`의 인수 `member`로 사용될때 (메모리의) 참조 값을 복사해서 전달한다. 따라서 `person`과 `member`는 같은 곳을 참조하고 있기 때문에 함수 `getInfo()` 내부, L2에서 ` member.name = "Lydia"`로 값을 변경하면 변수 `person`도 영향을 받아 값이 변경된다.

> 변수 `person`이 const 키워드를 사용해 선언되었다 해도 값을 객체로 가지고 있기 때문에 재할당과 같은 식별자를 가지는 변수를 선언할 수 없게 막을 수 있을 뿐, 값으로 가지고 있는 객체의 변경을 막을수 없다. 객체 타입은 불변성을 보장하지 않는다.
>
> 불변성을 보장하기 위해 객체 타입의 값은 복사하여 다루어야 한다.



### Q52.

```javascript
function greeting() {
  throw "Hello world!";
}

function sayHi() {
  try {
    const data = greeting();
    console.log("It worked!", data);
  } catch (e) {
    console.log("Oh no an error:", e);
  }
}

sayHi();
```

- **선택지**
  - A: `"It worked! Hello world!"`
  - B: `"Oh no an error: undefined"`
  - C: `SyntaxError: can only throw Error objects`
  - D: `"Oh no an error: Hello world!"`
- **답**: D



### Q53.

```javascript
function Car() {
  this.make = "Lamborghini";
  return { make: "Maserati" };
}

const myCar = new Car();
console.log(myCar.make);
```

- **선택지**
  - A: `"Lamborghini"`
  - B: `"Maserati"`
  - C: `ReferenceError`
  - D: `TypeError`
- **답**: B



### Q54.

```javascript
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
```

- **선택지**
  - A: `"undefined", "number"`
  - B: `"number", "number"`
  - C: `"object", "number"`
  - D: `"number", "undefined"`
- **답**: A



### Q55.

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}

Dog.prototype.bark = function() {
  console.log(`Woof I am ${this.name}`);
};

const pet = new Dog("Mara");

pet.bark();

delete Dog.prototype.bark;

pet.bark();
```

- **선택지**
  - A: `"Woof I am Mara"`, `TypeError`
  - B: `"Woof I am Mara"`, `"Woof I am Mara"`
  - C: `"Woof I am Mara"`, `undefined`
  - D: `TypeError`, `TypeError`
- **답**: A



### Q56.

```javascript
const set = new Set([1, 1, 2, 3, 4]);

console.log(set);
```

- **선택지**
  - A: `[1, 1, 2, 3, 4]`
  - B: `[1, 2, 3, 4]`
  - C: `{1, 1, 2, 3, 4}`
  - D: `{1, 2, 3, 4}`
- **답**: D



### Q57.

```javascript
// counter.js
let counter = 10;
export default counter;
```

```javascript
// index.js
import myCounter from "./counter";

myCounter += 1;

console.log(myCounter);
```

- **선택지**
  - A: `10`
  - B: `11`
  - C: `Error`
  - D: `NaN`
- **답**: C

import 된 모듈은 *read-only*



### Q58.

```javascript
const name = "Lydia";
age = 21;

console.log(delete name);
console.log(delete age);
```

- **선택지**
  - A: `false`, `true`
  - B: `"Lydia"`, `21`
  - C: `true`, `true`
  - D: `undefined`, `undefined`
- **답**: A

`delete` 연산자는 객체의 프로퍼티를 삭제하고 성공하면 `true`를 반환한다.

L2, `age`는 전역 객체의 프로퍼티 임으로 삭제가 가능하다.



### Q59.

```javascript
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);
```

- **선택지**
  - A: `[[1, 2, 3, 4, 5]]`
  - B: `[1, 2, 3, 4, 5]`
  - C: `1`
  - D: `[1]`
- **답**: C

`numbers`의 첫 번째 요소인 `1`을 `y`에 구조 분해 할당한다.



### Q60.

```javascript
const user = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user };

console.log(admin);
```

- **선택지**
  - A: `{ admin: true, user: { name: "Lydia", age: 21 } }`
  - B: `{ admin: true, name: "Lydia", age: 21 }`
  - C: `{ admin: true, user: ["Lydia", 21] }`
  - D: `{ admin: true }`
- **답**: B



### Q61.

```javascript
const person = { name: "Lydia" };

Object.defineProperty(person, "age", { value: 21 });

console.log(person);
console.log(Object.keys(person));
```

- **선택지**
  - A: `{ name: "Lydia", age: 21 }`, `["name", "age"]`
  - B: `{ name: "Lydia", age: 21 }`, `["name"]`
  - C: `{ name: "Lydia"}`, `["name", "age"]`
  - D: `{ name: "Lydia"}`, `["age"]`
- **답**: B

`Object.defineProperty()`는 객체에 프로퍼티를 추가하거나 수정할 수 있다.

`defineProperty()` 메소드를 사용해 추가한 프로퍼티는 기본적으로 불변하고 열거와 수정이 불가능하다.

> 일반적인 프로퍼티 할당을 통해 추가하면 열거와 수정이 가능하다.



### Q62.

```javascript
const settings = {
  username: "lydiahallie",
  level: 19,
  health: 90
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);
```

- **선택지**
  - A: `"{"level":19, "health":90}"`
  - B: `"{"username": "lydiahallie"}"`
  - C: `"["level", "health"]"`
  - D: `"{"username": "lydiahallie", "level":19, "health":90}"`
- **답**: A

참조: [JSON.stringify() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)



### Q63.

```javascript
let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = number => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);
```

- **선택지**
  - A: `10`, `10`
  - B: `10`, `11`
  - C: `11`, `11`
  - D: `11`, `12`
- **답**: A

Q16과  유사한 문제

L6, 반환 후에 값이 증가하기 때문에 변수 `num1`은 숫자 값 `10`이다.

> 함수 `increaseNumber()`는 `num`의 숫자 값 `10`을 반환하고 접미에 사용된 증감 연산자가 값을 증가시켜 `11` 된다.

L7, 위와 유사하다. 함수 `increasePassedNumber()`의 파라미터 `number`에 변수 `num1`의 값 `10`을 전달해서 사용한다.

> 함수 `increaseNumber()`는 L1에서 선언된 변수 `num`의 값을 변화 시키지만 함수 `increasePassedNumber()`는 변수 `num`에 영향을 주지 않는다.



### Q64.

```javascript
const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log(x.number *= 2);
};

multiply();
multiply();
multiply(value);
multiply(value);
```

- **선택지**
  - A: `20`, `40`, `80`, `160`
  - B: `20`, `40`, `20`, `40`
  - C: `20`, `20`, `20`, `40`
  - D: `NaN`, `NaN`, `20`, `40`
- **답**: C

함수 `multiply`의 파라미터 `x`는 기본 값으로 변수 `value`를 스프레드 연산자로 복사해서 사용하고 있기 때문에 변수 `value`가 가르키는 객체에 영향을 주지 않는다.

L9, L10, `multiply(value)`는 변수 `value`가 가르키는 객체를 전달받아 수정하기 때문에 값이 증가한다.



### Q65.

```javascript
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```

- **선택지**
  - A: `1` `2` 그리고 `3` `3` 그리고 `6` `4`
  - B: `1` `2` 그리고 `2` `3` 그리고 `3` `4`
  - C: `1` `undefined` 그리고 `2` `undefined` 그리고 `3` `undefined` 그리고 `4` `undefined`
  - D: `1` `2` 그리고 `undefined` `3` 그리고 `undefined` `4`
- **답**: D

Q50과 유사

콜백 함수가 값을 리턴하지 않기 때문에 현재 값만 출력한다.

처음 출력에서 `x`가 `1`인 이유는 배열의 첫 번째 값을 초기값으로 사용했기 때문이다.



### Q66. `Dog` 클래스를 성공적으로 확장할 수 있는 생성자는 어느 것일까요?

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
};

class Labrador extends Dog {
  // 1 
  constructor(name, size) {
    this.size = size;
  }
  // 2
  constructor(name, size) {
    super(name);
    this.size = size;
  }
  // 3
  constructor(size) {
    super(name);
    this.size = size;
  }
  // 4 
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

};
```

- **선택지**
  - A: 1
  - B: 2
  - C: 3
  - D: 4
- **답**: B



### Q67.

```javascript
// index.js
console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```

- **선택지**
  - A: `running index.js`, `running sum.js`, `3`
  - B: `running sum.js`, `running index.js`, `3`
  - C: `running sum.js`, `3`, `running index.js`
  - D: `running index.js`, `undefined`, `running sum.js`
- **답**: B

참고: <https://github.com/lydiahallie/javascript-questions/issues/218>



### Q68.

```javascript
console.log(Number(2) === Number(2))
console.log(Boolean(false) === Boolean(false))
console.log(Symbol('foo') === Symbol('foo'))
```

- **선택지**
  - A: `true`, `true`, `false`
  - B: `false`, `true`, `false`
  - C: `true`, `false`, `true`
  - D: `true`, `true`, `true`
- **답**: A

symbol은 항상 고유하다.

참고: <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol>



### Q69.

```javascript
const name = "Lydia Hallie"
console.log(name.padStart(13))
console.log(name.padStart(2))
```

- **선택지**
  - A: `"Lydia Hallie"`, `"Lydia Hallie"`
  - B: `" Lydia Hallie"`, `" Lydia Hallie"` (`"[13x whitespace]Lydia Hallie"`, `"[2x whitespace]Lydia Hallie"`)
  - C: `" Lydia Hallie"`, `"Lydia Hallie"` (`"[1x whitespace]Lydia Hallie"`, `"Lydia Hallie"`)
  - D: `"Lydia Hallie"`, `"Lyd"`
- **답**: C

참고: [String.prototype.padStart() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) , [tc39/proposal-string-pad-start-end](https://github.com/tc39/proposal-string-pad-start-end)



### Q70.

```javascript
console.log("🥑" + "💻");
```

- **선택지**
  - A: `"🥑💻"`
  - B: `257548`
  - C: 해당 코드 주소를 포함하는 문자열
  - D: 에러
- **답**: A

...?



### Q71. console.log 표현식 뒤에 언급된 값을 어떻게 출력할 수 있을까요?

```javascript
function* startGame() {
  const answer = yield "Do you love JavaScript?";
  if (answer !== "Yes") {
    return "Oh wow... Guess we're gone here";
  }
  return "JavaScript loves you back ❤️";
}

const game = startGame();
console.log(/* 1 */); // Do you love JavaScript?
console.log(/* 2 */); // JavaScript loves you back ❤️
```

- **선택지**
  - A: `game.next("Yes").value` 그리고 `game.next().value`
  - B: `game.next.value("Yes")` 그리고 `game.next.value()`
  - C: `game.next().value` 그리고 `game.next("Yes").value`
  - D: `game.next.value()` 그리고 `game.next.value("Yes")`
- **답**: C



### Q72.

```javascript
console.log(String.raw`Hello\nworld`);
```

- **선택지**
  - A: `Hello world!`
  - B: `Hello`
       `world`
  - C: `Hello\nworld`
  - D: `Hello\n`
       `world`
- **답**: C

`String.raw` 메소드는 이스케이스 문자를 무시한다.

참고: [String.raw() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw)



### Q73.

```javascript
async function getData() {
  return await Promise.resolve("I made it!");
}

const data = getData();
console.log(data);
```

- **선택지**
  - A: `"I made it!"`
  - B: `Promise {<resolved>: "I made it!"}`
  - C: `Promise {<pending>}`
  - D: `undefined`
- **답**: C



### Q74.

```javascript
function addToList(item, list) {
  return list.push(item);
}

const result = addToList("apple", ["banana"]);
console.log(result);
```

- **선택지**
  - A: `['banana', 'apple']`
  - B: `2`
  - C: `true`
  - D: `undefined`
- **답**: B

`Array.prototype.push()`는 배열의 끝에 요소를 추가한 후 배열의 길이를 반환하기 때문에 `2`

> 문제 원본의 해설에 '새로운 배열의 길이를 리턴해요!' 라고 설명이 되어있는데 새로운 배열을 반환한다고 오해하기 쉬운 문장인 것 같다. `push()` `pop()` `unshift()` `shift()` 이 메소드들은 새로운 배열을 반환하지 않고 모두 원본 배열을 수정한다.
>
> p.s - 적고보니 밑에 추가적으로 설명이 있었다 😅



### Q75.

```javascript
const box = { x: 10, y: 20 };

Object.freeze(box);

const shape = box;
shape.x = 100;

console.log(shape);
```

- **선택지**
  - A: `{ x: 100, y: 20 }`
  - B: `{ x: 10, y: 20 }`
  - C: `{ x: 100 }`
  - D: `ReferenceError`
- **답**: B

변수 `box` 와 `shape`는 같은 객체를 참조하고 있다. L3에서 해당 객체를 동결시켰기 때문에 L6에서 수정이 불가능하다.



### Q76.

```javascript
const { name: myName } = { name: "Lydia" };

console.log(name);
```

- **선택지**
  - A: `"Lydia"`
  - B: `"myName"`
  - C: `undefined`
  - D: `ReferenceError`
- **답**: D

객체 구조 분해 할당, 프로퍼티 키를 기준으로 구조 분해 할당이 이루어진다. 

`myName`은 문자열 값이 아니라 식별자이다.

**참조**

- [구조 분해 할당 | javascript.info](https://ko.javascript.info/destructuring-assignment)
- [구조 분해 할당 - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [tc39/proposal-object-rest-spread](https://github.com/tc39/proposal-object-rest-spread)



### Q77. 이것은 pure 함수 일까요?

```javascript
function sum(a, b) {
  return a + b;
}
```

- **선택지**
  - A: Yes
  - B: No
- **답**: A

순수 함수는 항상 같은 결과를 반환한다.

함수 `sum`에 전달되는 값이 동일하다면 항상 같은 결과를 반환하기 때문에 순수 함수이다.



### Q78.

```javascript
const add = () => {
  const cache = {};
  return num => {
    if (num in cache) {
      return `From cache! ${cache[num]}`;
    } else {
      const result = num + 10;
      cache[num] = result;
      return `Calculated! ${result}`;
    }
  };
};

const addFunction = add();
console.log(addFunction(10));
console.log(addFunction(10));
console.log(addFunction(5 * 2));
```

- **선택지**
  - A: `Calculated! 20` `Calculated! 20` `Calculated! 20`
  - B: `Calculated! 20` `From cache! 20` `Calculated! 20`
  - C: `Calculated! 20` `From cache! 20` `From cache! 20`
  - D: `Calculated! 20` `From cache! 20` `Error`
- **답**: C



### Q79.

```javascript
const myLifeSummedUp = ["☕", "💻", "🍷", "🍫"]

for (let item in myLifeSummedUp) {
  console.log(item);
}

for (let item of myLifeSummedUp) {
  console.log(item);
}
```

- **선택지**
  - A: `0` `1` `2` `3` 그리고 `"☕"` `"💻"` `"🍷"` `"🍫"`
  - B: `"☕"` `"💻"` `"🍷"` `"🍫"` 그리고 `"☕"` `"💻"` `"🍷"` `"🍫"`
  - C: `"☕"` `"💻"` `"🍷"` `"🍫"` 그리고 `0` `1` `2` `3`
  - D: `0` `1` `2` `3` 그리고 `{0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}`
- **답**: A



### Q80.

```javascript
const list = [1 + 2, 1 * 2, 1 / 2]
console.log(list);
```

- **선택지**
  - A: `["1 + 2", "1 * 2", "1 / 2"]`
  - B: `["12", 2, 0.5]`
  - C: `[3, 2, 0.5]`
  - D: `[1, 1, 1]`
- **답**: C



### Q81.

```javascript
function sayHi(name) {
  return `Hi there, ${name}`
}

console.log(sayHi());
```

- **선택지**
  - A: `Hi there,`
  - B: `Hi there, undefined`
  - C: `Hi there, null`
  - D: `ReferenceError`
- **답**: B



### Q82.

```javascript
var status = "😎";

setTimeout(() => {
  const status = "😍";

  const data = {
    status: "🥑",
    getStatus() {
      return this.status;
    }
  };

  console.log(data.getStatus());
  console.log(data.getStatus.call(this));
}, 0);
```

- **선택지**
  - A: `"🥑"` 그리고 `"😍"`
  - B: `"🥑"` 그리고 `"😎"`
  - C: `"😍"` 그리고 `"😎"`
  - D: `"😎"` 그리고 `"😎"`
- **답**: B



### Q83.

```javascript
const person = {
  name: "Lydia",
  age: 21
};

let city = person.city;
city = "Amsterdam";

console.log(person);
```

- **선택지**
  - A: `{ name: "Lydia", age: 21 }`
  - B: `{ name: "Lydia", age: 21, city: "Amsterdam" }`
  - C: `{ name: "Lydia", age: 21, city: undefined }`
  - D: `"Amsterdam"`
- **답**: A

L6, 변수 `city`는 '객체 `person`'이 가지는 '프로퍼티 `city`'를 참조하는데 `person.city`는 존재하지 않기 때문에 변수 `city`의 값은 `undefined`이다.

L7, 변수 `city`의 값이 문자열 `"Amsterdam"`으로 변경 되었을 뿐, 객체 `person`에 영향을 주지 않는다.



### Q84.

```javascript
function checkAge(age) {
  if (age < 18) {
    const message = "Sorry, you're too young.";
  } else {
    const message = "Yay! You're old enough!";
  }

  return message;
}

console.log(checkAge(21));
```

- **선택지**
  - A: `"Sorry, you're too young."`
  - B: `"Yay! You're old enough!"`
  - C: `ReferenceError`
  - D: `undefined`
- **답**: C

`let`, `const` 키워드를 사용해 선언한 변수는 블록 스코프를 갖는다.



### Q85. 어떤 종류의 정보가 출력될까요?

```javascript
fetch('https://www.website.com/api/user/1')
  .then(res => res.json())
  .then(res => console.log(res));
```

- **선택지**
  - A: `fetch` 메소드의 결과
  - B: `fetch` 메소드의 두번째 호출 결과
  - C: 이전 `.then()`에서 callback된 결과
  - D: 항상 undefined
- **답**: C



### Q86. `true`를 인수로 전달 할 수 없도록 주어졌을 때, `hasName`을 `true`로 설정할 수 있는 방법은 어느 것 일까요?

```javascript
function getName(name) {
  const hasName = //
}
```

- **선택지**
  - A: `!!name`
  - B: `name`
  - C: `new Boolean(name)`
  - D: `name.length`
- **답**: A



### Q87.

```javascript
console.log("I want pizza"[0]);
```

- **선택지**
  - A: `"""`
  - B: `"I"`
  - C: `SyntaxError`
  - D: `undefined`
- **답**: B

문자열은 유사 배열이다.



### Q88.

```javascript
function sum(num1, num2 = num1) {
  console.log(num1 + num2)
}

sum(10)
```

- **선택지**
  - A: `NaN`
  - B: `20`
  - C: `ReferenceError`
  - D: `undefined`
- **답**: B



### Q89.

```javascript
// module.js 
export default () => "Hello world"
export const name = "Lydia"

// index.js 
import * as data from "./module"

console.log(data)
```

- **선택지**
  - A: `{ default: function default(), name: "Lydia" }`
  - B: `{ default: function default() }`
  - C: `{ default: "Hello world", name: "Lydia" }`
  - D: Global object of `module.js`
- **답**: A



### Q90.

```javascript
class Person {
  constructor(name) {
    this.name = name
  }
}

const member = new Person("John")
console.log(typeof member)
```

- **선택지**
  - A: `"class"`
  - B: `"function"`
  - C: `"object"`
  - D: `"string"`
- **답**: C



### Q91.

```javascript
let newList = [1, 2, 3].push(4)

console.log(newList.push(5))
```

- **선택지**
  - A: `[1, 2, 3, 4, 5]`
  - B: `[1, 2, 3, 5]`
  - C: `[1, 2, 3, 4]`
  - D: `Error`
- **답**: D

Q74 참고



### Q92.

```javascript
function giveLydiaPizza() {
  return "Here is pizza!"
}

const giveLydiaChocolate = () => "Here's chocolate... now go hit the gym already."

console.log(giveLydiaPizza.prototype)
console.log(giveLydiaChocolate.prototype)
```

- **선택지**
  - A: `{ constructor: ...}` `{ constructor: ...}`
  - B: `{}` `{ constructor: ...}`
  - C: `{ constructor: ...}` `{}`
  - D: `{ constructor: ...}` `undefined`
- **답**: D

화살표 함수는 non-constructor이기 때문에 생성자 함수로 사용할 수 없다.

생성자 함수로 사용할 수 없다는 것은 인스턴스를 생성할 수 없다는 뜻이다. 

즉, ptototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.



### Q93.

```javascript
const person = {
  name: "Lydia",
  age: 21
};

for (const [x, y] of Object.entries(person)) {
  console.log(x, y)
}
```

- **선택지**
  - A: `name` `Lydia` 그리고 `age` `21`
  - B: `["name", "Lydia"]` 그리고 `["age", 21]`
  - C: `["name", "age"]` 그리고 `undefined`
  - D: `Error`
- **답**: A

참고 - [Object.entries() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)



### Q94.

```javascript
function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}

console.log(getItems(["banana", "apple"], "pear", "orange"));
```

- **선택지**
  - A: `["banana", "apple", "pear", "orange"]`
  - B: `[["banana", "apple"], "pear", "orange"]`
  - C: `["banana", "apple", ["pear"], "orange"]`
  - D: `SyntaxError`
- **답**: D

rest 파라미터는 마지막에 사용해야한다.

참고 - [Rest 파라미터 - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters)



### Q95.

```javascript
function nums(a, b) {
  if
  (a > b)
  console.log('a is bigger')
  else 
  console.log('b is bigger')
  return 
  a + b
}

console.log(nums(4, 2))
console.log(nums(1, 2))
```

- **선택지**
  - A: `a is bigger`, `6` 그리고 `b is bigger`, `3`
  - B: `a is bigger`, `undefined` 그리고 `b is bigger`, `undefined`
  - C: `undefined` 그리고 `undefined`
  - D: `SyntaxError`
- **답**: B

자바스크립트는 세미콜론을 명시적으로 사용하지 않아도 자동으로 삽입해준다.

참고 - Q50



### Q96.

```javascript
class Person {
  constructor() {
    this.name = "Lydia"
  }
}

Person = class AnotherPerson {
  constructor() {
    this.name = "Sarah"
  }
}

const member = new Person()
console.log(member.name)
```

- **선택지**
  - A: `"Lydia"`
  - B: `"Sarah"`
  - C: `Error: cannot redeclare Person`
  - D: `SyntaxError`
- **답**: B



### Q97.

```javascript
const info = {
  [Symbol('a')]: 'b'
}

console.log(info)
console.log(Object.keys(info))
```

- **선택지**
  - A: `{Symbol('a'): 'b'}` 그리고 `["{Symbol('a')"]`
  - B: `{}` 그리고 `[]`
  - C: `{ a: "b" }` 그리고 `["a"]`
  - D: `{Symbol('a'): 'b'}` 그리고 `[]`
- **답**: D

symbol은 열거가 불가능하다.



### Q98.

```javascript
const getList = ([x, ...y]) => [x, y]
const getUser = user => { name: user.name, age: user.age }

const list = [1, 2, 3, 4]
const user = { name: "Lydia", age: 21 }

console.log(getList(list))
console.log(getUser(user))
```

- **선택지**
  - A: `[1, [2, 3, 4]]` 그리고 `undefined`
  - B: `[1, [2, 3, 4]]` 그리고 `{ name: "Lydia", age: 21 }`
  - C: `[1, 2, 3, 4]` 그리고 `{ name: "Lydia", age: 21 }`
  - D: `Error` 그리고 `{ name: "Lydia", age: 21 }`
- **답**: A

L2, 반환하는 객체를 소괄호로 감싸야한다.



### Q99.

```javascript
const name = "Lydia"

console.log(name())
```

- **선택지**
  - A: `SyntaxError`
  - B: `ReferenceError`
  - C: `TypeError`
  - D: `undefined`
- **답**: C

p.s - 세미콜론 계속 안붙어 있는거 신경쓰여 죽겠다



### Q100.

```javascript
// 🎉✨ 이번이 내 100번째 질문이에요! ✨🎉

const output = `${[] && 'Im'}possible!
You should${'' && `n't`} see a therapist after so much JavaScript lol`
```

- **선택지**
  - A: `possible! You should see a therapist after so much JavaScript lol`
  - B: `Impossible! You should see a therapist after so much JavaScript lol`
  - C: `possible! You shouldn't see a therapist after so much JavaScript lol`
  - D: `Impossible! You shouldn't see a therapist after so much JavaScript lol`
- **답**: B



### Q101.

```javascript
const one = (false || {} || null)
const two = (null || false || "")
const three = ([] || 0 || true)

console.log(one, two, three)
```

- **선택지**
  - A: `false` `null` `[]`
  - B: `null` `""` `true`
  - C: `{}` `""` `[]`
  - D: `null` `null` `true`
- **답**: C



### Q102.

```javascript
const myPromise = () => Promise.resolve('I have resolved!')

function firstFunction() {
  myPromise().then(res => console.log(res))
  console.log('second')
}

async function secondFunction() {
  console.log(await myPromise())
  console.log('second')
}

firstFunction()
secondFunction()
```

- **선택지**
  - A: `I have resolved!`, `second` 그리고 `I have resolved!`, `second`
  - B: `second`, `I have resolved!` 그리고 `second`, `I have resolved!`
  - C: `I have resolved!`, `second` 그리고 `second`, `I have resolved!`
  - D: `second`, `I have resolved!` 그리고 `I have resolved!`, `second`
- **답**: D

`async` `await` 키워드를 사용하면 promise가 resoloved 될때까지 기다리게 할 수 있다.



### Q103.

```javascript
const set = new Set()

set.add(1)
set.add("Lydia")
set.add({ name: "Lydia" })

for (let item of set) {
  console.log(item + 2)
}
```

- **선택지**
  - A: `3`, `NaN`, `NaN`
  - B: `3`, `7`, `NaN`
  - C: `3`, `Lydia2`, `[object Object]2`
  - D: `"12"`, `Lydia2`, `[object Object]2`
- **답**: C



### Q104.

```javascript
Promise.resolve(5)
```

- **선택지**
  - A: `5`
  - B: `Promise {: 5}`
  - C: `Promise {: 5}`
  - D: `Error`
- **답**: C



### Q105.

```javascript
function compareMembers(person1, person2 = person) {
  if (person1 !== person2) {
    console.log("Not the same!")
  } else {
    console.log("They are the same!")
  }
}

const person = { name: "Lydia" }

compareMembers(person)
```

- **선택지**
  - A: `Not the same!`
  - B: `They are the same!`
  - C: `ReferenceError`
  - D: `SyntaxError`
- **답**: B



### Q106.

```javascript
const colorConfig = {
  red: true,
  blue: false,
  green: true,
  black: true,
  yellow: false,
}

const colors = ["pink", "red", "blue"]

console.log(colorConfig.colors[1])
```

- **선택지**
  - A: `true`
  - B: `false`
  - C: `undefined`
  - D: `TypeError`
- **답**: D



### Q107.

```javascript
console.log('❤️' === '❤️')
```

- **선택지**
  - A: `true`
  - B: `false`
- **답**: A



### Q108. 다음 중 원본 배열을 수정하는 method는 무엇일까요?

```javascript
const emojis = ['✨', '🥑', '😍']

emojis.map(x => x + '✨')
emojis.filter(x => x !== '🥑')
emojis.find(x => x !== '🥑')
emojis.reduce((acc, cur) => acc + '✨')
emojis.slice(1, 2, '✨') 
emojis.splice(1, 2, '✨')
```

- **선택지**
  - A: `All of them`
  - B: `map` `reduce` `slice` `splice`
  - C: `map` `slice` `splice`
  - D: `splice`
- **답**: D

`Array.prototype.map` : 배열의 각 요소에 콜백 함수의 반환값으로 새로운 배열을 생성하여 반환한다.

`Array.prototype.filter` : 콜백 함수의 실행 결과가 `true`인 요소의 값만 추출하여 새로운 배열을 생성하여 반환한다.

`Array.prototype.find` : 콜백 함수를 실행하여 그 결과가 `true`인 첫 번째 요소를 반환한다.

`Array.prototype.reduce` : 각 요소에 리듀서 함수(이전의 콜백 함수 실행 반환값을 전달)를 실행하고 그 결과를 반환한다.

`Array.prototype.slice` : 인자로 주어진 배열의 시작과 끝 인덱스를 기준으로 얕은 복사를 하여 새로운 배열을 반환한다.

`Array.prototype.splice` : 원본 배열의 기존 요소를 삭제, 교체하거나 새로운 요소를 추가한다.



### Q109.

```javascript
const food = ['🍕', '🍫', '🥑', '🍔']
const info = { favoriteFood: food[0] }

info.favoriteFood = '🍝'

console.log(food)
```

- **선택지**
  - A: `['🍕', '🍫', '🥑', '🍔']`
  - B: `['🍝', '🍫', '🥑', '🍔']`
  - C: `['🍝', '🍕', '🍫', '🥑', '🍔']`
  - D: `ReferenceError`
- **답**: A

이모티콘은 문자열이다. 따라서 L2의 `favoriteFood: food[0]` 같이 할당을하면 pass-by-value로 값 자체를 복사하여 전달하고 할당하기 때문에 이 후 L4에서 `info.favoriteFood = '🍝'` 같이 값을 변경하더라도 `food[0]`의 값에 영향을 주지 않는다. 



### Q110. 이 메소드는 무엇을 할까요?

```javascript
JSON.parse()
```

- **선택지**
  - A: Parses JSON to a JavaScript value
  - B: Parses a JavaScript object to JSON
  - C: Parses any JavaScript value to JSON
  - D: Parses JSON to a JavaScript object only
- **답**: A

JSON 문자열의 구문으로 JavaScript 값이나 객체를 생성한다.

- p.s - 이 문제의 선택지만 해석이 안되어 있어 추가
  - A: JSON을 자바스크립트의 값으로 변환한다.
  - B: 자바스크립트의 객체를 JSON으로 변환한다.
  - C: 어떤 자바스크립트 값이든 JSON으로 변환한다.
  - D: JSON을 자바스크립트의 객체로만 변환한다.

> Parse라는 단어의 뜻은 구문 분석, 혹은 구문 분석 과정 그 자체를 의미하는게 맞지만 이해하기 쉽게 '변환'이라는 단어를 사용하였다.



### Q111.

```javascript
let name = 'Lydia'

function getName() {
  console.log(name)
  let name = 'Sarah'
}

getName()
```

- **선택지**
  - A: Lydia
  - B: Sarah
  - C: `undefined`
  - D: `ReferenceError`
- **답**: D

L5, 변수 name은 호이스팅 되지만 초기화가 이루어지지 않았기 때문에 ReferenceError가 발생한다.



### Q112.

```javascript
function* generatorOne() {
  yield ['a', 'b', 'c'];
}

function* generatorTwo() {
  yield* ['a', 'b', 'c'];
}

const one = generatorOne()
const two = generatorTwo()

console.log(one.next().value)
console.log(two.next().value)
```

- **선택지**
  - A: `a` 그리고 `a`
  - B: `a` 그리고 `undefined`
  - C: `['a', 'b', 'c']` 그리고 `a`
  - D: `a` 그리고 `['a', 'b', 'c']`
- **답**: C



### Q113.

```javascript
console.log(`${(x => x)('I love')} to program`)
```

- **선택지**
  - A: `I love to program`
  - B: `undefined to program`
  - C: `${(x => x)('I love') to program`
  - D: `TypeError`
- **답**: A



### Q114.

```javascript
let config = {
  alert: setInterval(() => {
    console.log('Alert!')
  }, 1000)
}

config = null
```

- **선택지**
  - A: `setInterval` 콜백은 호출되지 않을거에요
  - B: `setInterval` 콜백은 한 번만 호출돼요
  - C: `setInterval` 콜백은 여전히 매 초마다 호출돼요
  - D: 결코 `config.alert()`를 호출 하지 않고, config 는 `null`이에요
- **답**: C



### Q115. 어느 method가 값 `'Hello world!'`를 리턴 할까요?

```javascript
const myMap = new Map()
const myFunc = () => 'greeting'

myMap.set(myFunc, 'Hello world!')

//1
myMap.get('greeting')
//2
myMap.get(myFunc)
//3
myMap.get(() => 'greeting')
```

- **선택지**
  - A: 1
  - B: 2
  - C: 2 그리고 3
  - D: 모두
- **답**: B



### Q116.

```javascript
const person = {
  name: "Lydia",
  age: 21
}

const changeAge = (x = { ...person }) => x.age += 1
const changeAgeAndName = (x = { ...person }) => {
  x.age += 1
  x.name = "Sarah"
}

changeAge(person)
changeAgeAndName()

console.log(person)
```

- **선택지**
  - A: `{name: "Sarah", age: 22}`
  - B: `{name: "Sarah", age: 23}`
  - C: `{name: "Lydia", age: 22}`
  - D: `{name: "Lydia", age: 23}`
- **답**: C

p.s - 어느새 한국어로 번역된 문제는 이제 다 풀었다



### Q117. Which of the following options will return `6`?

```javascript
function sumValues(x, y, z) {
  return x + y + z;
}
```

- **선택지**
  - A: `sumValues([...1, 2, 3])`
  - B: `sumValues([...[1, 2, 3]])`
  - C: `sumValues(...[1, 2, 3])`
  - D: `sumValues([1, 2, 3])`
- **답**: C

스프레드 연산자를 사용해서 배열(`[1, 2, 3]`)이 전개되어 함수 `sumValues()`의 파라미터 `x, y, z`에 대입된다.



### Q118.

```javascript
let num = 1;
const list = ['🥳', '🤠', '🥰', '🤪'];

console.log(list[(num += 1)]);
```

- **선택지**
  - A: `🤠`
  - B: `🥰`
  - C: `SyntaxError`
  - D: `ReferenceError`
- **답**: B



### Q119.

```javascript
const person = {
  firstName: 'Lydia',
  lastName: 'Hallie',
  pet: {
    name: 'Mara',
    breed: 'Dutch Tulip Hound',
  },
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(person.pet?.name);
console.log(person.pet?.family?.name);
console.log(person.getFullName?.());
console.log(member.getLastName?.());
```

- **선택지**
  - A: `undefined` `undefined` `undefined` `undefined`
  - B: `Mara` `undefined` `Lydia Hallie` `undefined`
  - C: `Mara` `null` `Lydia Hallie` `null`
  - D: `null` `ReferenceError` `null` `ReferenceError`
- **답**: 

정답은 B라고 하는데

`Mara` `undefined` `Lydia Hallie` `ReferenceError` 아닌가..?



### Q120.

```javascript
const groceries = ['banana', 'apple', 'peanuts'];

if (groceries.indexOf('banana')) {
  console.log('We have to buy bananas!');
} else {
  console.log(`We don't have to buy bananas!`);
}
```

- **선택지**
  - A: We have to buy bananas!
  - B: We don't have to buy bananas
  - C: `undefined`
  - D: `1`
- **답**: B



### Q121.

```javascript
const config = {
  languages: [],
  set language(lang) {
    return this.languages.push(lang);
  },
};

console.log(config.language);
```

- **선택지**
  - A: `function language(lang) { this.languages.push(lang }`
  - B: `0`
  - C: `[]`
  - D: `undefined`
- **답**: D

접근자 프로퍼티 `language`는 getter를 설정하지 않아 읽을 수 없다.

setter는 값을 설정하는 메소드이기 때문에 `language`에 접근하면 `undefined`를 반환한다.



### Q122.

```javascript
const name = 'Lydia Hallie';

console.log(!typeof name === 'object');
console.log(!typeof name === 'string');
```

- **선택지**
  - A: `false` `true`
  - B: `true` `false`
  - C: `false` `false`
  - D: `true` `true`
- **답**: C

`typeof` 연산자를 사용하면 피연산자의 자료형을 문자열로 반환한다.

따라서 ` typeof name`은 `'string'`을 반환 하지만 앞에 논리 NOT 연산자 `!` 사용했기 때문에 `false`로 평가된다.

`false === 'object'`, `false === 'string'`은 `false`



### Q123.

```javascript
const add = x => y => z => {
  console.log(x, y, z);
  return x + y + z;
};

add(4)(5)(6);
```

- **선택지**
  - A: `4` `5` `6`
  - B: `6` `5` `4`
  - C: `4` `function` `function`
  - D: `undefined` `undefined` `6`
- **답**: A



### Q124.

```javascript
async function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield Promise.resolve(i);
  }
}

(async () => {
  const gen = range(1, 3);
  for await (const item of gen) {
    console.log(item);
  }
})();
```

- **선택지**
  - A: `Promise {1}` `Promise {2}` `Promise {3}`
  - B: `Promise {<pending>}` `Promise {<pending>}` `Promise {<pending>}`
  - C: `1` `2` `3`
  - D: `undefined` `undefined` `undefined`
- **답**: C



### Q125.

```javascript
const myFunc = ({ x, y, z }) => {
  console.log(x, y, z);
};

myFunc(1, 2, 3);
```

- **선택지**
  - A: `1` `2` `3`
  - B: `{1: 1}` `{2: 2}` `{3: 3}`
  - C: `{ 1: undefined }` `undefined` `undefined`
  - D: `undefined` `undefined` `undefined`
- **답**: D



---

```markdown
### Q.

​```javascript

​```

- **선택지**
  - 
- **답**:

```
