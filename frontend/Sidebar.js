import React from 'react'
import "./Sidebar.css"
import SidebarChat from "./SidebarChat"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Avatar, IconButton } from '@material-ui/core';
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar />
                <div className="sidebar__headerRight">
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
                </div>
            </div>

        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                <SearchOutlinedIcon />
                <input placeholder="Search or Start New Chat" type="text"/>    
            </div>        
            </div>
            
            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                
            </div>

        </div>
    )
}
export default Sidebar
