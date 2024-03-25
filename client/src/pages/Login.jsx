import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { userState } from "../store/user";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/login",
        data
      );
      toast.success(response.data.message);
      reset();
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ minHeight: "100vh" }}
    >
      <div className="p-4 shadow border rounded">
        <h1 className="mb-4" style={{ color: "#007BFF", fontWeight: "bold" }}>
          Login to NewsWave
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group
            className="mb-3 d-flex flex-column"
            controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <Form.Text className="text-danger mt-1">
                Email is required
              </Form.Text>
            )}
            <Form.Text className="text-muted mt-1">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <Form.Text className="text-danger mt-1">
                Password is required
              </Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
          </Button>
        </Form>
        <div className="mt-3">
          Don&apos;t have an account?
          <Link to="/signup" className="ms-1">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
