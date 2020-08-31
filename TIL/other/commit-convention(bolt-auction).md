기능 추가할때는 feature/[feature-name] 케밥-케이스로 작성

# commit 메시지 컨벤션

```

type: subject

body

```

### type

어떤 의도의 커밋인지 기본적인 명시

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **refactor**: 코드 리팩토링 (버그를 수정하거나 기능을 추가하지 않는 코드 변경)
- **style**: 코드 포맷과 같은 스타일 수정
- **chore**: 빌드에 영향을 주는 수정 / 패키지 매니저 수정 (패키지 추가, 삭제 등)
- **docs**: 문서 추가, 삭제, 변경

### subject

- 영어로 작성을 기본으로 한다.
- 50자를 넘기지 않는다.
- 동사로 시작 할 경우 첫 글자는 대문자로 시작한다.
- 과거 시제는 지양한다.
- 마침표를 붙이지 않는다

### body (선택 사항)

- 한글로 작성을 기본으로 한다.
- 제목과 구분을 위해 한칸을 띄워 작성한다.
- 한 줄에 72자를 넘기지 않는다.
- 어떻게 했는지가 아니라 **무엇**을 **왜 했는지** 작성한다.

예)

``` 
feat: Add some feature
```

```
fix: Remove unuesd import

사용하지 않는 import가 있어서 삭제
```

```
refactor: Improve performance some feature
```

```
style: Correct some variable name

A 변수명을 명명 규칙에 맞추어 B로 변경
```

```
chore: Add redux-actions
```



## Reference

[Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0-beta.4/)

[Contributing to Angular - Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

[나만의 commit message 작성법](https://kooku.netlify.com/etc/나만의-commit-message-작성법/)

[Git 커밋 메세지 스타일 가이드](https://siyoon210.tistory.com/56)

[Git - 커밋 메시지 컨벤션](https://doublesprogramming.tistory.com/256)

