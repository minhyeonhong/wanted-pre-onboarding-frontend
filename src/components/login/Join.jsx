import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

const Join = (props) => {
    //가입버튼 상태
    const [joinDisabled, setJoinDisabled] = useState(true);
    //가입정보 상태
    const [joinData, setJoinData, joinDataHandle] = useInput({
        email: "",
        password: "",
        checkPassword: ""
    });

    useEffect(() => {
        setJoinDisabled(!validation({ type: "joinDisabled" }));
    }, [joinData])

    const validation = ({ type, value }) => {
        let result = false;
        console.log(type, value, result);

        switch (type) {
            case "checkEmail":
                result = /([\w-.]+)@([\w-.]+)$/.test(value);
                break;
            case "checkPasswordLength":
                result = value.length > 7;
                break;
            case "checkPassword":
                result = joinData.password === value;
                break;
            case "joinDisabled":
                result = /([\w-.]+)@([\w-.]+)$/.test(joinData.email) &&
                    joinData.password.length > 7 &&
                    joinData.password === joinData.checkPassword;
                break;
        }
        return result;
    }

    const join = () => {
        console.log(joinData);
    }

    const cansleJoin = () => {
        setJoinData({
            email: "",
            password: "",
            checkPassword: ""
        });
        props.setLoginToggle(true);
    }

    return (
        <div>
            <div>회원가입</div>
            <div><input type="text" data-testid="email-input" name="email" onChange={joinDataHandle} value={joinData.email || ""} placeholder="email형식 아이디" /></div>
            <StValitext textColor={"#f96854"}>{!validation({ type: "checkEmail", value: joinData.email }) && joinData.email !== "" && "Email 형식이 아니에요."}</StValitext>
            <StValitext textColor={"#22B14C"}>{validation({ type: "checkEmail", value: joinData.email }) && "올바른 Email 형식이에요"}</StValitext>

            <div><input type="password" data-testid="password-input" name="password" onChange={joinDataHandle} value={joinData.password || ""} placeholder="비밀번호 8자 이상" /></div>
            <StValitext textColor={"#f96854"}>{!validation({ type: "checkPasswordLength", value: joinData.password }) && joinData.password !== "" && "비밀번호는 8자 이상 입력해주세요."}</StValitext>

            <div><input type="password" data-testid="password-input" name="checkPassword" onChange={joinDataHandle} value={joinData.checkPassword || ""} placeholder="비밀번호 확인" /></div>
            <StValitext textColor={"#f96854"}>{!validation({ type: "checkPassword", value: joinData.checkPassword }) && joinData.checkPassword !== "" && "비밀번호가 다릅니다."}</StValitext>
            <StValitext textColor={"#22B14C"}>{validation({ type: "checkPassword", value: joinData.checkPassword }) && joinData.checkPassword !== "" && "비밀번호가 일치합니다."}</StValitext>
            <div>
                <button data-testid="signup-button" onClick={join} disabled={joinDisabled}>가입하기</button>
                <button onClick={cansleJoin}>취소</button>
            </div>
        </div>
    );
};

export default Join;

const StValitext = styled.div`
  font-size: 0.7rem;
  color: ${(props) => props.textColor};
`;