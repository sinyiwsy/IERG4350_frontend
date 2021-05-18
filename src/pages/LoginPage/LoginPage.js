import ForgotForm from "./ForgotForm";
import LoginForm from "./LoginForm";

const LoginPage = (props) => {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <LoginForm userHandler={props.userHandler} user={props.user} />
        <ForgotForm />
      </div>
    </>
  );
};

export default LoginPage;
