import { instance } from "./instance";

export const memberApis = {
    //로그인
    signAX: (loginInfo) => instance.post(`/auth/signin`, loginInfo),
    //회원가입
    signupAX: (joinInfo) => instance.post(`/auth/signup`, joinInfo),
}