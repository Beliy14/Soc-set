import React, { useState, useEffect } from "react"
import s from "./users.module.css"
import { useDispatch, useSelector } from "react-redux"
import { toggleFollowUser, setUsers, setCurrentPage, setTotalUsersCount } from "../../store/slices/usersSlice"
import { useGetUsersQuery } from "../../store/queryApi/usersApi"
import Loader from "../../components/Loader/Loader"
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock"
import { Link } from "react-router-dom"
import { setUserProfile } from "../../store/slices/profileSlice"

const Users = () => {
  const [pagePagination, setPagePagination] = useState(1)
  const [isNextPage, setIsNextPage] = useState(true)
  const [isLastPage, setIsLastPage] = useState(false)

  const dispatch = useDispatch()
  const { users, currentPage, totalUsersCount } = useSelector((state) => state.users)
  const { data: usersQuery, isLoading, error } = useGetUsersQuery(pagePagination)

  useEffect(() => {
    dispatch(setUsers(usersQuery?.items))
    dispatch(setTotalUsersCount(usersQuery?.totalCount))
  }, [dispatch, usersQuery])

  const pagesCount = Math.ceil(totalUsersCount / 5)

  useEffect(() => {
    setIsLastPage(currentPage > 6)
    setIsNextPage(currentPage < pagesCount - 5)
  }, [currentPage, totalUsersCount])

  const handleFollow = (ev, userId) => {
    ev.preventDefault()
    ev.stopPropagation()
    dispatch(toggleFollowUser(userId))
  }

  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  const clickPage = (p) => {
    setPagePagination(p)
    dispatch(setCurrentPage(p))
  }

  const lastHundredPage = () => {
    const newPage = Math.max(1, currentPage - 100)
    setPagePagination(newPage)
    dispatch(setCurrentPage(newPage))
  }

  const nextHundredPage = () => {
    const newPage = Math.min(pagesCount, currentPage + 100)
    setPagePagination(newPage)
    dispatch(setCurrentPage(newPage))
  }

  const getVisiblePages = (currentPage, pagesCount) => {
    const visibleRange = 5
    let start = Math.max(1, currentPage - visibleRange)
    let end = Math.min(pagesCount, currentPage + visibleRange)

    if (currentPage - visibleRange < 1) {
      end = Math.min(pagesCount, 2 * visibleRange + 1)
    }
    if (currentPage + visibleRange > pagesCount) {
      start = Math.max(1, pagesCount - 2 * visibleRange)
    }

    return pages.slice(start - 1, end)
  }

  const visiblePages = getVisiblePages(currentPage, pagesCount)

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorBlock message={error.error || "Error"} />}

      <div className={s.paginationContainer}>
        {isLastPage && (
          <span onClick={lastHundredPage} className={s.pagination}>
            {"<<"}
          </span>
        )}
        {visiblePages.map((p) => (
          <span key={p} onClick={() => clickPage(p)} className={currentPage === p ? `${s.pagination} ${s.active}` : s.pagination}>
            {p}
          </span>
        ))}
        {isNextPage && (
          <span onClick={nextHundredPage} className={s.pagination}>
            {">>"}
          </span>
        )}
      </div>

      {users?.map((user) => (
        <Link to={`/profile/${user.id}`} onClick={() => dispatch(setUserProfile(user.id))} key={user.id} className={`${s.user} link`}>
          <div className={s.userInfo}>
            {user?.photos?.large ? (
              <img src={user.photos.large} alt={user.name} className={s.photo} />
            ) : (
              <img src={`https://placehold.co/200x200?text=${user.name}`} className={s.photo} alt={user.name} />
            )}
            <div>
              <h2>{user.name}</h2>
              <p>{user?.status}</p>
            </div>
          </div>
          <div className={s.followContainer}>
            <button onClick={(ev) => handleFollow(ev, user.id)} className={!user.followed ? s.btn : s.btnUnFollow}>
              {!user.followed ? "Follow" : "Unfollow"}
            </button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Users
