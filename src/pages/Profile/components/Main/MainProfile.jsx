import React, { useRef } from "react"
import s from "./mainProfile.module.css"
import { useDispatch, useSelector } from "react-redux"
import { addPost } from "../../../../store/slices/postSlice"
import Post from "../Post/Post"
import { Link } from "react-router-dom"

const MainProfile = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.posts)
  const postRef = useRef(null)

  const addPostClick = () => {
    if (postRef.current.value) {
      dispatch(addPost(postRef.current.value))
      postRef.current.value = ""
    }
  }

  return (
    <div className={s.container}>
      <h2>Posts</h2>
      <div className={s.inputContainer}>
        <textarea className={s.inputField} placeholder="Enter the text for the post..." ref={postRef} />
        <button className={s.button} onClick={addPostClick}>Add post</button>
      </div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {posts.length ? <p className={s.paragraph}>To delete the post(s), go to <Link to="/settings">Settings</Link>.</p> : ''}
     
    </div>
  )
}

export default MainProfile