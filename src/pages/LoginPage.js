import ForgotForm from './ForgotForm';
import LoginForm from './LoginForm';


const LoginPage = (props) => {

    return (
        <>
            <LoginForm userHandler={props.userHandler} user={props.user}/>
            <ForgotForm />
        </>
    );
}

export default LoginPage;