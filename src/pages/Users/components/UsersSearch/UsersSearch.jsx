import React, { useCallback, useEffect, useState } from "react"
import s from "./usersSearch.module.css"
import { useGetUsersQuery } from "../../../../store/queryApi/usersApi"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../../components/Loader/Loader"
import ErrorBlock from "../../../../components/ErrorBlock/ErrorBlock"
import { setTotalUsersCount, setUsers, setTerm, setCurrentPage, setFriendSelect } from "../../../../store/slices/usersSlice"
import useDebounce from "../../../../hooks/useDebounce"

const UsersSearch = ({ pagePagination, setPagePagination }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const dispatch = useDispatch()
  const {term, friend} = useSelector((state) => state.users)
  const { data: usersQuery, isLoading, error, refetch } = useGetUsersQuery({ page: pagePagination, term, friend })

  const handleTerm = useCallback(() => {
    setPagePagination(1)
    dispatch(setCurrentPage(1))
    dispatch(setTerm(searchTerm))
  }, [dispatch, searchTerm, setPagePagination])

  const handleFriend = (e) => {
    
    setPagePagination(1)
    dispatch(setCurrentPage(1))
    dispatch(setFriendSelect(e.target.value === 'null' ? null : e.target.value))
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
    dispatch(setUsers(usersQuery?.items))
    dispatch(setTotalUsersCount(usersQuery?.totalCount))
  }, [dispatch, usersQuery, term])

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
