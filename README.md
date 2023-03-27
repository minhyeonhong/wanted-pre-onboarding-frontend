# 멘토님이 관심사분리한 사전과제

### 주요내용
- 관심사를 분리
- index.js에서 bootstrapping하여 필요한 인스턴스들을 초기화
- <b>인스턴스들이 순수하게 동작하기 때문에 유지 보수에 용이하다.</b>


### 관심사 분리
React
- UI rendering
- state management

 AuthService 회원 기능 추상 클래스
- 로그인
- 회원가입
- 로그아웃

 TodoService todo list 기능 추상 클래스
- 리스트
- todo생성

httpClient API추상 클래스
- baseURL설정
- request할때 마다 header에 Authorization 넣어줌
- fetch

LocalTokenRepository repository추상 클래스
- save
- get
- remove

context [props드릴링을 방지하기 위해 context사용]
- AuthContext
- TodoContext


## 배운점
- 관심사를 분리하여 인스턴스들이 순수하게 동작하면 유지 보수가 용이하다.
- 예를 들어 API가 아직 완성되지 않은 시점에 개발을 한다고 가정했을 때
API 명세와 같은 기능을 하는 로컬 인스턴스를 만들어 기능 구현을 해놓고 나중에 API가 완성되었을 때 해당 부분만 수정해서 확인하는 형식으로 진행할 수 있다.
- 이처럼 인스턴스들이 순수하게 동작하기 때문에 라이브러리를 추가하거나 제거할 때도 용이할 것 같다.