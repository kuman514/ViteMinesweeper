# Installing Prettier

## Prettier를 사용하려는 이유?

- VSCode로 저장 시 자동 포맷팅 지원
- 일관된 형태의 포맷팅(줄바꿈, 공백, 들여쓰기 등등의 코드 스타일)

## 설치 방법 (VSCode 사용 + ESLint와의 연계를 전제로)

1. `Extensions`에서 `Prettier` 설치
2. `yarn add --dev --exact prettier`
3. `yarn add --dev --exact eslint-config-prettier`
4. `.prettierrc.*`, `.prettierignore` 작성 (반드시 UTF-8로 작성되고 있는지 확인할 것)
5. `.eslintrc.*`에서 `extends` 항목의 맨 마지막에 `prettier` 추가
6. `yarn dlx @yarnpkg/sdks vscode` (Yarn Berry 환경일 경우)
7. `Preferences` -> `Settings` (`Ctrl + ,`)에서 `Default Formatter`를 `Prettier`로 설정하고 `Format On Save`를 활성화
8. 각 파일에 적용하며 ESLint와의 룰 충돌이 없는지 확인

## ESLint의 룰의 하나로 적용시키는 과정

1. `eslintrc.cjs`의 `plugins`와 `extends`에 `'prettier'` 추가
2. `yarn lint` 중 `definition for rule 'prettier/prettier' was not found.` 발생
  - 찾아보니 `eslint-plugin-prettier`라는 모듈이 추가적으로 필요
3. `yarn add -D eslint-plugin-prettier`
4. 이후 `yarn lint` 중 `prettier.resolveconfig is not a function` 발생
  - 찾아보니 `prettier 2.8.8`와 `eslint-plugin-prettier 5.0.0` 간 호환성 문제
5. `prettier`를 `3.0.0`으로 업데이트 (당시 최신 버전) (`yarn add -D prettier`)
6. 이후 `yarn dlx @yarnpkg/sdks vscode`
7. 이후 `yarn lint` 했더니 CRLF 사용으로 인한 에러 발생. (현재 MacOS도 사용 중이나, 평소 집에선 Windows 사용.)
8. `eslintrc.cjs`의 `rules`에 다음과 같은 항목을 추가.
```JavaScript
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto',
    },
  ],
```
9. 이후 `yarn lint`
10. 이후 에러 없이 작동 확인 후, VSCode에서 `Ctrl + Shift + P` 누르고 `Restart ESLint Server`

## 참고 자료

- https://prettier.io/docs/en/install.html
- https://github.com/prettier/eslint-config-prettier#installation
- https://prettier.io/docs/en/next/configuration.html
- https://kasterra.github.io/setting-yarn-berry/
- https://xionwcfm.tistory.com/286
- https://prettier.io/docs/en/next/options.html
