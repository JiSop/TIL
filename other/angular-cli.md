## ng CLI 정리 (a.k.a cheat sheet)



### ng new (새로운 새로운 프로젝트 생성)

```sh
$ ng new <name> [option]
```

```sh
$ ng n <name> [options]
```

#### ng new의 옵션

> **-s** ( --inlineStyle=true|false )
>
> 인라인 스타일로 생성  
> (When true, includes styles inline in the component TS file.)

> **-t** ( --inlineTemplate=true|false )
>
> 인라인 템플릿으로 생성  
> (When true, includes template inline in the component TS file.)

> **-S** ( --skipTests=true|false )
>
> 대문자 S, 테스트 파일을 생성하지 않는다.  
> (When true, does not generate "spec.ts" test files for the new project.)

> **-g** ( --skipGit=true|false )
>
> git 이니셜라이징을 하지 않음  
> (When true, does not initialize a git repository.)

**예)**

```sh
$ ng n new-project -s -t -S
```


new-project라는 인라인 스타일, 인라인 템플릿, 테스트 파일 없이 새로운 프로젝트를 생성한다.



### ng generate

```sh
$ ng generate <schematic> [options]
```

```sh
$ ng g <schematic> [options]
```

#### 공통 옵션

> **--flat**
> 폴더 없이 생성



#### 컴포넌트 생성

```sh
$ ng generate component <name> [otions]
```

```sh
$ ng g c <name> [options]
```



#### 디렉티브 생성

```sh
$ ng generate directive <name> [options]
```

```sh
$ ng g d <name> [optins]
```



#### 인터페이스 생성

```sh
$ ng generate interface <name> <type> [options]
```

```sh
$ ng g i <name> <type> [options]
```



#### 파이프 생성

```sh
$ ng generate pipe <name> [options]
```

```sh
$ ng g p <name> [options]
```



#### 서비스 생성

```sh
$ ng generate service <name> [options]
```

```sh
$ ng g s <name> [options]
```



#### 클래스 생성

```sh
$ ng generate class <name> [options]
```

```sh
$ ng g cl <name> [options]
```



#### 가드 생성

```sh
$ ng generate guard <name> [options]
```

```sh
$ ng g g <name> [options]
```



## reference

자세한 설명은 공식문서 참고! https://angular.io/cli

