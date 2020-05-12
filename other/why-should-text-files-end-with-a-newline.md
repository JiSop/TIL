# 자바스크립트 코드 마지막에 빈 줄을 삽입하는 이유

호기심에 찾아보기 시작했는데 토끼굴에 들어갔다 나왔다..😅

> ⚠️ 정확하지 않은 정보가 있을 수 있습니다. 잘못된 내용이 있다면 꼭 알려주세요!



## 줄 바꿈을 하는 이유

### 파일 마지막 줄 바꿈은 유닉스에서 관용적으로 사용하던 것이다.

ESLint 문서에선 이렇게 설명하고 있다.

> Trailing newlines in non-empty files are a common UNIX idiom. Benefits of trailing newlines include the ability to concatenate or append to files as well as output files to the terminal without interfering with shell prompts. [[1]][eol-last | ESLint]

*(영어 실력이 부족하여 올바르게 해석한지 모르겠습니다만)* 줄여서 써보면,  
**UNIX에서 파일 마지막에 새로운 줄을 삽입하면, 쉘 프롬프트에서 파일을 연결하거나 추가할때 편리하기 때문에 관용적으로 사용했다.**

위의 내용을 바탕으로 stack overflow에서 찾아본 봐로는 `cat`과 같은 명령어로 파일을 합칠때 개행이 안 되어 있으면 고통스럽고 비효율적이라 한다!



### 줄 바꿈이 없으면 파일을 올바르게 처리하지 못하는 프로그램들이 있다.

여러 텍스트 편집기(Vim 같은)와 컴파일러(C++, 파이썬)들은 파일 끝에 줄 바꿈이 있는 것을 가정하기 때문에 경고를 발생 시킨다고 한다.



### POSIX에서 줄 바꿈이 하나의 행을 정의하는 표준으로 정하고 있다.

IEEE 라는 단체에서 UNIX의 표준을 정하는 명세 [POSIX][POSIX - 위키백과]에선 줄 바꿈이 하나의 행을 정의하는 표준으로 정하고 있어  
파일 끝에 newline 문자가 없으면 끝나지 않은 행으로 간주한다고 한다. [[2]][파일 끝에는 항상 개행을 추가해야 해요]

> 운영체제 마다 줄바꿈 정의가 다르고 이로 인해 파일이 깨지는 경우가 있다고 한다. [[3]][Unix/Linux | vi, vim ^M 제거]
>
> - Window/DOS : CRLF 조합으로 줄바꿈을 정의
> - Unix/Linux/C : LF 만으로 줄바꿈을 정의



### 손상 된 파일을 쉽게 찾을 수 있다.

줄 꿈이 없는 파일을 손상 된 파일로 인식하면 아주 작은 byte를 사용함으로써 CPU 사용률을 최소한으로 줄이면서 정확하게 감지 할 수 있다고도 한다. *(이건 정확한 정보인지 모르겠다)*



## 꼭 필요한가?

**사실 JavaScript, HTML, CSS 텍스트 파일이나 최신 브라우저, IDE 등에서는 줄 바꿈을 안 하여도 문제가 안 생긴다고 한다.**

여러 이유 때문에 파일 마지막에 줄 바꿈의 대해서 개발자들 사이에서 의견이 분분한 것 같다.  
대표적인 주장들을 간단히 요약하면 이러했다.

> 👍 
> 요즘 텍스트 파일에서 EOF 줄 바꿈이 필수는 아니지만 대부분의 유닉스 도구가 일관된 결과와 함께 작동하도록 하는 유용한 규칙이다. 
>
> 👎 
> 지금은 필요 없는 표준인데 아직도 관용적으로 적용되는 규칙이다.



## TL ; DR

- 줄 바꿈은 유닉스에서 관용적으로 사용하던 것이다.
- 파일 마지막에 줄 바꿈이 없으면 파일을 올바르게 처리하지 못하는 프로그램들이 있다.
-  JavaScript, HTML, CSS 등의 파일에서는 줄 바꿈이 없어도 큰 문제가 발생하지 않는다.
- **사실은 빈 줄이 아니라 개행 문자를 추가하는 것이다!**
  - 그리고 개행문자는 운영체제 마다 정의가 다르다.



## reference

[eol-last | ESLint][eol-last | ESLint]

[POSIX - 위키백과][POSIX - 위키백과]

[파일 끝에는 항상 개행을 추가해야 해요][파일 끝에는 항상 개행을 추가해야 해요]

[Unix/Linux | vi, vim ^M 제거][Unix/Linux | vi, vim ^M 제거]

[Why is it recommended to have empty line in the end of a source file?](https://stackoverflow.com/questions/2287967/why-is-it-recommended-to-have-empty-line-in-the-end-of-a-source-file)

[Why should text files end with a newline?](https://stackoverflow.com/questions/729692/why-should-text-files-end-with-a-newline)

[새줄 문자 - 위키백과](https://ko.wikipedia.org/wiki/새줄_문자)

[eol-last | ESLint]: https://eslint.org/docs/rules/eol-last
[POSIX - 위키백과]: https://ko.wikipedia.org/wiki/POSIX
[파일 끝에는 항상 개행을 추가해야 해요]: https://velog.io/@doondoony/posix-eol
[Unix/Linux | vi, vim ^M 제거]: https://jink1982.tistory.com/123







