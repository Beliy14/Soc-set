import React, { useCallback, useEffect, useState } from "react"
import { useGetUsersQuery } from "../../../../store/queryApi/usersApi"
import { useDispatch, useSelector } from "react-redux"
import { setTotalUsersCount, setUsers, setTerm, setCurrentPage, setFriendSelect } from "../../../../store/slices/usersSlice"
import useDebounce from "../../../../hooks/useDebounce"
import { useLocation, useNavigate } from "react-router-dom"
import s from "./usersSearch.module.css"

const UsersSearch = ({ pagePagination, setPagePagination }) => {
  const { term, friend } = useSelector((state) => state.users)
  const { isAuth } = useSelector((state) => state.auth)
  const language = useSelector((state) => state.language.language)

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

  const { data: usersQuery, refetch } = useGetUsersQuery({ page: pagePagination, term: debouncedSearchTerm, friend })

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

  useEffect(() => {
    return () => {
      dispatch(setFriendSelect(null))
    }
  }, [dispatch])

  return (
    <div className={s.block}>
      <h2 className={s.title}>{language === "en" ? "Search users" : "Поиск пользователей"}</h2>

      <div className={s.filterBLock}>
        <input className={s.searchInput} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={language === "en" ? "Enter username" : "Введите имя пользователя"} />
        {isAuth && (
          <select onChange={handleFriend} className={s.selectUsers} name="users">
            <option value="null">{language === "en" ? "All" : "Все"}</option>
            <option value="true">{language === "en" ? "Followed" : "Мои подписки"}</option>
            <option value="false">{language === "en" ? "Unfollowed" : "Без подписок"}</option>
          </select>
        )}
      </div>
    </div>
  )
}

export default UsersSearch
