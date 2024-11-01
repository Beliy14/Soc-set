import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Post from "../Post/Post"
import Alert from "../../../../components/Alert/Alert"
import { setAlertVisible } from "../../../../store/slices/alertSlice"
import { useCreatePostMutation, useGetPostQuery } from "../../../../store/queryApi/postApi"
import { IconContext } from "react-icons"
import { TbMoodSad } from "react-icons/tb"
import s from "./mainProfile.module.css"

const MainProfile = ({ owner }) => {
  const [value, setValue] = useState("")
  const [visibleWarningPost, setVisibleWarningPost] = useState(false)

  const dispatch = useDispatch()

  const alertVisible = useSelector((state) => state.alert.alertVisible)
  const language = useSelector((state) => state.language.language)

  const { data: posts, refetch } = useGetPostQuery()
  const [createPost] = useCreatePostMutation()

  const maxPost = posts?.length === 10

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    return () => {
      dispatch(setAlertVisible(false))
    }
  }, [dispatch])

  const onPostChange = (e) => {
    setValue(e.target.value)
    if (maxPost && e.target.value !== "") {
      setVisibleWarningPost(true)
    } else setVisibleWarningPost(false)
  }

  const addPostClick = async () => {
    const res = await createPost(value)
    if (res?.data?.resultCode === 0) {
      refetch()
      setValue("")
    }
    if (res?.error?.status === 403 && !alertVisible) {
      dispatch(setAlertVisible(true))
    }
  }

  return (
    <div className={s.container}>
      {alertVisible && <Alert />}

      {owner ? (
        <>
          <h2 className={s.title}>{language === "en" ? "Posts" : "Публикации"}</h2>
          <div className={s.inputContainer}>
            <textarea
              className={s.inputField}
              placeholder={language === "en" ? "Enter the text for the post..." : "Введите текст для публикации..."}
              value={value}
              onChange={onPostChange}
              maxLength={100}
            />
            {visibleWarningPost && <p className={s.paragraph}>{language === "en" ? "The maximum number of possible posts is 10!" : "Максимальное колличесво возможных постов - 10!"}</p>}
            <button className={s.button} onClick={addPostClick} disabled={value.length === 0 || maxPost}>
              {language === "en" ? "Add post" : "Добавить публикацию"}
            </button>
          </div>
          {posts?.map((post) => (
            <Post key={post.id} post={post} postId={post.id} refetch={refetch} setVisibleWarningPost={setVisibleWarningPost} />
          ))}
          {!posts?.length && <p className={s.paragraph}>{language === "en" ? "There are no posts yet" : "Публикации пока отсутствуют"}</p>}
        </>
      ) : (
        <div className={s.noOwnerBlock}>
          <p>{language === "en" ? "Unfortunately, other users' posts are not available" : "К сожалению, публикации других пользователей недоступны"}</p>
          <IconContext.Provider value={{ size: "25px", color: "#333" }}>
            <TbMoodSad />
          </IconContext.Provider>
        </div>
      )}
    </div>
  )
}

export default MainProfile
