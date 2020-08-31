---
title: JavaScript immutable value vs. mutable value
emoji: ✨
tags:
  - JavaScript
---

# immutable value vs. mutable value



|   Primitive Type    |           Object Type            |
| :-----------------: | :------------------------------: |
|   immutable value   |          mutable value           |
| 변수에 실제 값 저장 | 변수에 참조 값(메모리 주소) 저장 |
|    Pass by value    |        Pass by reference         |



## immutable value

Primitive Type의 값은 불변성을 가진 immutable value이기 때문에 재할당 만이 값을 변경할 수 있고, pass-by-value로 값을 복사한다. 이러한 특징들을 통해 값의 신뢰성을 보장한다.



### Primitive Type

원시 타입의 값, **Primitive Type은 변경 불가능한 값(immutable value)** 이다.



### 불변성(immutability)

**변수에 원시 값을 재할당하면 이전에 참조하고 있던 메모리 공간을 버리고 새로운 원시 값을 참조하게 된다.**

불변성을 갖는 값을 할당한 변수는 재할당 외에 변수 값을 변경할 수 없다.  
변경 불가능하다는 것은 재할당할 수 없다는 것과는 다르고 값이 저장되어 있는 메모리 공간을 직접 수정할 수 없다는 것이다. 

> 자바스크립트에서는 문자열도 원시타입이므로 문자열이 생성된 후 변경할 수 없다. 자바스크립트에서 문자열은 유사 배열이므로 인덱스를 사용해 각 문자에 접근할 수 있지만 하나의 문자열을 변경한다고 해서 반영되지 않고 에러도 발생하지 않는다.
>
> ```javascript
> var str = 'string';
> 
> console.log(str[0]); // s
> 
> str[0] = 'm';
> 
> console.log(str); // string
> 
> ```



### Pass by value (값에 의한 전달)

**Primitive Type은 원본을 수정하지 않고 값을 복사해서 전달한다.**

'변수'에 '원시값을 갖는 변수'를 할당할 때, '할당 받는 변수'에 '할당되는 변수'의 '원시값 자체'를 '복사해 새로 할당한 메모리 주소'를 전달한다. 원시 값을 갖는 변수들은 각각 다른 메모리 공간을 가리킨다.

> 위의 설명을 아래의 코드에 빗대 써보면, `copyNum`에 `originNum`를 할당할 때, `copyNum`에 `originNum`의 `1`를 '복사해 새로 할당한 메모리 주소'를 전달한다.

```javascript
var originNum = 1; // 원본

var copyNum = originNum; // 복사본

copyNum = 2; // 복사한 변수의 값을 재할당

// originNum과 copyNum은 서로 독립적인 값이므로 원본(originNum)은 변경되지 않았다.
console.log(originNum); // 1
console.log(copyNum); // 2

```





## mutable value

Object Type의 값은 변경 가능한 mutable value이기 때문에 값이 변경될 수 있고, pass-by-referece로 값을 복사한다.



### Object Type

객체 타입의 값, **Object Type은 변경 가능한 값(mutable value)** 이다.



### Pass by Reference (참조에 의한 전달)

**객체 값을 복사받은 변수들은 하나의 메모리 공간을 참조하게 된다.** 변수에 객체 값을 갖는 변수를 할당할 때 할당되는 변수의 메모리 주소만 복사되어 전달된다.

객체 타입은 원시 타입과는 다르게 재할당 뿐만 아니라 다른 영향으로도 값이 변할 수 있다.  
복사 한 변수와 원본 변수는 같은 메모리 공간을 참조하기 때문에 **복사한 변수의 값을 수정하면 원본의 값 또한 같이 변경 된다.** 

```javascript
var originArr = [1, 2, 3, 4]; // 원본 배열

var copyArr = originArr; // 원본 배열 복사

// 복사한 배열에서 마지막 요소 제거
copyArr.pop(); // 4

// 복사한 배열만을 수정하였는데 원본 배열도 같이 변경 되었다.
console.log(originArr); // [1, 2, 3]
console.log(copyArr); // [1, 2, 3]

```

'변경 가능한 값이 할당 된 변수'를 수정 하면, '해당 변수를 참조하고 있는 모든 변수'들에 영향을 끼친다.

이렇게 값을 복사 할때 해당 변수가 가진 값 자체를 복사하는 것이 아니라 참조만을 전달해 복사 하는 것을 pass-by-reference라고 한다. 이런 특성 때문에 Object Type을 참조 타입(reference type)이라고 부르기도 한다.



### 객체 타입의 값을 다룰때 주의해야 하는 것

위에서 살펴 본 것 처럼 reference type을 다룰때 원본의 값도 같이 변경 되는 것을 피하기 위해 깊은 복사(Deep copy)하여 다루는 것이 좋다.

JavaScript 라이브러리에서 제공하는 고차 함수 중에 원본 배열에 영향을 주지 않고 새로운 배열을 반환하는 메서드를 사용해도 좋고, ES6 부터 지원하는 스프레드 문법을 사용해도 된다.

```javascript
// 원본 배열
const originArr = [1, 2, 3, 4];

// 원본 배열 복사
let copyArr = [...originArr];

// 복사한 배열에서 마지막 요소 제거
copyArr.pop(); // 4

// 원본 배열에 영향이 없다.
console.log(originArr); // [1, 2, 3, 4]
console.log(copyArr); // [1, 2, 3]

```

또한 깊고 복잡한 구조를 가진 객체를 다룰 때에는 더 주의해야 한다. 
(예: 스프레드 연산자 만으로는 Shallow copy만 이루어 진다)





## Shallow copy와 Deep copy

객체를 프로퍼티 값으로 갖는 객체의 경우, 얕은 복사는 한 단계까지만 복사하는 것을 말하고 깊은 복사는 객체에 중첩되어 있는 객체까지 모두 복사하는 것을 말한다. 얕은 복사와 깊은 복사로 생성된 객체는 원본과는 다른 객체이다. 

즉, 원본과 복사본은 참조값이 다른 별개의 객체이다. 하지만 얕은 복사는 객체에 중첩되어 있는 객체의 경우, 참조값을 복사하고 깊은 복사는 객체에 중첩되어 있는 객체까지 모두 복사하여 원시 값처럼 완전한 복사본을 만든다는 차이가 있다.





## 퀴즈

Q. deep copy와 pass by value의 연관성

- A.  
  원시 값은 신뢰성을 보장하기 위해 값을 복사해서 전달한다. 이러한 과정을 pass by value라 하는데 이때 값을 복사하는 것을 deep copy라고 한다.


