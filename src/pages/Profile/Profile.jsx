import React, { useEffect } from "react"
import HeaderProfile from "./components/Header/HeaderProfile"
import MainProfile from "./components/Main/MainProfile"
import { useGetProfileQuery } from "../../store/queryApi/profileApi"
import Loader from "../../components/Loader/Loader"
import { useDispatch, useSelector } from "react-redux"
import { setUserProfile } from "../../store/slices/profileSlice"
import Redirect from "../../hoc/Redirect"

const Profile = () => {
  const dispatch = useDispatch()
  const profileId = useSelector((state) => state.profile.profileId)
  const { data, isLoading } = useGetProfileQuery(profileId)
  const { id } = useSelector((state) => state.auth)
  
  
  useEffect(() => {
    if (!profileId) {
      dispatch(setUserProfile(id))
    }
  }, [dispatch, id, profileId])
 
  return (
    <Redirect >
      {isLoading && <Loader />}
      <HeaderProfile avatar={data?.photos?.large} name={data?.fullName} aboutMe={data?.aboutMe} userId={data?.userId} />
      <MainProfile />
    </Redirect>
  )
}

export default Profile