import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthFrom';
import {
  updateReq,
  resetUpdate,
  userInfoReq,
  resetInfo,
} from '../../modules/auth';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { loginUser, withdrawal } from '../../modules/user';

const ErrorText = styled.div`
  margin-top: 10px;
  color: red;
`;

const WithdrawBtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
  button {
    border: 0;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vh;
`;

const UpdateForm = ({ history }) => {
  const dispatch = useDispatch();

  const { update, updateError, info, token, username, email } = useSelector(
    ({ auth, user }) => ({
      update: auth.update,
      updateError: auth.updateError,
      info: auth.info,
      username: user.username,
      email: user.email,
      token: user.token,
    }),
  );

  const [userState, setUserState] = useState({ username: '', email: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmitHand = (data) => {
    if (
      data.password.length > 0 &&
      data.PW_confirm.length > 0 &&
      data.formErrors.email.length === 0 &&
      data.formErrors.password.length === 0 &&
      data.formErrors.username.length === 0 &&
      data.formErrors.PW_confirm.length === 0
    ) {
      const { password, username } = data;
      dispatch(updateReq({ password, username }));
    } else {
      return;
    }
  };

  useEffect(() => {
    if (updateError) {
      return;
    }
    if (update) {
      setErrorMsg('');
      console.log('update 완료', update);
      dispatch(loginUser(update.data.accessToken));
      alert(update.message);
      dispatch(resetUpdate());
      history.push('/');
    }
  }, [update, updateError, errorMsg, history, dispatch]);

  const currentUser = username;
  const currentEmail = email;

  const withdrawalBtn = () => {
    dispatch(withdrawal(token));
    history.push('/');
  };

  return (
    <>
      <AuthForm
        type="mypage"
        currentUser={currentUser}
        currentEmail={currentEmail}
        onSubmitHand={onSubmitHand}
      ></AuthForm>
      <ErrorText>{errorMsg}</ErrorText>
      <Container>
        <WithdrawBtn>
          <button onClick={() => withdrawalBtn()}>탈퇴하기</button>
        </WithdrawBtn>
      </Container>
    </>
  );
};

export default withRouter(UpdateForm);
