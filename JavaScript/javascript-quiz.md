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
- **필요한 지식**: var 키워드와 let 키워드로 선언된 변수의 스코프, 이벤트 루프, 태스크 큐(이벤트 큐), 

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

