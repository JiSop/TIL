# Component Typing

React + TypeScript + styled-components



### 타입 or 인터페이스 정의

```tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  HEX?: string;
  fullWidth?: boolean;
  roundShape?: boolean;
  outline?: boolean;
};
const StyledButton = styled.button<ButtonProps>`
	/* ... */
`;
```

```tsx
interface ButtonProps = {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  HEX?: string;
  fullWidth?: boolean;
  roundShape?: boolean;
  outline?: boolean;
};
const StyledButton = styled.button<ButtonProps>`
	/* ... */
`;
```

엘리먼트에서 사용할 어트리뷰트들을 정의하면 된다.



### 컴포넌트에 타입 적용

```tsx
export const Button: React.FC<ButtonProps> = props => {
  /* ... */
};
```

```tsx
export const Button = (props: ButtonProps) => {
  const {
    children,
    onClick,
    disabled,
    HEX,
    outline,
    fullWidth,
    roundShape
  } = props;
  /* ... */
};
```

```tsx
export const Button = ({
  	children,
    onClick,
    disabled,
    HEX,
    outline,
    fullWidth,
    roundShape
  }: ButtonProps) => {
  /* ... */
};
```

함수 표현식 말고 선언식으로 사용해도 상관없다.

`React.FC`를 사용하면 `.defaultProps`를 사용할 수 없어서 보통은 권장하지 않는다.

 `.defaultProps`를 안쓴다면 사용해도 상관 없지만 프로젝트에서 일관성있게 작성해야한다.



### styled-components에 적용

```tsx
const StyledButton = styled.button<ButtonProps>`
	background-color: ${({ HEX }) => HEX ? HEX : '#37352f'};
	/* ... */
`;
```

스타일드 컴포넌트를 사용한다면 마찬가지로 적용해주어야 한다.



## Spreading Props

위와 같은 방법을 사용하면 필요한 어트리뷰트들을 모두 하나하나 정의해주어야 한다.

JavaScript 처럼 스프레드 연산자로 복사해서 전달하면 타입이 정의되어 있지 않기 때문에 오류가 발생한다.



### interface로 해당 엘리먼트의 어리뷰트 타입을 익스텐드하여 정의

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  roundShape?: boolean;
  outline?: boolean;
};
```

이렇게하면 스프레드 연산자로 props를 복사해서 전달할 수 있다.

하지만 `onClick` 같은 이벤트에서 타입에러를 발생시키는 상황이 발생할 수 있다.



## 어떤것이 더 좋은 방법일까

- 익스텐드해서 사용하는 방법은 어트리뷰트를 하나하나 정의해줄 필요가 없어 편하고 어떤 커스텀 어트리뷰트들을 정의하였는지 바로 알수있다. 하지만 [상황에 따라서 더 귀찮아 질 가능성이 높아 보인다.](https://hyunseob.github.io/2018/07/15/component-typing-in-react/#Omit으로-이벤트-핸들러-다시-정의하기)
- 필요한 어트리뷰트들 그때그때 정의하는건 귀찮지만 좀 더 명시적인 것 같다.



프로젝트 초반에 익스텐드해서 사용하다가 예상하지 못한 타입에러가 자주 발생하여 필요한 어트리뷰트를 정의해주는 방법으로 바꾸려면, 코드의 일관성을 위해 리팩토링을 해야하기 때문에 처음부터 필요한걸 그때그때 정의 해주는게 더 좋은 방법인 것 같다.

(특히 나 같은 주니어라면 더욱 그러지 않을까)



어느쪽이던지 일관성있게 사용하는게 중요하다. 

type, interface도 마찬가지로 한 프로젝트에서는 일관성있게 사용해야한다.

거기다 내가 그 방법을 사용한 타당한 이유가 있다면 베스트가 아닐까



## Reference

[Component Typing in React | DailyEngineering](https://hyunseob.github.io/2018/07/15/component-typing-in-react/)

[TypeScript + React: Why I don't use React.FC](https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/)

[TypeScript + React: Component patterns](https://fettblog.eu/typescript-react-component-patterns/#basic-function-components)

