import React, { useEffect } from "react"
import HeaderProfile from "./components/Header/HeaderProfile"
import MainProfile from "./components/Main/MainProfile"
import { useGetProfileQuery } from "../../store/queryApi/profileApi"
import Loader from "../../components/Loader/Loader"
import { useDispatch, useSelector } from "react-redux"
import { setUserProfile } from "../../store/slices/profileSlice"
import Redirect from "../../hoc/Redirect"
import { useLocation, useParams } from "react-router-dom"

const Profile = () => {
  const dispatch = useDispatch()
  const profileId = useSelector((state) => state.profile.profileId)
  const { data, isLoading, refetch } = useGetProfileQuery(profileId)
  const { id } = useSelector((state) => state.auth)

  const location = useLocation()
  const params = useParams()


  useEffect(() => {
    if (!location.pathname.includes(profileId)) {
      dispatch(setUserProfile(id))
    }
    if (params['*']) {
      dispatch(setUserProfile(params['*']))
    }
    
  }, [dispatch, id, profileId, location.pathname, params])

  return (
    <Redirect>
      {isLoading && <Loader />}
      <HeaderProfile avatar={data?.photos?.large} name={data?.fullName} aboutMe={data?.aboutMe} refetch={refetch} owner={id === data?.userId} />
      <MainProfile />
    </Redirect>
  )
}

export default Profile
