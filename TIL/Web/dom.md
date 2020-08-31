# DOM(Document Object Model)

객체로 문서 구조를 표현하는 방법으로 XML이나 HTML로 작성한다. 

브라우저는 웹 문서를 로드한 후, 파싱하여 DOM을 생성한다.

트리 형태이기 때문에 특정 노드를 찾아 수정, 제거하거나 원하는 위치에 삽입할 수 있다.

웹 브라우저는 DOM을 활용하여 객체에 자바스크립트와 CSS를 적용한다.

HTML 자체적으로는 정적이기 때문에 동적 UI에 최적화가 되어있지 않다. 자바스크립트를 사용하여 이를 동적으로 만들 수 있다.

### DOM이 담당하는 두 가지 기능

* **HTML 문서에 대한 모델 구성 :**
  브라우저는 HTML문서를 로드한 후 해당 문서에 대한 모델을 메모리에 생성한다. 이때 모델은 객체의 트리로 구성되는데 이것을 DOM tree라 한다.

* **HTML 문서 내의 각 요소에 접근 / 수정 :**
  DOM은 모델 내의 각 객체에 접근하고 수정할 수 있는 프로퍼티와 메소드를 제공한다. DOM이 수정되면 브라우저를 통해 사용자가 보게 될 내용 또한 변경된다.



## DOM tree

DOM tree는 브라우저가 HTML 문서를 로드한 후 생성하는 모델을 의미하는데 객체의 트리로 구조화되어 있기 때문에 DOM tree라 부른다.

### DOM tree의 노드 구성

* **문서 노드(Document Node)**
  트리의 최상위에 존재하며 각각 요소, 어트리뷰트, 텍스트 노드에 접근하려면 문서 노드를 통해야 한다. 즉 DOM tree에 접근하기 위한 시작점(entry point)이다.

* **요소 노드(Element Node)**
  요소 노드는 HTML 요소를 표현한다. HTML 요소는 중첩에 의해 부자 관계를 가지며 이 부자 관계를 통해 정보를 구조화한다. 따라서 요소 노드는 문서의 구조를 서술한다고 말 할 수 있다. 어트리뷰트, 텍스트 노드에 접근하려면 먼저 요소 노드를 찾아 접근해야 한다. 모든 요소 노드는 요소별 특성을 표현하기 위해 HTMLElement 객체를 상속한 객체로 구성된다.

* **어트리뷰트 노드(Attribute Node)**
  어트리뷰트 노드는 HTML 요소의 어트리뷰트를 표현한다. 어트리뷰트 노드는 해당 어트리뷰트가 지정된 요소의 자식이 아니라 해당 요소의 일부로 표현된다. 따라서 해당 요소 노드를 찾아 접근하면 어트리뷰트를 참조, 수정할 수 있다.

* **텍스트 노드(Text Node)**
  텍스트 노드는 HTML 요소의 텍스트를 표현한다. 텍스트 노드는 요소 노드의 자식이며 자신의 자식 노드를 가질 수 없다. 즉 텍스트 노드는 DOM tree의 최종단이다.



## DOM Query / Traversing (요소에의 접근)

### 하나의 요소 노드 선택(DOM Query)

- `document.getElementById(id)`
  - id 어트리뷰트 값으로 요소 노드를 한개 선택한다. 복수개가 선택된 경우, 첫번째 요소만 반환한다.
  - Return: HTMLElement를 상속받은 객체
  - 모든 브라우저에서 동작

- `document.querySelector(cssSelector)`
  - CSS 셀렉터를 사용하여 요소 노드를 한개 선택한다. 복수개가 선택된 경우, 첫번째 요소만 반환한다.
  - Return: HTMLElement를 상속받은 객체
  - IE8 이상의 브라우저에서 동작

### 여러개의 요소 노드 선택(DOM Query)

- `document.getElementsByClassName(class)`
  - class 어트리뷰트 값으로 요소 노드를 모두 선택한다. 공백으로 구분하여 여러개의 class를 지정할 수 있다.
  - Return: HTMLCollection (live)
  - IE9 이상의 브라우저에서 동작
    *getElementsByClassName* 메소드의 반환값은 HTMLCollection이다. 이것은 반환값이 복수인 경우, HTMLElement의 리스트를 담아 반환하기 위한 객체로 배열과 비슷한 사용법을 가지고 있지만 배열은 아닌 유사배열(array-like object)이다. 또한 HTMLCollection은 실시간으로 Node의 상태 변경을 반영한다. (live HTMLCollection)

*HTMLCollection는 실시간으로 Node의 상태 변경을 반영하기 때문에 loop가 필요한 경우 주의가 필요하다.* 
아래와 같은 방법으로 이를 회피할 수 있다.

  - 반복문을 역방향으로 돌린다.
  - while 반복문을 사용한다. 이때 elems에 요소가 남아 있지 않을 때까지 무한반복하기 위해 index는 0으로 고정시킨다.
  - HTMLCollection을 배열로 변경한다.
  - querySelectorAll 메소드를 사용하여 HTMLCollection(live)이 아닌 NodeList(non-live)를 반환하게 한다.

- `document.getElementsByTagName(tagName)`
  - 태그명으로 요소 노드를 모두 선택한다.
  - Return: HTMLCollection (live)
  - 모든 브라우저에서 동작

- `document.querySelectorAll(selector)`
  - 지정된 CSS 선택자를 사용하여 요소 노드를 모두 선택한다.
  - Return: NodeList (non-live)
  - IE8 이상의 브라우저에서 동작

### DOM Traversing (탐색)

- [parentNode](https://developer.mozilla.org/ko/docs/Web/API/Node/parentNode)
  - 부모 노드 탐색
  - HTMLElement를 상속받은 객체 반환
- [firstChild](https://developer.mozilla.org/ko/docs/Web/API/Node/firstChild), [lastChild](https://developer.mozilla.org/ko/docs/Web/API/Node/lastChild), [firstElementChild](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/firstElementChild), [lastElementChild](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/lastElementChild)
  - 자식 노트 탐색
  - HTMLElement를 상속받은 객체 반환
- [hasChildNodes()](https://developer.mozilla.org/ko/docs/Web/API/Node/hasChildNodes)
  - 자식 노드가 있는지 확인
  - Boolean 반환
- [childNodes](https://developer.mozilla.org/ko/docs/Web/API/Node/childNodes)
  - 텍스트 요소를 포함한 모든 자식 요소를 반환
  - [NodeList](https://developer.mozilla.org/ko/docs/Web/API/NodeList)(non-live) 반환
- [children](https://developer.mozilla.org/ko/docs/Web/API/ParentNode/children)
  - 자식 요소 중 Element type 요소만을 반환
  - [HTMLCollection](https://developer.mozilla.org/ko/docs/Web/API/HTMLCollection)(live) 반환
- [previousSibling](https://developer.mozilla.org/ko/docs/Web/API/Node/previousSibling)**,** [nextSibling](https://developer.mozilla.org/ko/docs/Web/API/Node/nextSibling)
  - text node를 포함한 모든 형제 노드 탐색
  - HTMLElement를 상속받은 객체 반환
- [previousElementSibling](https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling)**,** [nextElementSibling](https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/nextElementSibling)
  - 형제 노드 중 Element type 요소만을 탐색
  - HTMLElement를 상속받은 객체 반환



## DOM Manipulation (조작)

어트리뷰트 vs 프로퍼티
어트리뷰트와 프로퍼티는 다르다
어트리뷰트가 프로퍼티로 변경되는 경우 id는 id프로퍼티가 생성되는 반에 class는 

### 텍스트 노드 접근/수정

- [nodeValue](https://developer.mozilla.org/ko/docs/Web/API/Node/nodeValue)
  - 텍스트 노드의 경우는 문자열, 요소 노드의 경우 null 반환
- [nodeName](https://developer.mozilla.org/ko/docs/Web/API/Node/nodeName)
- [nodeType](https://developer.mozilla.org/ko/docs/Web/API/Node/nodeType)

### 어트리뷰트 노드 접근/수정

- [className](https://developer.mozilla.org/ko/docs/Web/API/Element/className)
  - class 어트리뷰트의 값을 취득 또는 변경
  - class 어트리뷰트가 존재하지 않으면 class 어트리뷰트를 생성하고 지정된 값을 설정
  - 어트리뷰트의 값이 여러 개일 경우, 공백으로 구분된 문자열이 반환되므로 String 메소드 `split(' ')`를 사용하여 배열로 변경하여 사용
- [classList](https://developer.mozilla.org/ko/docs/Web/API/Element/classList)
  - add, remove, item, toggle, contains, replace 메소드 제공

- [id](https://developer.mozilla.org/ko/docs/Web/API/Element/id)
  - id 어트리뷰트의 값을 취득 또는 변경 
  - id 프로퍼티에 값을 할당하는 경우, id 어트리뷰트가 존재하지 않으면 id 어트리뷰트를 생성하고 지정된 값을 설정
- [hasAttribute(attribute)](https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute)
  - 지정한 어트리뷰트를 가지고 있는지 확인
  - Boolean 반환
- [getAttribute(attribute)](https://developer.mozilla.org/ko/docs/Web/API/Element/getAttribute)
  - 어트리뷰트의 값을 취득
  - String 반환
- [setAttribute(attribute, value)](https://developer.mozilla.org/ko/docs/Web/API/Element/setAttribute)
  - 어트리뷰트와 어트리뷰트 값 설정
  - undefined 반환
- [removeAttribute(attribute)](https://developer.mozilla.org/ko/docs/Web/API/Element/removeAttribute)
  - 지정한 어트리뷰트 제거
  - undefined 반환

### HTML 콘텐츠 조작(Manipulation)

- [textContent](https://developer.mozilla.org/ko/docs/Web/API/Node/textContent)

  - 요소의 텍스트 콘텐츠를 취득 또는 변경(마크업 무시)
  - 새로운 텍스트를 할당하면 텍스트를 변경
    - 순수한 텍스트만 지정해야 한다.
    - 마크업을 포함시키면 문자열로 인식되어 그대로 출력

- [innerText](https://developer.mozilla.org/ko/docs/Web/API/Node/innerText)

  - 요소의 텍스트 콘텐츠에 접근

  - 사용하지 않는 것이 좋다.

    - 비표준

    - CSS에 순종적  

      > CSS에 의해 비표시(visibility: hidden;)로 지정되어 있다면 텍스트가 반환되지 않는다.

    - CSS를 고려해야 하므로 textContent 프로퍼티보다 느리다.

- [innerHTML](https://developer.mozilla.org/ko/docs/Web/API/Element/innerHTML)

  - 해당 요소의 모든 자식 요소를 포함하는 모든 콘텐츠를 하나의 문자열로 취득(마크업 포함)
  - 마크업이 포함된 새로운 콘텐츠를 지정하면 새로운 요소를 DOM에 추가할 수 있다.

### DOM 조작 방식

DOM을 직접 조작하여 새로운 콘텐츠를 추가하는 방법

1. `createElement()` 메소드의 인자로 태그 이름을 전달하여 새로운 **요소 노드 생성**
2. `createTextNode()` 메소드를 사용하여 새로운 **텍스트 노드 생성**  
   (생략하는 경우, 콘텐츠가 비어 있는 요소가 된다)
3. `appendChild()` 메소드를 사용하여 **생성된 노드를 DOM tree에 추가**
   - `removeChild()` 메소드를 사용하여 **DOM tree에서 노드를 삭제**할 수 있다.

- [createElement(tagName)](https://developer.mozilla.org/ko/docs/Web/API/Document/createElement)
  - 태그이름을 인자로 전달하여 요소 생성
  - HTMLElement를 상속받은 객체 반환
- [createTextNode(text)](https://developer.mozilla.org/ko/docs/Web/API/Document/createTextNode)
  - 텍스트를 인자로 전달하여 텍스트 노드 생성
  - Text 객체 반환
- [appendChild(Node)](https://developer.mozilla.org/ko/docs/Web/API/Node/appendChild)
  - 인자로 전달한 노드를 마지막 자식 요소로 DOM 트리에 추가
  - 추가한 노드 반환
- [removeChild(Node)](https://developer.mozilla.org/ko/docs/Web/API/Node/removeChild)
  - 인자로 전달한 노드를 DOM 트리에서 제거한다.
  - 제거한 노드 반환

### insertAdjacentHTML()

- [insertAdjacentHTML(position, string)](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)

  - 인자로 전달한 텍스트를 HTML로 파싱하고 그 결과로 생성된 노드를 DOM 트리의 지정된 위치에 삽입

  - 첫번째 인자: 삽입 위치

    > - ‘beforebegin’
    > - ‘afterbegin’
    > - ‘beforeend’
    > - ‘afterend’

  - 두번째 인자: 삽입할 요소를 표현한 문자열

### innerHTML vs. DOM 조작 방식 vs. insertAdjacentHTML()

- **innerHTML**
  - 장점
    - DOM 조작 방식에 비해 빠르고 간편
    - 간편하게 문자열로 정의한 여러 요소를 DOM에 추가
    - 콘텐츠 취득
  - 단점
    -  XSS공격에 취약
    - 해당 요소의 내용을 덮어 쓴다.(HTML을 다시 파싱)
- **DOM 조작 방식**
  - 장점
    - 특정 노드 한 개(노드, 텍스트, 데이터 등)를 DOM에 추가할 때 적합
  - 단점
    - innerHTML보다 느리고 더 많은 코드가 필요하다.
- **insertAdjacentHTML()**
  - 장점
    - 간편하게 문자열로 정의된 여러 요소를 DOM에 추가
    - 삽입되는 위치를 선정할 수 있다.
  - 단점
    -  XSS공격에 취약

## style

style 프로퍼티를 사용하면 inline 스타일 선언이 가능하다.

- `element.style`
  - 요소의 인라인 스타일에 접근하거나 설정
  - 접근자로 사용시 CSS 선언을 담은 [`CSSStyleDeclaration`](https://developer.mozilla.org/ko/docs/Web/API/CSSStyleDeclaration) 객체를 반환
- `Window.getComputedStyle()`
  - 인자로 주어진 요소의 모든 CSS 프로퍼티 값을 반환
    - 스타일시트와 속성값에 대한 기본 연산이 모두 반영된 결과값