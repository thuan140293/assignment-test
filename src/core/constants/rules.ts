const loginFormRules = {
  username: [
    { required: true, message: "Please enter username", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please enter password", trigger: "blur" },
  ],
};

export { loginFormRules }