# TypeScript Interface

`interface` 키워드를 사용해 값이 특정한 형태(shape)를 갖도록 제약할 수 있다. 인터페이스에 선언된 프로퍼티 또는 메소드의 구현을 강제하여 일관성을 유지할 수 있도록 하는 것이다. 이는 여러가지 타입을 갖는 프로퍼티로 이루어진 새로운 타입을 정의하는 것과 유사하다.



## 덕 타이핑 (Duck Typing)

TypeScript는 객체가 특정 인터페이스에서 정의한(명시하는) 프로퍼티나 메소드를 가지고 있다면 해당 객체가 그 인터페이스를 구현한 것으로 인정한다. 인터페이스를 활용하면 덕 타이핑을 할 때 메소드를 검사하지 않고도 런타임 에러를 막을 수 있다.

> **덕 타이핑(duck typing)** / **구조적 타이핑(structural typing)**
>
> [동적 타이핑](https://ko.wikipedia.org/wiki/동적_타이핑)의 한 종류로, 객체의 변수 및 메소드의 집합이 객체의 타입을 결정하는 것을 말한다. 클래스 상속이나 인터페이스 구현으로 타입을 구분하는 대신, 덕 타이핑은 객체가 어떤 타입에 걸맞은 변수와 메소드를 지니면 객체를 해당 타입에 속하는 것으로 간주한다.
>
> *[덕 타이핑 - 위키백과](https://ko.wikipedia.org/wiki/덕_타이핑)*

strict하게 타이핑을 하고 싶다면 `implements` 키워드를 사용하여 명시적으로 선언해주는 것도 좋은 방법이다.





## 인터페이스와 프로퍼티 타입 정의

```typescript
// 인터페이스 정의
interface InterfaceName {
  key: string; // 프로퍼티 타입 정의
}
```





## 선택적 프로퍼티 (Optional Properties)

프로퍼티 이름 끝에 `?`를 붙여 Optional Properties로 선언 할 수 있다.  
선택적으로 사용 가능한 프로퍼티를 만들면서 인터페이스에 속하지 않는 프로퍼티의 사용을 방지 할 수 있다.

```typescript
interface User {
  name: string;
  age?: number; // optional property
}
```

선택적 사용 가능한 프로퍼티를 쉽게 파악할 수 있어 코드의 가독성이 좋아진다.





## 읽기전용 프로퍼티 (Readonly Properties)

프로퍼티 이름 앞에 `readonly` 키워드로 객체가 처음 생성될 때만 수정 가능하게는 리드온리 프로퍼티로 선언 할 수 있다.  
생성하면서 할당 한 값은 **재할당이 불가능해 진다.** Type assertion으로 오버라이드하는 것은 가능하다.

```typescript
interface User {
  readonly name: string;
  age: number;
}
```





## 변수 인터페이스

인터페이스를 타입으로 선언한 변수는 해당 인터페이스를 준수하여야 한다.

```typescript
// 인터페이스의 정의
interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

// 변수 todo의 타입으로 Todo 인터페이스를 선언하였다.
let todo: Todo;

// 변수 todo는 Todo 인터페이스를 준수하여야 한다.
todo = { id: 1, content: 'typescript', completed: false };

```





## 색인가능 타입 (Indexable Types)

Indexable type은 인덱스 시그니처(index signature)를 사용해 **동적이면서** **색인 가능한(indexable) 객체의 타입을 정의**할 수 있고, **문자열 또는 숫자**만 사용 가능하다. `readonly` 키워드로 색인 역시 읽기 전용으로 선언할 수 있다.

> **인덱스 시그니처 (Index signature)**
>
> 인덱서블 타입을 정의하기 위해 색인에 접근할 때 사용하는 기호인 대괄호 `[]`를 이용해 Indexable하게 만들어 준다.  
> `[INDEXER_NAME: INDEXER_TYPE]: RETURN_TYPE`
>
> ```typescript
> interface Indexable {
>   [key: string]: any; // index signature
> }
> ```



### 괄호 표기법으로 동적인 키 값을 사용하여 접근하려는 경우

TypeScript에서 괄호 표기법으로 동적인 키 값을 사용하여 접근하려는 경우, 어떤 타입의 프로퍼티에 접근하는 지 알 수 없기 때문에 리턴 값을 암묵적으로 `any` 타입으로 변환하면서 에러를 발생시킨다. 이렇게 코드의 실행 시점에서만 알 수 있는 이름의 동적 속성을 갖는 타입을 표시할때 사용 할 수 있다.



### 색인의 타입으로 문자열 색인과 숫자 색인이 모두 존재하는 경우

색인의 타입으로 문자열 색인과 숫자 색인이 모두 존재하는 경우 **숫자로 색인 된 값의 타입은 문자열로 색인 된 값 타입의 서브타입이어야 한다.**

```typescript
// B는 A의 서브타입이어야 한다.
interface Mixed <A, B> {
  [stringIndex: string]: A;
  [numberIndex: number]: B;
}
```

이러한 제약이 존재하는 이유는 **자바스크립트 색인의 동작 방식** 때문이다. 자바스크립트 코드에서 객체의 색인에 접근할 때, 내부적으로는 색인의 `toString()` 메소드를 호출해 문자열로 변형된 값을 색인으로 사용한다.



> ### 인덱서블 타입의 사용 예
>
> 만약 색인 가능 타입이 없이 `T` 타입의 원소를 갖는 `Array` 인터페이스를 작성한다면 대략 아래와 같은 식으로 모든 색인에 대한 타입을 일일이 정의해야 할 것이다.
>
> ```typescript
> interface Array<T> {
>   length: number;
>   0?: T;
>   1?: T;
>   /* ... */
>   Number.MAX_SAFE_INTEGER?: T;
>   /* 메소드 정의 */
> } 
> ```
>
> 인덱스 타입을 이용하면 위 코드를 다음처럼 간결하게 대체할 수 있다.
>
> ```typescript
> interface Array<T> {
>   length: number;
>   [index: number]?: T;
>   /* 메소드 정의 */
> }
> ```





## 함수 파라미터의 인터페이스

인터페이스를 사용하여 함수 파라미터의 타입을 선언 할 수 있다. 해당 함수에는 함수 파라미터의 타입으로 지정한 인터페이스를 준수하는 인수를 전달하여야 한다. 이는 함수에 객체를 전달할 때 복잡한 매개변수 체크가 필요없어서 매우 유용하다.

```typescript
// 인터페이스의 정의
interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

let todos: Todo[] = [];

// 파라미터 todo의 타입으로 Todo 인터페이스를 선언하였다.
function addTodo(todo: Todo) {
  todos = [...todos, todo];
}

// 파라미터 todo는 Todo 인터페이스를 준수하여야 한다.
const newTodo: Todo = { id: 1, content: 'typescript', completed: false };
addTodo(newTodo);
console.log(todos)
// [ { id: 1, content: 'typescript', completed: false } ]

```





## 함수 타입 (Function Types)

인터페이스는 함수의 타입으로 사용할 수 있다. *함수 인터페이스를 구현하는 함수* 는 인터페이스를 준수하여야 한다.  
호출 시그니처(call signature)로 함수의 인터페이스에 타입이 선언된 파라미터 리스트와 리턴 타입을 정의한다.

> **호출 시그니처(Call signature)**
>
> 식별자 없이, 받아야할 인자의 타입과, 리턴 타입만을 표기하면 된다.
>
> `(PARAMETER1: PARAM1_TYPE, PARAMETER2: PARAM2_TYPE, ...): RETURN_TYPE`
>
> ```typescript
> interface Callable {
>   (key: string): any // call signature
> }
> ```

```typescript
// 함수 인터페이스의 정의
interface SquareFunc {
  (num: number): number; // call signature
}

// 함수 인테페이스를 구현하는 함수는 인터페이스를 준수하여야 한다.
const squareFunc: SquareFunc = function (num: number) {
  return num * num;
};

console.log(squareFunc(10)); // 100

```

함수 정의와 인터페이스에서의 매개변수 이름은 꼭 같을 필요는 없고 매개변수의 타입 순서만 맞는다면 에러는 발생하지 않는다.





## 하이브리드 타입 (Hybrid Types)

콜 시그니처와 프로퍼티 타입 정의를 동시에 갖는 인터페이스를 **하이브리드 타입(hybrid type)**이라 부른다.

호출 가능(callable) 하면서 동시에 추가적으로 여러 속성을 갖는 객체가 존재할 수 있고, 이런 객체의 타입을 표현하기 위해 콜 시그니쳐와 프로퍼티 타입 정의를 동시에 사용 할 수 있다.

```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

위의 `Counter` 타입의 값은 함수로서 호출 할 수 있고, 따라서 호출 시그니쳐를 갖는다. 이 인터페이스는 추가적으로 `interval`과 `reset` 이라는 속성을 가진다. 따라서 인터페이스는 해당 속성의 타입 정보 또한 포함한다.





## 클래스 타입 (Class Types)

클래스 선언문의 `implements` 뒤에 인터페이스를 사용하면 해당 클래스는 지정된 인터페이스를 반드시 구현하여야 한다.  
인터페이스는 프로퍼티와 메소드를 가질 수 있다는 점에서 클래스와 유사하나 **직접 인스턴스를 생성할 수는 없다.**

```typescript
// 인터페이스의 정의
interface ITodo {
  id: number;
  content: string;
  completed: boolean;
}

// Todo 클래스는 ITodo 인터페이스를 구현하여야 한다.
class Todo implements ITodo {
  constructor (
    public id: number,
    public content: string,
    public completed: boolean
  ) { }
}

const todo = new Todo(1, 'Typescript', false);

console.log(todo);

```



### 인터페이스의 추상 메소드

인터페이스는 프로퍼티뿐만 아니라 메소드도 포함할 수 있다. 단, **모든 메소드는 추상 메소드이어야 한다.**  
*인터페이스를 구현하는 클래스*는 인터페이스에서 **정의한 프로퍼티와 추상 메소드를 반드시 구현**하여야 한다.

```typescript
// 인터페이스의 정의
interface IPerson {
  name: string;
  sayHello(): void;
}

/*
인터페이스를 구현하는 클래스는 인터페이스에서 정의한 프로퍼티와 추상 메소드를 반드시 구현하여야 한다.
*/
class Person implements IPerson {
  // 인터페이스에서 정의한 프로퍼티의 구현
  constructor(public name: string) {}

  // 인터페이스에서 정의한 추상 메소드의 구현
  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}

function greeter(person: IPerson): void {
  person.sayHello();
}

const me = new Person('Lee');
greeter(me); // Hello Lee

```

클래스 타입은 *인터페이스를 구현하는 클래스*의 **일관성을 유지**할 수 있는 장점을 갖는다.  





## 인터페이스 확장

인터페이스는 `extends` 키워드를 사용하여 인터페이스 또는 클래스를 확장할(상속 받을) 수 있다.

```typescript
interface Person {
  name: string;
  age?: number;
}

interface Student extends Person {
  grade: number;
}

const student: Student = {
  name: 'Lee',
  age: 20,
  grade: 3
};

```



### 다수의 인터페이스 동시 확장

인터페이스는 동시에 하나 이상의 인터페이스를 확장(상속)할 수 있다. 확장 대상이 되는 인터페이스들은 `,`으로 구분한다.

```typescript
interface Person {
  name: string;
  age?: number;
}

interface Developer {
  skills: string[];
}

// 모든 확장 대상 인터페이스의 속성에 자신의 속성을 더한 타입을 갖는다.
interface WebDeveloper extends Person, Developer {}

const webDeveloper: WebDeveloper =  {
  name: 'Lee',
  age: 20,
  skills: ['HTML', 'CSS', 'JavaScript']
};

```

확장 대상인 인터페이스 중 여러 인터페이스가 같은 이름의 속성을 가질 수 있지만 **이름이 겹치는 속성의 타입은 모든 확장 대상 인터페이스에서 같아야 한다**. 같은 이름의 속성이 다른 타입을 갖는 경우 타입 에러가 발생한다.



### 클래스를 확장한 인터페이스

인터페이스는 인터페이스 뿐만 아니라 클래스도 확장(상속)할 수 있다.  
클래스의 모든 멤버(public, protected, private)가 상속되지만 구현까지 상속하지 않는다.

```typescript
class Person {
  constructor(public name: string, public age: number) {}
}

// 인터페이스의 클래스 상속
interface Developer extends Person {
  skills: string[];
}

const developer: Developer =  {
  name: 'Lee',
  age: 20,
  skills: ['HTML', 'CSS', 'JavaScript']
};

```





## 요약

- 인터페이스에 선언된 프로퍼티 또는 메소드의 **구현을 강제하여 일관성을 유지**할 수 있다.
- 인터페이스를 **타입으로 사용하면 해당 인터페이스가 가진 프로퍼티를 반드시 구현**해야한다.
- `?`를 프로퍼티 이름 끝에 붙여 **강제화 하지 않는 옵셔널 프로퍼티**도 표현 가능하다.
- `readonly` 키워드를 사용해서 **재할당이 불가능한 읽기전용 프로퍼티** 표현 할 수 있다. (`const` '비슷' 하다)
- 인덱서블 타입은 인덱스 시그니처를 사용해 **동적이고 색인 가능한 객체 타입을 정의**한 것 이다.
- 함수 타입은 호출 시그니처를 사용해 **타입이 선언된 파라미터 리스트와 리턴 타입을 정의**한 것 이다.
- **호출 시그니처와 프로퍼티 타입 정의를 동시에 갖는 인터페이스**를 하이브리드 타입(hybrid type)라 한다.
- `implements` 뒤에 인터페이스를 사용하면 **해당 클래스는 지정된 인터페이스를 반드시 구현**하여야 한다.
- 인터페이스는 메소드도 포함 할 수 있지만, **추상 메소드이어야 한다.**
- 인터페이스는 프로퍼티와 메소드를 가질 수 있다는 점에서 클래스와 유사하나 **직접 인스턴스를 생성할 수는 없다.**
- 인터페이스는 `extends` 키워드를 사용하여 **인터페이스 또는 클래스를 상속** 받을 수 있고, **다수의 인터페이스를 동시에 상속** 받을 수도 있다.



### 한 줄 요약

인터페이스는 일반적으로 타입 체크를 위해 사용되며 변수, 함수, 클래스에 사용할 수 있고, 여러가지 타입을 갖는 프로퍼티로 이루어진 새로운 타입을 정의하는 것과 유사하다.





## reference

[타입스크립트: 핸드북 - 인터페이스](https://typescript-kr.github.io/pages/Interfaces.html) / [TypeScript: Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)  
(다듬기는 했지만 번역기를 사용한 듯한 문장이 많으니 원본과 같이 읽는게 좋다)

[TypeScript - Interface | PoiemaWeb](https://poiemaweb.com/typescript-interface)

[4.1 인터페이스 기초 - ts-for-jsdev](https://ahnheejong.gitbook.io/ts-for-jsdev/04-interface-and-class/interface-basics)

[TypeScript: 인터페이스(Interface) | DailyEngineering](https://hyunseob.github.io/2016/10/17/typescript-interface/)

[한눈에 보는 타입스크립트(updated) | HEROPY](https://heropy.blog/2020/01/27/typescript/)

