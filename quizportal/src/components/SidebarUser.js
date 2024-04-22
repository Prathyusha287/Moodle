
import React, { useState } from "react";
import "./Sidebar.css";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SidebarUser = ({children}) =>{
    const [menuItems,setMenuItems] = useState([
       
        {
            path:"/quizzes",
            name:"All Quizzes",
            icon:<MdQuiz/>,
        },
        {
          path:"/logout",
          name:"Logout",
          icon:<FaUserAlt/>,
      },

    ]);
    const[isOpen,setIsOpen] = useState(false);
    const toggle = () =>setIsOpen(!isOpen);

return (
    <div
      className="container"
      style={{ display: "flex", width: "auto", margin: "0px", padding: "0px" }}
    >
      <div style={{ width: isOpen ? "12em" : "3em" }} className="sidebar">
        <div className="top_section">
        <h1 style = {{display : isOpen ? "block":"none"}} className="logo">
                  Moodle
                </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="sidemenulink"
           >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default SidebarUser;
