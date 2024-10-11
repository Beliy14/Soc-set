import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUsers, setTotalUsersCount } from "../../store/slices/usersSlice"
import { useGetUsersQuery } from "../../store/queryApi/usersApi"
import Loader from "../../components/Loader/Loader"
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock"
import User from "./components/User"
import PaginationBlock from "./components/PaginationBlock"
import UsersSearch from "./components/UsersSearch/UsersSearch"
import Alert from "../../components/Alert/Alert"
import { setAlertVisible } from "../../store/slices/alertSlice"

const Users = () => {
  const [pagePagination, setPagePagination] = useState(1);
  const {term, friend} = useSelector((state) => state.users);
  const alertVisible = useSelector((state) => state.alert.alertVisible)

  const dispatch = useDispatch();

  const { data: usersQuery, isLoading, error } = useGetUsersQuery({ page: pagePagination, term, friend });

  useEffect(() => {
    dispatch(setUsers(usersQuery?.items));
    dispatch(setTotalUsersCount(usersQuery?.totalCount));
  }, [dispatch, usersQuery, term]);

  useEffect(() => {
    return () => {
      dispatch(setAlertVisible(false))
    }
  }, [dispatch])

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorBlock message={error.error || "Error"} />}

      {alertVisible && <Alert />}
      <UsersSearch pagePagination={pagePagination} setPagePagination={setPagePagination} />
      <PaginationBlock setPagePagination={setPagePagination} />
      <User />
    </div>
  );
};

export default Users;