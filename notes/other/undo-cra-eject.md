---
title: CRA에서 eject 되돌리기
emoji: 😂
tags:
  - CRA
---


**그런건 없습니다.**

CRA로 빌드한 프로젝트에서 `yarn eject` 명령어를 실행하기 전 되돌리 수 없다는 경고를 무시하지 말고 **꼭** 필요한 경우를 고려해서 하도록 하자 진짜 되돌리기는 불가능하다. 😂😂😂

`eject`해도 문제가 생기는건 아니지만 CRA를 사용하는 많은 장점을 잃게 되니 매우 주의가 필요하다!  
(이에 대한 자세한 내용은 [Create-React-App에서 Eject사용안하기](https://medium.com/@jsh901220/create-react-app에서-eject사용안하기-customize-cra-react-app-rewired-10a83522ace0) 이 포스트를 읽어보자)

하지만 희망은 있는법 [undo 'npm run eject' in react - Stack Overflow](https://stackoverflow.com/questions/51454729/undo-npm-run-eject-in-react) 이걸 참고로 `eject`하기 전과 같은 상태로 복구해보자

## Solution #1

먼저 `eject`를 해서 추출된 configuration들이 있는 *scripts/*, *config/* 디렉토리를 삭제하자

```sh
$ rm -r scripts/
$ rm -r config/
```

그리고 *node_modules/* 디렉토리와 하위 모두 삭제!

```sh
$ rm -r node_modules/
```

`eject` 명령이 실행되면서 삭제된 react-scripts 패키지 재설치

```sh
$ yarn add react-scripts
```

*package.json*안 **"scripts"**을 아래와 같이 수정  
(*package.json* 안의 다른 설정들도 `eject`하기 이전과 같이 바꿔야한다)

```json
...

"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
...
```

그리고 패키지 인스톨 명령어를 실행!

```sh
$ yarn install
```



## Solution #2

`master` 브랜치에서 작업하지 않고 다른 브랜치를 따서 작업했다면 더 쉽다. 

*package.json*이 `eject`를 실행하기 이전 상태인 브랜치로 이동

첫 번째 방법과 마찬가지로 *node_modules/* 디렉토리와 하위 모두 삭제!

```sh
$ rm -r node_modules/
```

패키지 인스톨 명령어를 실행하면 된다!

```sh
$ yarn install
```



## 해결..?

첫 번째 방법으로 시도 했지만 스크립트 명령어가 실행이 안돼서 실패

다시 두 번째 방법으로 시도 스크립트 명령어는 동작 하지만 `$ yarn start`를 실행하니

> TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received type undefined

다시 다른 에러가 발생 😂

react-scripts의 버전을 `"react-scripts": "3.x.x"` → `"react-scripts": "3.4.0"`으로 변경해서 해결!



## 내가 해결한 방법

1. *scripts/*, *config/* 삭제

   ```sh
   $ rm -r scripts/
   $ rm -r config/
   ```

2. *node_modules/* 삭제

   ```sh
   $ rm -r node_modules/
   ```

3. *yarn.lock* 삭제

   ```sh
   $ rm -r yarn.lock
   ```

4. `eject`하기 이전 상태로 *package.json*을 되돌리고 `"react-scripts": "3.4.0"`으로 변경

   ```sh
   "dependencies": {
     "react-scripts": "3.4.0"
   }
   ```

5. 패키지 인스톨 명령어 실행

   ```sh
   $ yarn install
   ```

결국 따져보면 다 지우고 `eject`하기 이전 상태의 *package.json*으로 재설치한 것 뿐이다.



## TL ; DR

1. 커스터 마이징을 위해 `eject`가 필요하다면 처음부터 CRA를 사용하지 않는 것이 좋다.
2. 되돌리려면 `eject` 이전 상태의 *package.json*이 필요하다.
3. **`eject`하지 말자**



## reference

[Create-React-App에서 Eject사용안하기](https://medium.com/@jsh901220/create-react-app에서-eject사용안하기-customize-cra-react-app-rewired-10a83522ace0)

[undo 'npm run eject' in react - Stack Overflow](https://stackoverflow.com/questions/51454729/undo-npm-run-eject-in-react)

