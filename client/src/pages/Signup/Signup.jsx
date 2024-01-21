import styles from "../../styles/Login.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const body = document.querySelector("body");
  body.classList.add("signup");

  return (
    <div className={styles.container}>
      <span></span>
      <span></span>
      <span></span>
      <form id="signinform">
        <h1>Sign Up</h1>
        <div className={styles.inputBox}>
          <input type="text" name="Username" placeholder="Username" required />
        </div>
        <div className={styles.inputBox}>
          <input type="text" name="Email" placeholder="Email" required />
        </div>
        <div className={styles.inputBox}>
          <input type="text" name="Password" placeholder="Password" required />
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            name="ConfirmPassword"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className={styles.inputBox}>
          <input type="submit" placeholder="Submit" />
        </div>
        <div className={styles.inputBox.group}>
          <Link>Already have an Account ?</Link>
          <Link to="/login" id="signup">
            Login In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
