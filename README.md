# 원티드 프리온보딩 프론트엔드 인턴십 - 선발 과제

- 프로젝트의 설치 및 실행 방법

        $ git clone https://github.com/minhyeonhong/wanted-pre-onboarding-frontend.git
        $ npm install
        $ npm start


- 배포 링크<br/>
https://wanted-pre-onboarding-frontend-lac.vercel.app/

<br/>

## 트러블 슈팅
### 로그인/회원가입

    /signup 경로에 회원가입 기능을 개발해주세요
    /signin 경로에 로그인 기능을 개발해주세요
해당 조건을 확인 하지 못하고 한 페이지에 토글 형식으로 로그인/회원가입을 구현했었는데 로그인 페이지와 회원가입 페이지를 구분하여 수정함.

    이메일 조건: @ 포함
@만 포함 하면 이메일로 간주하는게 찝찝하다...
    
    CORS
서버 쪽에서 당연히 CORS정책에 대한 모든 접속 권한을 풀어 놨을꺼라 생각했는데 아니었다..
package.json에 proxy속성을 추가하는 방식으로 해결함.

<br/>
<br/>

### TODO LIST

    -createTodo api-
    URL: /todos
    Method: POST
    Headers:
    Authorization: Bearer access_token
    Content-Type: application/json
    Body:
    todo: string
createTodo api 요청시 토큰이 잘 담겨있었는데 401에러 발생<br/>
![image](https://user-images.githubusercontent.com/90454621/217031351-d3ebb3ac-5e42-4d1b-ae4d-e9daceb0ee2e.png)<br/>
 api명세서에 'Bearer'가 있는것을 확인후 발급받은 토큰에 "Bearer " + 토큰의 형식으로 수정하여 해결함

    배포후 api요청시 405에러
CORS정책 때문에 package.json에 proxy설정을 하여 로컬에서 작업을 했었다.<br/>
해당 방법은 로컬에서만 동작하고 배포proxy설정은 따로 해줘야했다.