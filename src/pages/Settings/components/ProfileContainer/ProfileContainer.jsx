import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ThisPost from "./ThisPost"
import { addDataProfile } from "../../../../store/slices/dataProfileSlice"
import s from "./profileContainer.module.css"
import { IoIosArrowRoundForward } from "react-icons/io";
import { IconContext } from "react-icons"

const ProfileContainer = () => {
  const posts = useSelector((state) => state.posts.posts)
  const {name, dateBirth} = useSelector(state => state.dataProfile)


  const nameRef = useRef(null)
  const dateBirthRef = useRef(null)

  const dispatch = useDispatch()

  const saveData = () => {
    if (nameRef.current?.value && dateBirthRef.current?.value) {
      dispatch(addDataProfile({ name: nameRef.current.value, dateBirth: dateBirthRef.current.value }));
    } // Доработать это, показывать красным или что то такое, если не введено в любом инпуте
  }

  return (
    <div className={s.container}>

      <h2>My data:</h2>
        <div className={s.dateContainer}>
            <input className={s.inputData} type="text" placeholder="Name" ref={nameRef}/>
            {name.length > 0 && <IconContext.Provider value={{size: '24px'}}><IoIosArrowRoundForward /></IconContext.Provider>}
            <p>{name}</p>
        </div>
        <div className={s.dateContainer}> 
            <input className={s.inputData} type="date" placeholder="Date of birth" min="1900-01-01" max={new Date().toISOString().split("T")[0]} ref={dateBirthRef} />
            {dateBirth.length > 0 && <IconContext.Provider value={{size: '30px'}}><IoIosArrowRoundForward /></IconContext.Provider>}
            <p>{dateBirth}</p>
        </div >
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