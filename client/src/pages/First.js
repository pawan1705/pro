import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Helmet } from "react-helmet";
const First = () => {
  const [auth] = useAuth();
  return (
    <div>
    <Helmet>
                <meta charSet="utf-8" />
                <title>SearchAI - Homepage</title>
            </Helmet>
      <div className="hero_area">
        <section className="slider_section ">
          <div className="container ">
            <div className="row">
              <div className="col-md-6">
                <div className="detail-box">
                  <h1>
                    Fast &amp; Secure <br />
                  </h1>
                  <p>
                    SearchAI can answer questions, write content, and translate
                    languages. For example, it can write essays, poems, social
                    media posts, and code. It can also summarize documents,
                    critique writing, and solve math equations.{" "}
                  </p>
                  {!auth.user ? (
                    <>
                      <div
                        className="btn-box"
                        style={{ textDecoration: "none" }}
                      >
                        <Link
                          className="btn-1"
                          to="/login"
                          style={{ textDecoration: "none" }}
                        >
                          Sign In
                        </Link>

                        <Link
                          style={{ textDecoration: "none" }}
                          to="/register"
                          className="btn-2"
                        >
                          Sign Up
                        </Link>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className=" col-lg-10 mx-auto">
                    <div className="img-box">
                      <img src="images/slider-img.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default First;
