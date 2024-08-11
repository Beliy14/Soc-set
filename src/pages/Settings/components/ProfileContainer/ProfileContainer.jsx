import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ThisPost from "./ThisPost"
import { addDataProfile } from "../../../../store/slices/dataProfileSlice"
import s from "./profileContainer.module.css"

const ProfileContainer = () => {
  const posts = useSelector((state) => state.posts.posts)

  const nameRef = useRef(null)
  const dateBirthRef = useRef(null)

  const dispatch = useDispatch()

  const saveData = () => {
    if (nameRef.current?.value && dateBirthRef.current?.value) {
      dispatch(addDataProfile({ name: nameRef.current.value, dateBirth: dateBirthRef.current.value }));
    }
  }

  return (
    <div className={s.container}>

      <h2>My data:</h2>
        <input className={s.inputData} type="text" placeholder="Name" ref={nameRef}/>
        <input className={s.inputData} type="date" placeholder="Date of birth" min="1900-01-01" max={new Date().toISOString().split("T")[0]} ref={dateBirthRef} />
        <button onClick={saveData} className={s.saveData}>Save</button>

      <h2>My posts:</h2>
      {posts.length 
      ? posts.map((post) => (
        <ThisPost key={post.id} post={post} />
      ))
      : <Link className="link" to="/profile">Create your first post!</Link>}
    </div>
  )
}



export default ProfileContainer