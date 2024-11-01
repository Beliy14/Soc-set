import React, { useEffect } from "react"
import HeaderProfile from "./components/Header/HeaderProfile"
import MainProfile from "./components/Main/MainProfile"
import { useGetProfileQuery } from "../../store/queryApi/profileApi"
import Loader from "../../components/Loader/Loader"
import { useDispatch, useSelector } from "react-redux"
import { setUserProfile } from "../../store/slices/profileSlice"
import Redirect from "../../hoc/Redirect"
import { useLocation, useParams } from "react-router-dom"
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock"
import RedirectToSettings from "../../hoc/RedirectToSettings"

const Profile = () => {
  const dispatch = useDispatch()
  const profileId = useSelector((state) => state.profile.profileId)
  const { data, error, isLoading, refetch } = useGetProfileQuery(profileId)
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
      <RedirectToSettings>
        {isLoading ? <Loader /> : <>
          <HeaderProfile props={data} refetch={refetch} owner={id === data?.userId} userId={data?.userId} />
          <MainProfile owner={id === data?.userId} />
        </>}
        {error && <ErrorBlock message={error.error || "Error"} />}
      </RedirectToSettings>
    </Redirect>
  )
}

export default Profile
