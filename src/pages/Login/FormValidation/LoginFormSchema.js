import * as Yup from "yup"

const loginFormSchema = Yup.object({
  email: Yup.string()
    .min(2, "Must be longer than 2 characters")
    // .max(20, "Nice try, nobody has a first name that long")
    .email("Invalid email address")
    .required("Enter your email"),
  password: Yup.string()
    .min(8, "The minimum length is 8 characters")
    .required("Enter the password"),
  rememberMe: Yup.boolean(),
})

export default loginFormSchema

