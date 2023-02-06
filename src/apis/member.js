import { instance } from "./instance";

const commonURL = "/auth";

export const memberApis = {
    //로그인
    signAX: (loginInfo) => instance.post(`${commonURL}/signin`, loginInfo),
    //회원가입
    signupAX: (joinInfo) => instance.post(`${commonURL}/signup`, joinInfo),
}