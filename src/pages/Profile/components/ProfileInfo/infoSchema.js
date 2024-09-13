import * as Yup from "yup"

const infoSchema = Yup.object({
  fullName: Yup.string().required("Enter your name"),
  aboutMe: Yup.string().required("Enter value"),
  lookingForAJobDescription:  Yup.string().required("Enter your skills"),
})

export default infoSchema
