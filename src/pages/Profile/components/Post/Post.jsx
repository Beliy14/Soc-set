import React from "react"
import s from "../Main/mainProfile.module.css"
import { IconContext } from "react-icons"
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { addLike } from "../../../../store/slices/postSlice"

const Post = ({ post }) => {

  const dispatch = useDispatch();

  const handleLike = (postId) => {
      dispatch(addLike(postId))
  }

  return (
    <div className={s.postContainer}>
      <p className={s.postText}>{post.text}</p>
      <IconContext.Provider value={{ size: "1.4em", color: "#0b0e13ff" }}>
        <div className={s.likeDateContainer}>
          <p className={s.datePost}>{post.date}</p>
          <span>
            {post.likes === 0 
              ? <AiOutlineLike className={s.like} onClick={() => handleLike(post.id)}/>
              : <AiFillLike className={s.like} onClick={() => handleLike(post.id)} />
            }
            {post.likes !== 0 ? post.likes : ''}
          </span>

        </div>
      </IconContext.Provider>
    </div>
  )
}

export default Post
