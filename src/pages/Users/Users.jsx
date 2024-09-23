import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUsers, setTotalUsersCount } from "../../store/slices/usersSlice"
import { useGetUsersQuery } from "../../store/queryApi/usersApi"
import Loader from "../../components/Loader/Loader"
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock"
import User from "./components/User"
import PaginationBlock from "./components/PaginationBlock"
import UsersSearch from "./components/UsersSearch/UsersSearch"

const Users = () => {
  const [pagePagination, setPagePagination] = useState(1);
  const {term, friend} = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const { data: usersQuery, isLoading, error } = useGetUsersQuery({ page: pagePagination, term, friend });

  useEffect(() => {
    dispatch(setUsers(usersQuery?.items));
    dispatch(setTotalUsersCount(usersQuery?.totalCount));
  }, [dispatch, usersQuery, term]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorBlock message={error.error || "Error"} />}

      <UsersSearch pagePagination={pagePagination} setPagePagination={setPagePagination} />
      <PaginationBlock setPagePagination={setPagePagination} />
      <User />
    </div>
  );
};

export default Users;