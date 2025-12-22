// src/config/loginFieldsConfig.js

const loginFields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    autoComplete: "username",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
  },
  {
    name: "submit",
    label: "Login",
    type: "submit",
    className: "btn-success",
  },
];

export default loginFields;
