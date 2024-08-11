import React, { useState } from "react"
import { BsInfoCircle } from "react-icons/bs";
import s from "./profileContainer.module.css"
import { IconContext } from "react-icons"
import { deletePost } from "../../../../store/slices/postSlice"
import { useDispatch } from "react-redux"

const ThisPost = ({ post }) => {
    const dispatch = useDispatch()
  
    const [isSettingVisible, setIsSettingVisible] = useState(false)
  
    const deleteThePost = () => {
      dispatch(deletePost(post.id))
    }
  
    const handleMouseEnter = () => {
      setIsSettingVisible(true)
    }
  
    const handleMouseLeave = () => {
      setIsSettingVisible(false)
    }
  
    return (
      <div className={s.postContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <p>{post.text}</p>
  
        <IconContext.Provider value={{ size: "16px", color: "#2b3846" }}>
          <BsInfoCircle  className={s.more} />
        </IconContext.Provider>
  
        {isSettingVisible && (
          <div className={s.setting}>
            <div>
              <span>likes: {post.likes} | </span>
              <span>{post.date}</span>
            </div>
            <button onClick={deleteThePost}>Delete post</button>
          </div>
        )}
      </div>
    )
  }


  export default ThisPost