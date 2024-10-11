import React, { useState } from "react"
import { Field, Form, Formik } from "formik"
import { useGetProfileQuery, useUpdateProfileInfoMutation } from "../../../../store/queryApi/profileApi"
import { useDispatch, useSelector } from "react-redux"
import { setAlertVisible } from "../../../../store/slices/alertSlice"
import infoSchema from "./infoSchema"
import s from "./profileInfo.module.css"

const ProfileEditInfo = ({ props, onEdit, refetch }) => {
  const [updateProfileInfo, { isLoading }] = useUpdateProfileInfoMutation()
  const profileId = useSelector((state) => state.profile.profileId)
  const { data } = useGetProfileQuery(profileId)
  const [errorUrl, setErrorUrl] = useState([])
  const alertVisible = useSelector((state) => state.alert.alertVisible)
  const dispatch = useDispatch()

  const randomSkill = () => {
    const skills = [
      "HTML5",
      "CSS3",
      "SASS",
      "SCSS",
      "JavaScript",
      "Typescript",
      "React",
      "React Query",
      "Redux Toolkit",
      "RTK Query",
      "Webpack",
      "Vite",
      "MobX",
      "Vue",
      "VueX",
      "Git",
      "Docker",
      "Node.js",
      "Express",
      "C#",
      "C",
      "C++",
      "Python",
      "Pascal",
      "Ruby",
      "Go",
      "Java",
      "Assembler",
      "Basic",
      "PHP",
      "OOP",
    ]
    const randomIndex = Math.floor(Math.random() * skills.length)
    return skills[randomIndex]
  }

  return (
    <>
      <Formik
        initialValues={{
          fullName: data?.fullName,
          aboutMe: data?.aboutMe,
          lookingForAJob: props?.lookingForAJob ?? false,
          lookingForAJobDescription: props?.lookingForAJobDescription,
          contacts: Object.keys(props?.contacts ?? {}).reduce((acc, contact) => ({ ...acc, [contact]: props.contacts[contact] }), {}),
        }}
        validationSchema={infoSchema}
        onSubmit={async (values) => {
          const res = await updateProfileInfo(values)
          if (res?.data?.resultCode === 0) {
            refetch()
            onEdit()
          }
          if (res?.data?.messages[0]?.includes("Invalid url format")) {
            setErrorUrl(res.data.messages)
          }
          if (res?.error?.status === 403 && !alertVisible) {
            dispatch(setAlertVisible(true))
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={s.infoBlock}>
              <b>Name:</b>
              <Field name="fullName">{({ field, meta }) => <input {...field} className={`${s.input} ${meta.touched && meta.error ? s.error : ""}`} type="text" placeholder="Enter your name" />}</Field>
            </div>
            <div className={s.infoBlock}>
              <b>About Me:</b>
              <Field name="aboutMe">
                {({ field, meta }) => <input {...field} className={`${s.input} ${meta.touched && meta.error ? s.error : ""}`} type="text" placeholder="Tell us about yourself" />}
              </Field>
            </div>
            <div className={s.infoBlock}>
              <b>Looking for a job:</b>
              <Field type="checkbox" name="lookingForAJob" />
            </div>
            <div className={s.infoBlock}>
              <b>Professional skills:</b>
              <Field name="lookingForAJobDescription">
                {({ field, meta }) => <input {...field} className={`${s.input} ${meta.touched && meta.error ? s.error : ""}`} type="text" placeholder={`For example, ${randomSkill()}`} />}
              </Field>
            </div>
            <b>Contacts:</b>

            {Object.keys(props?.contacts ?? {}).map((contact) => (
              <div key={contact} className={s.infoBlock}>
                <p>
                  {contact}:{" "}
                  <Field name={`contacts.${contact}`}>
                    {({ field, meta }) => <input {...field} className={`${s.input} ${meta.touched && meta.error ? s.error : ""}`} type="text" placeholder={`${contact} url`} />}
                  </Field>
                </p>
              </div>
            ))}

            <div className={s.block}>
              {errorUrl?.map((er) => (
                <span className={s.errorMessage}>{er}</span>
              ))}
            </div>

            <div className={s.centerBlock}>
              <button className={s.editBtn} type="submit" disabled={isSubmitting || isLoading}>
                {isSubmitting || isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
export default ProfileEditInfo
