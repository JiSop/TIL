# Storybook with CRA and TS



### CRA로 TypeScript 템플릿을 사용하여 빌드

```bash
$ yarn create react-app storybook --template typescript
```

```bash
$ cd storybook
```



### Storybook을 설치하면서 ts 포멧으로 초기화

```bash
$ npx -p @storybook/cli sb init --story-format=csf-ts
```

`.storybook/main.js`를 따로 수정 할 필요없이 한번에 초기화 해준다.

`src/stories` 하위의 파일들도 `.tsx`로 생성해준다.



### 에드온 설치

```bash
$ yarn add -D @storybook/addon-info react-docgen-typescript-loader
```



### styled-components 설치

```bash
$ yarn add styled-components @types/styled-components
```





## Reference

[Storybook Docs Typescript Walkthrough](https://gist.github.com/shilman/bc9cbedb2a7efb5ec6710337cbd20c0c)

[TypeScript Config](https://storybook.js.org/docs/configurations/typescript-config/#setting-up-typescript-with-babel-loader)

[Storybook을 이용한 React Test 환경 구축하기 | by Woohyun Jang | Medium](https://medium.com/@benjaminwoojang/storybook%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-react-test-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0-65bbe6c453b5)

[strothj/react-docgen-typescript-loader](https://github.com/strothj/react-docgen-typescript-loader)

---

https://jbee.io/tool/storybook-intro/

https://prev.kr/posts/styled-components-and-storybook-on-react/

https://styled-components.com/docs/api#typescript

