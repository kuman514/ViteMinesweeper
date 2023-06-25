# ViteMinesweeper
Vite + React + Zustand를 이용하여 만든 지뢰찾기 게임.
[앱 사용하기](https://vite-minesweeper.vercel.app/)

# Objective
- Microsoft Minesweeper의 규격을 따르는 지뢰찾기를 다운로드 없이 플레이하고 싶었음.
  - [Google이 제공하는 지뢰찾기](https://www.google.com/search?q=%EC%A7%80%EB%A2%B0%EC%B0%BE%EA%B8%B0&oq=%EC%A7%80%EB%A2%B0%EC%B0%BE%EA%B8%B0&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDvSAQc3MTZqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8)의 규격(너비와 높이 등등)은 이와 다름.
- 알고리즘(너비 우선 탐색)을 활용한 구현 연습.

# How to play
- 게임의 룰은 Microsoft Windows 7까지의 기본 게임이었던 Microsoft Minesweeper의 룰을 지향하고 있습니다.
- 마우스 좌클릭으로 방문되지 않은 타일을 확인할 수 있습니다.
- 마우스 우클릭으로 방문되지 않은 타일에 지뢰가 있다고 짐작하는 `마킹`을 남길 수 있습니다.
- 마우스 양쪽 클릭으로 주변에 지뢰가 있는지 확인할 수 있습니다.
  - (숫자와 주변 마킹의 개수가 일치하지 않으면 작동하지 않습니다.)
- 지뢰를 건드리거나 모두 찾으면 게임이 종료됩니다.
- `Reset` 버튼으로 게임을 다시 시작할 수 있습니다.
- `Config` 버튼으로 게임의 규격을 설정할 수 있습니다. 설정 시 진행 중인 게임은 초기화됩니다.

# Range
- 게임에서 설정할 수 있는 규격의 범위입니다.
  - 너비: 9 ~ 30칸
  - 높이: 9 ~ 16칸
  - 지뢰 개수: 10 ~ Floor(너비 * 높이 * 0.925)개

# Design
- 간략한 기획을 담은 문서
  - [상태 데이터 타입](https://github.com/kuman514/ViteMinesweeper/blob/main/docs/plans/data-types.md)
  - [구현 과정](https://github.com/kuman514/ViteMinesweeper/blob/main/docs/plans/implementation.md)
  - [최소 요구사항과 추가 요구사항](https://github.com/kuman514/ViteMinesweeper/blob/main/docs/plans/requirements.md)

# Tech docs
- [마우스 양쪽 클릭을 감지하는 방법](https://github.com/kuman514/ViteMinesweeper/blob/main/docs/tech/both-mouse-button.md)
