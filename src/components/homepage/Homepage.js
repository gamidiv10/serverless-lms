import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
export const Homepage = () => {
  const history = useHistory();


  useEffect(() => {
    console.log(localStorage.getItem("lmstoken"));
    if (localStorage.getItem("lmstoken") === null) {
      history.push('/')
    }
  }, [history]);

  const handleSecurityLoginClick = (e) => {
    e.preventDefault();
    var email = localStorage.getItem("email");
    var data = { email: email };
    console.log(data);
    fetch(
      "https://cors-anywhere.herokuapp.com/https://uvttswpwue.execute-api.us-east-1.amazonaws.com/default/logoutUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT, POST, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data1) => {
        console.log("Success:", data1);
        if (data1.status) {
          localStorage.removeItem("email");
          localStorage.removeItem("lmstoken");
          localStorage.removeItem("role");
          history.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleOnlineSupport = () => {
    window.location.replace("https://dev.d2a7fvbkjvlcpa.amplifyapp.com/");
  };
  const handleChat = () => {
    window.location.replace("http://serverless-961.uc.r.appspot.com/");
  };
  const uploadFile = () => {
    history.push("/uploadFile");
  };
  const handleWordCloud = () => {
    history.push("/word-cloud");
  };

  const handleMLAnalytics = () => {
    history.push("/fileCluster");
  };
  return (
    <div className="homepage-div">
      <nav className="navbar navbar-dark bg-dark justify-content-between">
        <a className="navbar-brand">Learning Management System</a>
        <form className="form-inline">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={handleSecurityLoginClick}
            type="submit"
          >
            Logout
          </button>
        </form>
      </nav>

      <div>
        <button
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
          onClick={handleOnlineSupport}
        >
          Online Support
        </button>
      </div>
      <div>
        <button
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
          onClick={handleChat}
        >
          Chat Module
        </button>
      </div>
      <div>
        <button
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
          onClick={uploadFile}
        >
          Upload Files
        </button>
      </div>
      <div>
        <button
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
          onClick={handleWordCloud}
        >
          (Data processing) Analytics-1 (Generate word cloud)
        </button>
      </div>
      <div>
        <button
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
          onClick={handleMLAnalytics}
        >
          (ML File Clustering) Analytics-2
            </button>
      </div>
    </div>
  );
};
