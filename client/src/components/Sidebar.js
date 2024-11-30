import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { assets } from "../assets/assets";
import { geminiContext } from "../context/geminiContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat } =
    useContext(geminiContext);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu}
          alt=""
          onClick={() => setExtended((prev) => !prev)}
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div
          className="bottom-item recent-entry"
          onClick={() => navigate("/chatbot")}
        >
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div
          className="bottom-item recent-entry"
          onClick={() => navigate("/chatbot")}
        >
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activities</p> : null}
        </div>
        <div className="bottom-item recent-entry" onClick={() => navigate("/")}>
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Sidebar;
