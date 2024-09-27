import React, { useCallback, useEffect, useState } from "react"
import s from "./usersSearch.module.css"
import { useGetUsersQuery } from "../../../../store/queryApi/usersApi"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../../components/Loader/Loader"
import ErrorBlock from "../../../../components/ErrorBlock/ErrorBlock"
import { setTotalUsersCount, setUsers, setTerm, setCurrentPage, setFriendSelect } from "../../../../store/slices/usersSlice"
import useDebounce from "../../../../hooks/useDebounce"
import { useLocation, useNavigate } from "react-router-dom"

const UsersSearch = ({ pagePagination, setPagePagination }) => {
  const { term, friend } = useSelector((state) => state.users)

  const [searchTerm, setSearchTerm] = useState(term)
  const debouncedSearchTerm = useDebounce(searchTerm, 200)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const parseQueryParams = (search) => {
    const params = new URLSearchParams(search)
    const queryParams = {}

    for (const [key, value] of params.entries()) {
      queryParams[key] = value
    }

    return queryParams
  }
  const queryParams = parseQueryParams(location.search)

  useEffect(() => {
    if (queryParams.term) {
      setSearchTerm(queryParams.term)
    }
  }, [queryParams.term])

  const { data: usersQuery, isLoading, error, refetch } = useGetUsersQuery({ page: pagePagination, term: debouncedSearchTerm, friend })

  useEffect(() => {
    navigate(`/users?term=${debouncedSearchTerm}`)
  }, [debouncedSearchTerm, friend, navigate])

  const handleTerm = useCallback(() => {
    setPagePagination(1)
    dispatch(setCurrentPage(1))
    dispatch(setTerm(debouncedSearchTerm))
  }, [dispatch, debouncedSearchTerm, setPagePagination])

  const handleFriend = (e) => {
    setPagePagination(1)
    dispatch(setCurrentPage(1))
    dispatch(setFriendSelect(e.target.value === "null" ? null : e.target.value))
  }

  useEffect(() => {
    handleTerm()
  }, [debouncedSearchTerm, handleTerm])

  useEffect(() => {
    if (friend !== undefined) {
      refetch()
    }
  }, [friend, refetch])

  useEffect(() => {
    if (usersQuery) {
      dispatch(setUsers(usersQuery.items))
      dispatch(setTotalUsersCount(usersQuery.totalCount))
    }
  }, [dispatch, usersQuery, debouncedSearchTerm])

  return (
    <div className={s.block}>
      <h2 className={s.title}>Search users</h2>

      <div className={s.filterBLock}>
        <input className={s.searchInput} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Enter username" />
        <select onChange={handleFriend} className={s.selectUsers} name="users">
          <option value="null">All</option>
          <option value="true">Followed</option>
          <option value="false">Unfollowed</option>
        </select>
      </div>
      {isLoading && <Loader />}
      {error && <ErrorBlock message={error.error || "Error"} />}
    </div>
  )
}

export default UsersSearch