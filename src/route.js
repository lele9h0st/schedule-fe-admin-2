import React from 'react';

const SignUp1 = React.lazy(() => import('./pages/SignUpPage'));
const Signin = React.lazy(() => import('./pages/SignInPage'));
const Logout = React.lazy(() => import('./pages/LogoutPage'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPasswordPage'));
const UpdatePassword = React.lazy(() => import('./pages/UpdatePasswordPage'));



const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/signin', exact: true, name: 'Signin', component: Signin },
    { path: '/logout', exact: true, name: 'Logout', component: Logout},
    { path: '/forgot-password', exact: true, name: 'forgot-password', component: ForgotPassword},
    { path: '/update-password', exact: true, name: 'update-password', component: UpdatePassword}


];

export default route;