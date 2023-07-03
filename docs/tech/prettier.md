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

## 참고 자료

- https://prettier.io/docs/en/install.html
- https://github.com/prettier/eslint-config-prettier#installation
- https://prettier.io/docs/en/next/configuration.html
- https://kasterra.github.io/setting-yarn-berry/
- https://xionwcfm.tistory.com/286
- https://prettier.io/docs/en/next/options.html
