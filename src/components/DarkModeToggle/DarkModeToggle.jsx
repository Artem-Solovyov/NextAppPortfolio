import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from "react"

const DarkModeToggle = () => {
    const {toggle, mode} = useContext(ThemeContext)
  return (
    <div className="dark-mode" onClick={toggle}>
        <div className="dark-mode__icon">🌙</div>
        <div className="dark-mode__icon">🔆</div>
      <div className="dark-mode__ball" style={mode === "light" ? { left: "2px"} : {right: "2px"}} ></div>
    </div>
  )
}

export default DarkModeToggle