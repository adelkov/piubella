import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { default as React, useEffect, useState, Component } from "react";
import CenteredTabs from "./CenteredTabs";
import {TweenMax, Elastic, Bounce} from "gsap/all";


let paperRef = null;

const Credentials = props => {
  useEffect(() => {
    TweenMax.from(paperRef, 2, {opacity:0, y: 1000, ease: Bounce.easeOut});

    // TweenLite.to(paperRef, 0.6, { y: 40, opacity: 1 });
  }, []);

  if (props.isAuth) {
    window.location.hash = "/home";
    return <div />;
  } else {
    return (
      <div stle={{ display: "flex" }}>
        <Paper
          style={{ margin: "auto", width: 400 }}
          ref={div => (paperRef = div)}
        >
          <CenteredTabs />
        </Paper>
      </div>
    );
  }
};

export default Credentials;
