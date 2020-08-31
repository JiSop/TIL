---
title: MarkDown Style and Tips
emoji: ✍️
tags:
  - MarkDown
---

# 마크다운 문법 스타일, 팁

> 아래의 내용은 여러 문서를 참고해 작성했습니다. 특정 마크다운 스펙이나 스타일 가이드에 부합하지 않습니다.
>
> 사용하는 어플리케이션에 따라 예상하지 못한 포멧팅 문제를 일으키거나 원하는 대로 표시되지 않을 수 있습니다.



## 헤더(Headers)

### 같은 이름의 헤더 사용 금지

많은 마크다운 렌더러는 **헤더의 콘텐츠를 사용해 ID를 생성**하기 때문에 하나의 마크다운 파일안에 같은 이름을 가진 헤더 사용을 지양해야합니다.

### atx-style 사용

모든 헤딩 레벨을 지원하는 atx-style 사용하는 것이 좋습니다.

```markdown
# This is a H1
## This is a H2
### This is a H3
#### This is a H4
##### This is a H5
###### This is a H6
```

### 헤더의 위와 아래에 빈 라인 사용

단락과 헤더를 구분하기 위해 최소 하나의 빈 라인으로 위와 아래를 감싸는것이 좋습니다.

👍

```markdown
This is a paragraph.

# Here's the heading

And this is another paragraph.
```

👎

```markdown
This is a paragraph.
# Here's the heading
And this is another paragraph.
```



## 단락(Paragraphs)

예상하지 못한 포멧팅 문제를 일으킬 수 있기 때문에 단락 앞에는 스페이스나 탭을 사용하지 않는것이 좋습니다.

👍

```markdown
Don't put tabs or spaces in front of your paragraphs.

Keep lines left-aligned like this.
```

👎

```markdown
    This can result in unexpected formatting problems.

  Don't add tabs or spaces in front of paragraphs.
```

### 단락 줄 바꿈

단락을 변경하지 않는 줄 바꿈(`<br>`)은 두개의 스페이스를  
사용합니다.

```markdown
This is the first line.  
And this is the second line.
```



## 강조(Emphasis)

### Bold

일부 마크다운 어플리케이션은 단어 중간에 `_`(underscores) 사용을 지원하지 않습니다.  
호환성을 위해 `*`(asterisks) 두 개로 감싸는걸 권장합니다.

👍

```markdown
Love**is**bold
```

👎

```markdown
Love__is__bold
```

### Italic

볼드와 마찬가지로 호환성을 위해 `*`(asterisks) 한 개로 감싸는걸 권장합니다.

👍

```markdown
A*cat*meow
```

👎

```markdown
A_cat_meow
```

### Bold and Italic

볼드와 이탤릭을 동시 사용은 `*`(asterisks) 세 개로 감싸 사용합니다.

👍

```markdown
This is really***very***important text.
```

👎

```markdown
This is really___very___important text.
This text is **_really important_**.
```

### Emphasize Links

링크 강조는 링크 문법 전체를 감싸는걸 권장합니다.

```markdown
I love supporting the **[EFF](https://eff.org)**.
This is the *[Markdown Guide](https://www.markdownguide.org)*.
See the section on [`code`](#code).
```



## Escaping Backticks

인라인 코드 블럭안에 `` ` ``(Backtick)을 사용하려면 더블 백틱(``)으로 감싸면 됩니다.

```markdown
``Use `code` in your Markdown file.``
```



## 인용구(BlockQuote)

`>`와 컨텐츠 사이에 하나의 스페이스(whitespace) 사용하여 구분

👍

```markdown
> Winter
```

👎

```markdown
>Winter
>  Winter
```

### 인용구 줄 바꿈, 단락 변경

👍

*줄 바꿈*

```markdown
> Many snowflakes are falling down. The winter has sparkling and frozen elements! It is home
> for many beautiful animals like snowy owls,
> arctic foxes, and grizzly bears.
```

*단락 변경*

```markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
```

👎

```markdown
> Winter
Snow
```

```markdown
> Many snowflakes are falling down. The winter has sparkling and frozen elements! It is home
for many beautiful animals like snowy owls,
arctic foxes, and grizzly bears.
```



## reference

- [Basic Syntax | Markdown Guide](https://www.markdownguide.org/basic-syntax)
- [styleguide-markdown](https://arcticicestudio.github.io/styleguide-markdown/)
- [markdownlint/Rules.md · DavidAnson/markdownlint](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md010)
- [Basic writing and formatting syntax | GitHub](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax)
- [마크다운 사용법](https://gist.github.com/ihoneymon/652be052a0727ad59601)



## note

보통 Typora를 사용해 작성하다 보니 일반적으로 권장하는 마크다운 문법 스타일도 전혀 적용이 안 돼 있었다.

내가 보기 편하면서 꼭 지키면 할 스타일 가이드를 정리해 `.md` 문서를 작성할 때 적용해 봐야겠다.
