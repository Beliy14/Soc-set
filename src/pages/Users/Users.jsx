import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUsers, setTotalUsersCount } from "../../store/slices/usersSlice"
import { useGetUsersQuery } from "../../store/queryApi/usersApi"
import Loader from "../../components/Loader/Loader"
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock"
import User from "./components/User"
import PaginationBlock from "./components/PaginationBlock"

const Users = () => {
  const [pagePagination, setPagePagination] = useState(1)

  const dispatch = useDispatch()

  const { data: usersQuery, isLoading, error } = useGetUsersQuery(pagePagination)

  useEffect(() => {
    dispatch(setUsers(usersQuery?.items))
    dispatch(setTotalUsersCount(usersQuery?.totalCount))
  }, [dispatch, usersQuery])

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorBlock message={error.error || "Error"} />}

      <PaginationBlock setPagePagination={setPagePagination} />
      <User />
    </div>
  )
}

export default Users
