# JavaScript Scope

> 스코프(Scope, 유효 범위 ; 적용 범위)

스코프는 식별자가 유효한 범위를 말하고, 자바스크립트 엔진이 식별자를 검색할 때 사용하는 규칙이라고도 할 수 있다.

모든 식별자는 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정된다.



## 전역 스코프와 지역 스코프

변수는 자신이 선언된 위치에 따라서 자신이 유효한 범위(스코프)가 결정된다.

### 전역 스코프(Global Scope)

코드의 가장 바깥 영역, 여기서 선언된 변수는 어디서든 참조 가능한 전역 변수가 된다.

### 지역 스코프(Local Scope)

함수 몸체 내부 또는 코드 블럭, 여기서 선언된 변수는 유효 범위가 한정되어 있는 지역 변수가 된다.  
지역 변수는 자신의 지역 스코프와 하위 지역 스코프에서 유효하다.



## 스코프 체인(Scope chain)

함수가 중첩이 되면, 지역 스코프도 중첩이 되면서 하나의 계층적 구조로 연결된다. 이렇게 스코프가 계층적으로 연결된 것을 스코프 체인이라 하고, 스코프 체인의 최상위에 있는 스코프가 전역 스코프이다.

### 식별자 검색

자바스크립트 엔진은 스코프 체인을 통해 식별자를 찾는다.  
시작하는 스코프에서 부터 상위 스코프 방향으로 이동하며 식별자를 검색한다.

### 하위에서 상위로 일방 통행

하위 스코프에서 상위 스코프로 이동하며 식별자를 검색하는 것은 가능하지만 상위 스코프에서 하위 스코프의 식별자를 검색하는 것은 불가능하다.



> **스코프 체인에 의한 변수 검색**
>
> 변수를 참조할 때 자바스크립트 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 이동하며 선언된 변수를 검색한다.
>
> 상위 스코프에서 유효한 변수는 하위 스코프에서 자유롭게 참조할 수 있지만 하위 스코프에서 유효한 변수를 상위 스코프에서 참조할 수 없다.



## 스코프의 범위

### Function-level scope

함수 내에서 선언된 변수를 함수 내에서만 유효하며 함수 외부에서는 참조할 수 없다.   
즉, 함수 내부에서 선언한 변수는 지역 변수이며 함수 외부에서 선언한 변수는 모두 전역 변수이다.

> `var` 키워드로 선언된 변수를 함수의 코드 블록만을 지역 스코프로 인정한다.

### Block-level scope

코드 블록 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서 참조할 수 없다.

> `let` `const` 키워드로 선언된 변수는 블록 레벨 스코프를 지원한다.



## 스코프의 범위

### Function-level scope

함수 내에서 선언된 변수를 함수 내에서만 유효하며 함수 외부에서는 참조할 수 없다.   
즉, 함수 내부에서 선언한 변수는 지역 변수이며 함수 외부에서 선언한 변수는 모두 전역 변수이다.

> `var` 키워드로 선언된 변수를 함수의 코드 블록만을 지역 스코프로 인정한다.

### Block-level scope

코드 블록 내에서 선언된 변수는 코드 블록 내에서만 유효하며 코드 블록 외부에서 참조할 수 없다.

> `let` `const` 키워드로 선언된 변수는 블록 레벨 스코프를 지원한다.



## 렉시컬 스코프(Lexical Scope)

함수를 어디서 호출했는지가 아니라 함수를 어디서 정의했는지에 따라 상위 스코프를 결정한다.

함수 정의가 평가되는 시점에 자신이 정의된 스코프를 상위 스코프로 결정하고 기억하고, 함수가 호출되면 기억하고 있는 자신이 정의된 스코프를 상위 스코프로 사용한다.

스코프를 결정한뒤 변하지 않기 때문에 정적 스코프(Static Scope)라 부르기도 한다.
