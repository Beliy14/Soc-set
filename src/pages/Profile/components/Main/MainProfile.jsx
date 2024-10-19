import React, { useEffect, useRef } from "react"
import s from "./mainProfile.module.css"
import { useDispatch, useSelector } from "react-redux"
import { addPost } from "../../../../store/slices/postSlice"
import Post from "../Post/Post"
import Alert from "../../../../components/Alert/Alert"
import { setAlertVisible } from "../../../../store/slices/alertSlice"

const MainProfile = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.posts)
  const postRef = useRef(null)

  const alertVisible = useSelector((state) => state.alert.alertVisible)
  const language = useSelector((state) => state.language.language)

  const addPostClick = () => {
    if (postRef.current.value) {
      dispatch(addPost(postRef.current.value))
      postRef.current.value = ""
    }
  }

  useEffect(() => {
    return () => {
      dispatch(setAlertVisible(false))
    }
  }, [dispatch])

  return (
    <div className={s.container}>
      {alertVisible && <Alert />}

      <h2 className={s.title}>{language === "en" ? "Posts" : "Публикации"}</h2>
      <div className={s.inputContainer}>
        <textarea className={s.inputField} placeholder={language === "en" ? "Enter the text for the post..." : "Введите текст для публикации..."} ref={postRef} />
        <button className={s.button} onClick={addPostClick}>{language === "en" ? "Add post" : "Добавить публикацию"}</button>
      </div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
     
    </div>
  )
}

export default MainProfile