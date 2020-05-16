# 자바스크립트의 데이터 타입

코드에서 사용하는 **모든 데이터는 메모리에 저장하고 참조할 수 있어야 한다.** 
Data type은 데이터를 메모리에 저장할 때 확보해야 하는 메모리 공간의 크기와 할당할 수 있는 유요한 값에 대한 정보, 그리고 메모리에 저장되어 있는 2진수 데이터를 어떻게 해석할 지에 대한 정보를 컴퓨터와 개발자에게 제공한다.

**데이터 타입은 한정된 메모리 공간을 효율적으로 사용하기 위해**서, 그리고 2진수 데이터로 **메모리에 저장된 데이터를 다양한 형태로 사용하기 위해 존재**한다.

개발자는 명확한 의도를 가지고 타입을 구별하여 값을 만들고 javascript엔진은 타입을 구별하여 값을 취급해야 한다.



## 원시 데이터 타입(Primitive data type)

`number` `string`  `boolean` `null` `undefined` `symbol` 
원시 데이터 타입의 값은 Immutable value(변경 불가능한 값)이고 pass-by-value이다.



### number

숫자를 표현, 정수와 실수 구분없이 하나의 숫자 타입(실수)만 존재한다.  
특수한 값인 `NaN`(Not a Number)도 있다.



### string

큰 따옴표(“) 혹은 작은 따옴표(‘)로 묶인 0개 이상의 문자열을 표현

#### template literal (ES6에서 추가)

일반 문자열과 비슷해 보이지만, `‘` 또는 `“` 같은 통상적인 따옴표 문자 대신 백틱(backtick) `` ` ``를 사용한다. 여러 줄에 걸쳐 문자열을 작성할 수 있으며 템플릿 리터럴 내의 모든 공백은 있는 그대로 적용된다.  
(typeof로 확인하면 `string`으로 나온다)



### boolean

논리적 `ture`와 `false`를 표현



### null

`null`을 표현, 값이 없다는 것을 의도적으로 명시할 때 사용된다.



### undefined

`undefined`를 표현



### symbol (ES6에서 추가)

이름의 충돌 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용된다.  
심볼 이외의 원시값은 리터럴을 통해 생성하지만 심볼은 Symbol 함수를 호출해 생성한다.  
생성된 심볼 값은 노출되지 않으며 다른 값과 절대 중복되지 않는 유일무이한 값이다.



## 객체 타입(Object type / Reference type)

`object`(array, function, regular expression)

### [object](./javascript-object.md)

원시 데이터 타입을 제외한 모든 값은 객체이며, mutable value(변경 가능한 값)이고 pass-by-reference이다.



---



## 퀴즈

Q. deep copy와 pass by value의 연관성

- A.  
  원시 값은 신뢰성을 보장하기 위해 값을 복사해서 전달한다. 이러한 과정을 pass by value라 하는데 이때 값을 복사하는 것을 deep copy라고 한다.