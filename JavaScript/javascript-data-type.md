## 원시 데이터 타입(primitive data type)

`number`, `string`,  `boolean`, `null`, `undefined`  
원시 데이터 타입의 값은 변경 불가능한 값이고 pass-by-value이다.

#### number

: 숫자를 표현, 특수한 값인 `NaN`(Not a Number)도 있다.

#### string

: 큰 따옴표(“) 혹은 작은 따옴표(‘)로 묶인 0개 이상의 문자열을 표현

#### boolean  
: `ture`와 `false`를 표현

#### null 
: `null`을 표현

#### undefined 
: `undefined`를 표현

#### template literal (ES6에서 새로 추가)
: 일반 문자열과 비슷해 보이지만, `‘` 또는 `“` 같은 통상적인 따옴표 문자 대신 백틱(backtick) `` ` ``를 사용한다. 여러 줄에 걸쳐 문자열을 작성할 수 있으며 템플릿 리터럴 내의 모든 공백은 있는 그대로 적용된다.  
(typeof로 확인하면 `string`으로 나온다.)



## 객체 타입(object type / reference type)

`object`  
원시 데이터 타입을 제외한 모든 데이터 타입은 객체이다.
