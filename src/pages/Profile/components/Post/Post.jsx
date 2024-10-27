import React, { useEffect, useRef, useState } from "react"
import s from "../Main/mainProfile.module.css"
import { PiDotsThreeCircleVertical } from "react-icons/pi"
import { IoChevronBackCircleOutline } from "react-icons/io5"
import { IconContext } from "react-icons"
import { useDispatch, useSelector } from "react-redux"
import { useDeletePostMutation, useUpdatePostTitleMutation } from "../../../../store/queryApi/postApi"
import { setAlertVisible } from "../../../../store/slices/alertSlice"

const Post = ({ post, postId, refetch, setVisibleWarningPost }) => {
  const [mode, setMode] = useState(null)
  const [titlePost, setTitlePost] = useState(post.title)
  const postContainerRef = useRef(null)

  const dispatch = useDispatch()

  const alertVisible = useSelector((state) => state.alert.alertVisible)
  const language = useSelector((state) => state.language.language)
  const [deletePost] = useDeletePostMutation()
  const [updatePost] = useUpdatePostTitleMutation()

  useEffect(() => {
    const mouseClick = (e) => {
      if (!postContainerRef.current.contains(e.target)) {
        setMode(null)
        setTitlePost(post.title)
      }
    }

    document.addEventListener("click", mouseClick)

    return () => {
      document.removeEventListener("click", mouseClick)
    }
  }, [post.title])

  const onDeletePost = async () => {
    const res = await deletePost(postId)
    if (res?.data?.resultCode === 0) {
      refetch()
      setVisibleWarningPost(false)
    }
    if (res?.error?.status === 403 && !alertVisible) {
      dispatch(setAlertVisible(true))
    }
  }

  const onUpdatePostTitle = async () => {
    if (titlePost !== post.title && titlePost) {
      const res = await updatePost({ id: postId, title: titlePost })
      if (res?.data?.resultCode === 0) {
        refetch()
        setMode(null)
      }
      if (res?.error?.status === 403 && !alertVisible) {
        dispatch(setAlertVisible(true))
      }
    } else {
      setMode(null)
      setTitlePost(post.title)
    }
  }

  const onDown = (e) => {
    if (e.key === "Enter") {
      onUpdatePostTitle()
    }
    if (e.key === 'Escape') {
      setMode(null)
      setTitlePost(post.title)
    }
  }

  const dateCorrection = (date) => {
    const newDate = date
      .split("")
      .map((el) => (el === "T" ? ", " : el))
      .join("")
      .split(":")
      .slice(0, -1)
      .join(":")

    return newDate
  }

  return (
    <div className={s.postContainer} ref={postContainerRef}>
      {mode === "edit" ? (
        <input maxLength={100} type="text" autoFocus={true} onChange={(e) => setTitlePost(e.target.value)} value={titlePost} className={s.editTitleInput} onKeyDown={onDown} />
      ) : (
        <p className={s.postTitle}>{post.title}</p>
      )}
      <p className={s.datePost}>{dateCorrection(post.addedDate)}</p>
      <IconContext.Provider value={{ className: s.dots }}>
        {mode === "edit" ? (
          <IoChevronBackCircleOutline onClick={() => setMode("controllers")} />
        ) : (
          <PiDotsThreeCircleVertical
            onClick={() => {
              if (mode !== "controllers") setMode("controllers")
            }}
          />
        )}
      </IconContext.Provider>
      {mode === "controllers" ? (
        <div className={s.editorBlock}>
          <button onClick={() => setMode("edit")}>{language === "en" ? "Edit" : "Редактировать"}</button>
          <button onClick={onDeletePost}>{language === "en" ? "Delete" : "Удалить"}</button>
        </div>
      ) : (
        mode === "edit" && (
          <div className={s.editorBlock}>
            <button onClick={onUpdatePostTitle}>{language === "en" ? "Save" : "Сохранить"}</button>
          </div>
        )
      )}
    </div>
  )
}

export default Post
