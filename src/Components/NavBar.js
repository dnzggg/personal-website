import React, {useCallback, useEffect, useState} from "react";
import history from "../utils/history"
import "./NavBar.scss"
import Dropdown from "./Dropdown";
import scrollToRef from "../function/scrollToRef"
import { ReactComponent as Menu } from "../images/menu.svg"
import { ReactComponent as Close } from "../images/close.svg"
import MobileDropdown from "./MobileDropdown";

const NavBar = () => {
  const height = "1%";

  const [scrollTop, setScrollTop] = useState(window.scrollY);
  const [hide, setHide] = useState("show");
  const [mobileHide, setMobileHide] = useState("hide");
  const [section, setSection] = useState("about")

  const handleOnScroll = useCallback(() => {
    if (scrollTop < window.scrollY) {
      setHide("hide")
    } else if (scrollTop > window.scrollY) {
      setHide("show")
    }
    const screenY = window.scrollY + window.innerHeight / 2
    const skillsY = document.getElementById("skills").getBoundingClientRect().y + window.scrollY
    const projectsY = document.getElementById("projects").getBoundingClientRect().y + window.scrollY
    const contactY = document.getElementById("contact").getBoundingClientRect().y + window.scrollY
    if (screenY > contactY) {
      setSection("contact")
    } else if (screenY > projectsY) {
      setSection("projects")
    } else if (screenY < skillsY) {
      setSection("about")
    } else if (screenY > skillsY) {
      setSection("skills")
    }
    setScrollTop(window.scrollY);
  }, [scrollTop]);

  useEffect(() => {
    // subscribe event
    window.addEventListener("scroll", handleOnScroll);
    window.addEventListener("resize", () => {if (window.innerWidth > 1100) {setMobileHide("hide");document.body.classList.remove("mobile-menu-open")}})
    return () => {
      // unsubscribe event
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [scrollTop, handleOnScroll]);

  const handleOpen = () => {
    if (mobileHide === "hide") {
      document.body.classList.add("mobile-menu-open")
      setMobileHide("show")
    } else {
      document.body.classList.remove("mobile-menu-open")
      setMobileHide("hide")
    }
  }

  const handleClick = (e) => {
    console.log("a")
    handleOpen()

    scrollToRef(e)
  }

  let list = ["Formalisation and Verification of Autonomous Vehicles in Simulators",
    "Cooperative Strategies in Multi-agent Systems", "Restaurant App", "Calculator", "Self Pong Playing Robot"];

  return (
    <div>
      <nav className={"navbar-desktop navbar-desktop-" + hide}>
        <div className="content nav-desktop-items" style={{ height: height }}>
          <button className="logo" onClick={() => history.push('/')}>Deniz</button>
          <div className="nav-desktop-links">
            <button className="section" style={section === "about" ? { textDecorationLine: 'underline', textUnderlinePosition: "under" } : {}}
                    onClick={scrollToRef}>About</button>
            <button className="section" style={section === "publications" ? { textDecorationLine: 'underline', textUnderlinePosition: "under" } : {}}
                    onClick={scrollToRef}>Publications</button>
            <button className="section" style={section === "skills" ? { textDecorationLine: 'underline', textUnderlinePosition: "under" } : {}}
                    onClick={scrollToRef}>Skills</button>
            <Dropdown header={"Projects"} list={list} section={section} />
            <button className="section" style={section === "contact" ? { textDecorationLine: 'underline', textUnderlinePosition: "under" } : {}}
                    onClick={scrollToRef}>Contact</button>
          </div>
        </div>
      </nav>


      <nav className={"navbar-mobile"}>
        <div className="nav-mobile-items">
          <div className="logo" />
          <button className={"logo"} onClick={handleOpen}>
            <Menu className={"svg"} />
          </button>
        </div>

        <div className={"nav-menu-mobile nav-menu-mobile-" + mobileHide}>
          <div className={"navbar-mobile"}>
            <div className={"nav-mobile-items"}>
              <div />
              <div className="nav-mobile-items" style={{ height: height }}>
                <div className="logo" />
                <button className={"logo"} onClick={handleOpen}>
                  <Close className={"svg"} />
                </button>
              </div>
            </div>
          </div>


          <div className={"menu-wrapper"}>
            <button className="section" onClick={handleClick}>About</button>
            <button className="section" onClick={handleClick}>Publications</button>
            <button className="section" onClick={handleClick}>Skills</button>
            <MobileDropdown header={"Projects"} list={list} handleClick={handleClick} hide={mobileHide} />
            <button className="section" onClick={handleClick}>Contact</button>
          </div>
        </div>
      </nav>
    </div>

  )
}

export default NavBar;