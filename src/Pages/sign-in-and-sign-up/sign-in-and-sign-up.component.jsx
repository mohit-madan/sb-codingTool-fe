import React from 'react';
import { LoginPage } from '../../components/Login';
import { RegisterPage } from '../../components/Register';

import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = () => (
  <div className='sign-in-and-sign-up'>
    <LoginPage />
    <RegisterPage />
  </div>
);

export default SignInAndSignUpPage;
