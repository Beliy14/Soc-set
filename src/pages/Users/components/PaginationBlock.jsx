import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentPage } from "../../../store/slices/usersSlice"
import { useLocation } from "react-router-dom"
import s from "../users.module.css"

const PaginationBlock = React.memo(({ setPagePagination }) => {
  const { currentPage, totalUsersCount } = useSelector((state) => state.users)

  const [isNextPage, setIsNextPage] = useState(true)
  const [isLastPage, setIsLastPage] = useState(false)

  const dispatch = useDispatch()

  const location = useLocation()

  useEffect(() => {
    if (location.pathname) {
      dispatch(setCurrentPage(1))
    }
  }, [location, dispatch])

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

  const pagesCount = Math.ceil(totalUsersCount / 5)

  useEffect(() => {
    setIsLastPage(currentPage > 6)
    setIsNextPage(currentPage < pagesCount - 5)
  }, [currentPage, totalUsersCount, pagesCount])

  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  const visiblePages = getVisiblePages(currentPage, pagesCount)

  return (
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
  )
})

export default PaginationBlock
