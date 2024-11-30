import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../assets/assets";
import { useAuth } from "../context/auth";
import { geminiContext } from "../context/geminiContext";
import Loader from "./Loader";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(geminiContext);
  const [auth] = useAuth();
  return (
    <div className="main">
      <div className="nav">
        <p></p>
        <img src={assets.user} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello {JSON.stringify(auth.user.username)} </span>
              </p>
              <p>How can I help you today ?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  onSent(
                    "Suggest beautiful places to see on an upcoming road trip"
                  )
                }
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent("Briefly Summarized the concept : Web Designing")
                }
              >
                <p>Briefly Summarized the concept : Web Designing</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent("Best Programming Language for web development")
                }
              >
                <p>Best Programming Language for web development</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => onSent("How to improve your coding skills")}
              >
                <p>How to improve your coding skills.</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.logo} alt="" />
              {loading ? (
                <Loader />
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text "
              placeholder="Enter a prompt here...."
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div>
              {input ? (
                <img src={assets.send_icon} alt="" onClick={() => onSent()} />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            SearchAI display info, including about people , so double-check its
            responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
