import axios from 'axios';
import React, { useEffect } from 'react';
import SocialAuth from '../../components/auth/SocialAuth';
import { loginUser } from '../../modules/user';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SocialContainer = ({ history }) => {
  const dispatch = useDispatch();

  const googleLoginHandler = () => {
    console.log(process.env.REACT_APP_CLIENT_URI);
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CLIENT_URI}/login/google&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`,
    );
  };

  function googleLoginReqtoServer() {
    const url = new URL(window.location.href);
    let hash = url.hash;
    if (url.hash.length !== 0) {
      hash = hash.split('=')[1].split('&')[0];
      const authorizationCode = hash;
      if (authorizationCode) {
        axios
          .post(
            `${process.env.REACT_APP_SERVER_URI}/users/oauth/google`,
            {
              accessToken: authorizationCode,
            },
            {
              withCredentials: true,
            },
          )
          .then(async (response) => {
            let newPayload = {
              token: response.data.data.accessToken,
              id: response.data.data.payload.id,
              email: response.data.data.payload.email,
              username: response.data.data.payload.username,
            };
            await dispatch(loginUser(newPayload));
            history.push('/');
          });
      }
    }
  }

  useEffect(() => {
    if (window.location.href.indexOf('google' !== undefined)) {
      googleLoginReqtoServer();
    }
  });

  return <SocialAuth googleLoginHandler={googleLoginHandler} />;
};

export default withRouter(SocialContainer);