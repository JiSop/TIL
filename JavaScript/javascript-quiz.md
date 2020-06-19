# JavaScript Quiz

문제의 이름과 해설은 내 마음대로 작성하였다.

퀴즈 출처: [lydiahallie/javascript-questions](https://github.com/lydiahallie/javascript-questions/blob/master/ko-KR/README-ko_KR.md)





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

