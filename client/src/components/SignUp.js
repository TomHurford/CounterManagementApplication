import { useState } from "react";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/signup", {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        forename: forename,
        surname: surname,
        phoneNumber: phoneNumber,
      });
      console.log(response.data);
      // It returns a token, which you can store in localStorage
      // and use to authenticate the user on subsequent requests
      localStorage.setItem("token", response.data.token);
      // Optionally redirect to another page after successful sign-up
      window.location.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />

      <label>
        Forename:
        <input
          type="text"
          value={forename}
          onChange={(event) => setForename(event.target.value)}
        />
      </label>
      <br />
      <label>
        Surname:
        <input
          type="text"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
