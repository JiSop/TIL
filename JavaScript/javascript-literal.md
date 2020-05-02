# Literal

> The literal meaning of a word is its original,basic meaning [[1]](https://dictionary.cambridge.org/dictionary/english/literal)  
> (어구의 뜻이) 문자 그대로의[기본적인/일반적인] [[2]](https://endic.naver.com/enkrEntry.nhn?sLn=kr&entryId=8f3674f867e2428f834ef86b13bfb413)

리터럴의 사전적 의미는 문자 자체의, 문자 그대로의, 기본적인 의미를 말한다.  
컴퓨터 과학에서는 리터럴이란 이 처럼(사전적 의미와 같이) 소스 코드에서 직접적으로 값이 표현된 것 이다. 그래서 코드상에서 데이터 값을 표현하는 방식(리터럴 표기법)이라고 말하기도 한다.



## 리터럴 표기법, 리터럴 표현식  

#### 리터럴 표기법 
: 값을 생성하는 가장 기본적인 방법으로 자바스크립트에서 사용할 수 있는 다양한 타입의 값을 생성할 수 있다.

#### 리터럴 표현식

: 리터럴 표기법으로 만들어낸 표현식



## 리터럴 타입(literal type)
리터럴 타입이라는 것이 따로 있다기 보다는 리터럴 표기법으로 데이터 타입을 표현한다고 생각하면 된다.

```javascript
123 // number literal
'string' // string literal
true, false // boolean literal
null // null literal
undefined // undefined literal
{} // object literal
```



## 리터럴(literal)과 상수(constant)

> 리터럴: 소스코드 안에서 직접 만들어 낸 상수 값 자체를 말하며 값을 구성하는 최소 단위 [[3]](https://poiemaweb.com/js-syntax-basics)

위에서 말하는 '상수 값 자체'라는것은 일반적으로 말하는 **변수**의 반대 개념이 아니다.  
**코드 안에서 직접 표현되어 있는 값 그 자체가 리터럴**이다. literally!



## 리터럴(literal)과 값(value)
그렇다면 리터럴과 값은 같은 것일까?  

> 컴퓨터 과학에서, **값**은 더 이상 평가될 수 없는 **하나의 식**이다. [[4]](https://ko.wikipedia.org/wiki/%EA%B0%92_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99))  

리터럴 표현식이 평가되어 값이 될 수 있지만 값이 리터럴은 아니다.  
값은 값이고 리터럴은 리터럴이다.

![tibetFox](./img/tibetFox.jpeg)



## 리터럴(literal)과 변수(variable)

JavaScript에서 변수는 타입 지정 없이 선언 하고 값으로서 평가 될 수 있는 것을 할당 할수 있다.
리터럴은 값으로서 평가 될 수 있으니 변수에 할당이 가능하다.

```mermaid
graph LR
A[리터럴 표현식] --> B[표현식을 평가]
    B --> C[값으로 변환]
    C --> D[변화된 값을 변수에 할당]
```
![var](./img/litovar.png)

<center>리터럴이 변수에 할당되는 간략한 과정</center>
