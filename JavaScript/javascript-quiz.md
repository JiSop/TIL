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

`sayHi()` 함수가 실행 되면서 `var` 키워드로 선언된 변수 `name`은 호이스팅이 발생하면서 초기화 단계가 실행 되고 `undefined` 값을 가진 상태가 된다. 변수 `age` 또한 호이스팅에 의해 선언되지만 `let` 키워드로 선언되었기에 초기화 단계는 이루어지지 않는다. L2, 변수 `name`을 출력 하지만 값은 아직 `undefined`이므로 undefined가 출력 된다. L3, 변수 `age`는 아직 초기화 단계가 이루어지지 않아 참조할 수 없기 때문에 ReferenceError가 발생한다. L4, 변수 `name`에 문자열 값 `"Lydia"`를 할당한다. L5, 변수 `age` 초기화가 이루어지고 숫자 값 `21`을 할당한다.

1. `sayHi()` 함수 실행

2. 변수 `name`이 호이스팅 되면서 선언, 초기화 되고 `undefined` 할당

   > `var` 키워드로 선언 되었기 때문에 호이스팅이 발생하면서 선언과 초기화가 이루어 진다. 

3. 변수 `age`가 호이스팅 되면서 선언되지만 초기화는 이루어지지 않는다.

   > `let` 키워드로 선언 되었기 때문에 초기화가 이루어지지 않는다.

4. `console.log(name)` 실행, undefined 출력

   >  변수 `name`의 값은 아직 초기화만 이루어 졌기 때문에 `undefined`이다.

5. `console.log(age)` 실행, ReferenceError(참조 에러) 발생

   > 변수 `age`는 아직 초기화가 이루어지지 않아, TDZ에 있기 때문에 참조할 수 없다.

6. `var name = "Lydia"` 실행

   > 변수 `name`에 string 타입의 값 `"Lydia"` 할당

7. `let age = 21` 실행

   > 변수 `age` 초기화, number 타입의 값 `21` 할당


