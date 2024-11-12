import * as Yup from "yup"

const loginFormSchema = (isCaptcha) =>
  Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Enter your email"),
    password: Yup.string()
      .min(4, "The minimum length is 4 characters")
      .required("Enter the password"),
    rememberMe: Yup.boolean(),

    captcha: isCaptcha && Yup.string().required("Enter the captcha"),
  })

export default loginFormSchema
