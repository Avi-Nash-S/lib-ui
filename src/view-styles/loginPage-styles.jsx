import styled from "styled-components";
import { Link } from "react-router-dom";

export const LoginContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100vh;
  width: 100vw;
`;

export const SignInAndSignUpContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  height: 100vh;
`;

export const SideCard = styled.div`
  width: 25vw;
  min-width: 450px;
  display: flex;
  min-height: 98vh;
  float: right;
  background-color: #041e42;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LogoContainer = styled(Link)`
  height: 175px;
  width: 100px;
`;

export const LogoHeader = styled.div`
  font-size: xx-large;
  color: white;
  font-weight: 600;
  padding: 20px;
`;

export const WelcomeTag = styled.div`
  color: #ffc220;
  font-size: large;
  padding-right: 10px;
  font-weight: 600;
`;

export const SupportTag = styled.div`
  color: #ffc220;
  font-size: large;
  padding-right: 10px;
  font-weight: 600;
`;
