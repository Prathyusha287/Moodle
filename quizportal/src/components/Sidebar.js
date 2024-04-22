import React , {useState} from 'react';
import {FaBars,FaUserAlt} from "react-icons/fa";

import {MdQuiz,MdQueue} from "react-icons/md";
import {NavLink} from "react-router-dom";
import "./Sidebar.css";


const Sidebar = ({children}) =>{
    const[isOpen,setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
const menuItem = [
   
    {
        path:"/adminQuizzes",
        name:"Quizzes",
        icon:<MdQuiz/>,
    },
    {
        path:"/adminAddQuiz",
        name:"Add Quiz",
        icon:<MdQueue/>,
    },
    {
        path :"/logout",
        name:"Logout",
        icon:<FaUserAlt/>,
    },
];

return (
    <div className="container" style={{display : "flex",width:"auto",margin:"0px",padding:"0px"}}>
        <div style= {{width:isOpen?"12em":"3em"}} className="sidebar">
            <div className = "top_section">
                <h1 style = {{display : isOpen ? "block":"none"}} className="logo">
                  Moodle
                </h1>
                <div style = {{marginLeft : isOpen? "50px":"0px"}} className='bars'>
                    <FaBars onClick ={toggle}/>
                </div>
            </div>
            {menuItem.map((item,index) =>(
                <NavLink 
                to={item.path}
                key = {index}
                className = "sidemenulink"
                >
                    <div className = "icon">{item.icon}</div>
                    <div 
                            style = {{display : isOpen ? "block" : "none"}} 
                            className="link_text"
                            >
                                {item.name}
                            </div>
                </NavLink>
            ))

            }
        </div>
        <main>{children}</main>
    </div>
);

};

export default Sidebar;