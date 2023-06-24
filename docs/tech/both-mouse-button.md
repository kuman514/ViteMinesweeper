# How to detect both-click
- 마우스 양쪽 클릭 감지하는 방법
  - 우선 마우스 왼쪽을 받아야 한다.
  - 마우스 왼쪽을 받는 `click` 이벤트에 핸들러를 추가.
  - 이 때, `MouseEvent.buttons`에서 오른쪽 마우스 버튼에 해당하는 비트값 `2`가 있는지 확인.
  - 이를 활용하여, 마우스 왼쪽만 클릭됐는지 양쪽 다 클릭됐는지에 따라 분기로 나누어 로직을 실행할 수 있다.
  - 참고
    - 클릭 이벤트: https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
    - 버튼 비트값: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
