import { useState } from "react"
import "./accordion.css"
import { IoIosArrowForward, IoIosArrowDown  } from "react-icons/io";
import { IconContext } from "react-icons";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="accordion">
        <div className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
          <IconContext.Provider value={{size: '20px', color: '#1f3441'}}>{isOpen 
              ? <IoIosArrowDown />
              : <IoIosArrowForward />
          }</IconContext.Provider>
          <h2>{title}</h2>
        </div>
        {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  )
}

export default Accordion