---
title: Parameter and Argument
emoji: 🤔
tags:
  - Computer Science
---


# 매개변수(Parameter)와 전달인자(Argument)

> 종종 매개변수(parameter)와 전달인자(argument)는 적당히 섞어서 쓰이기도 하는데, 이 경우 문맥에 따라 의미를 달리해서 해석되기도 한다.
>
> [매개변수 (컴퓨터 프로그래밍) - 위키백과](https://ko.wikipedia.org/wiki/매개변수_(컴퓨터_프로그래밍))

위키 백과에서도 언급하듯, 적당히 섞어 써서 헷갈리기 쉽다.



## 매개변수(Parameter)

```javascript
// 함수 logger는 param1, param2을 매개변수로 가지고 있다.
function logger(param1, param2) {
	return console.log(param1, param2);
}
```

일반적으로 함수에 전달되는 값을 받아드리는 변수, 전달인자(argument)를 받아드리는 변수를 말한다.

보통 '인자'라고 부르기도 하지만 '인수'라고 표현할 때도 있다.

- 매개변수
- 인자·인수
- 파라미터





## 전달인자(Argument)

```javascript
function logger(param1, param2) {
	return console.log(param1, param2);
}

// 함수 logger는 첫 번째 매개변수인 param1에 문자열 'argument'를 전달 받고, 두 번째 매개변수 param2에 숫자형 1을 전달 받는다.
logger('argument', 1); // argument 1
```

일반적으로 함수에 전달되는 값, 매개변수(parameter)에 전달되는 실제 값을 말한다.

보통 '인수'라고 부르기도 하지만 '인자'라고 표현할 때도 있다.

- 전달인자
- 인수·인자
- 아규먼트



## 솔직히 말하자면

알아서 찰떡 같이 알아들어야 한다.

값을 말하고자 하는것 같다면 전달인자, 값을 가르키는 변수·식별자를 말하고자 하는것 같다면 매개변수이다.

parameter는 매개변수인데 '인자'라고 지칭할 때가 많고, argument는 전달인자인데 '인수'라고 부르고 그냥 '인자'라고 부르기도 한다. 그러니 문맥에서 값 자체를 말하고자 하는지, 값을 가르키는 변수를 말하고자 하는지 파악하는 수 밖에 없다.

공부한걸 정리할 때 인자·인자 보다는 매개변수·전달인자로 구분해서 써보는 것을 추천한다. 

개인적으로는 그냥 영어발음 그대로 파라미터, 아규먼트라고 읽는게 편한것 같다.



## 정리

- 매개변수(Parameter): 변수
- 전달인자(Argument): 값
- 문맥에 따라 알아들어야 한다.
- 헷갈리는건 어쩔 수 없다. 괜히 집착하지 말자
