import { Link } from "react-router-dom";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const body = document.querySelector("body");
  body.classList.remove("signup");

  return (
    <div className={styles.container}>
      <span></span>
      <span></span>
      <span></span>
      <form id="signinform">
        <h1>Login</h1>
        <div className="inputBox">
          <input type="text" name="Username" placeholder="Username" required />
        </div>
        <div className="inputBox">
          <input type="text" name="Password" placeholder="Password" required />
        </div>
        <div className="inputBox group">
          <Link href="#">Forgot Password</Link>
          <Link to="/signup" id="signup">
            Signup
          </Link>
        </div>
        <div className="inputBox">
          <input type="submit" placeholder="Login In" />
        </div>
      </form>
    </div>
  );
};

export default Login;
