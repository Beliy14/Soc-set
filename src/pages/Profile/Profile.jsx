import React from "react"
import HeaderProfile from "./components/Header/HeaderProfile"
import MainProfile from "./components/Main/MainProfile"
import { useGetProfileQuery } from "../../store/queryApi/profileApi"
import Loader from "../../components/Loader/Loader"
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock"
import { useSelector } from "react-redux"

const Profile = () => {
  const profile = useSelector((state) => state.profile.profile)

  console.log(profile)

  const { data, isLoading, error } = useGetProfileQuery(profile)

  return (
    <>
      {isLoading && <Loader />}
      {error ? (
        <ErrorBlock message={error.error || "Error"} />
      ) : (
        <>
          <HeaderProfile avatar={data?.photos?.large} name={data?.fullName} aboutMe={data?.aboutMe} />
          <MainProfile />
        </>
      )}
    </>
  )
}

export default Profile
