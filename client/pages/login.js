import axios from "axios";

const Login = () => {
  const handleLogin = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await axios({
      method: "post",
      url: "http://localhost:8080/user/login",
      data: {
        email: email,
        password: password,
      },
    }).catch((error) => console.log(error));

    console.log(res.data);
  };
  return (
    <div className="login">
      <label htmlFor="email">
        <span>email</span>
        <input id="email" type="text" />
      </label>
      <br />
      <label htmlFor="password">
        <span>password</span>
        <input id="password" type="password" />
      </label>
      <br />
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
};

export default Login;
