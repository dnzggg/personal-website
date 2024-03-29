import React, {useCallback, useEffect, useState} from "react";
import "./Dropdown.scss"
import scrollToRef from "../function/scrollToRef";
import {ReactComponent as Arrow} from "../images/arrow.svg";

const MapButtons = (props) => {
    return props.list.map((item, index) => {
        return(
            <div key={index}>
                <button className="dropdown-item" onClick={scrollToRef}>{item}</button>
                <hr/>
            </div>
        )
        }
    )
}


const Dropdown = (props) => {
    const [isOpen ,setIsOpen] = useState(false)
    const [pos, setPos] = useState([-1000, -1000, 0])
    const [scrollTop, setScrollTop] = useState(window.scrollY);

    const handlePos = () => {
        const rect = document.getElementById("1").getBoundingClientRect()
        const x = rect.x
        const y = rect.y + rect.height
        setPos([x, y, rect.width])
    }

    const handleOnScroll = useCallback(() => {
        if (scrollTop > window.scrollY) {
            setIsOpen(false)
        }
        setScrollTop(window.scrollY)
    }, [scrollTop])

    useEffect(() => {
        window.addEventListener("scroll", () => handleOnScroll());
        window.addEventListener("resize", () => handlePos())
    }, [scrollTop, handleOnScroll])

    const toggling = (e) => {
        if (e.type === "mousemove") {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
        handlePos()
    }

    return (
        <div className="dropdown" onMouseMove={toggling}  onMouseLeave={toggling}>

            <button className="section" id="1" style={props.section === "projects"?{textDecorationLine: 'underline', textUnderlinePosition: "under"}: {}}>
                {props.header}<Arrow className={"text-" + isOpen}/>
            </button>
            <div className={"dropdown-container dropdown-" + isOpen} style={{left: pos[0].toString() + "px", top: pos[1].toString() + "px", width: pos[2].toString() + "px"}}>
                <MapButtons list={props.list}/>
            </div>

        </div>
    )
}

export default Dropdown;