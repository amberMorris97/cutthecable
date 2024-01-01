import React from "react";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SwipeUpAltIcon from "@mui/icons-material/SwipeUpAlt";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      <div>
        <Grid item container gap={10} spacing={0} className="FooterUpperGrid">
          <Grid  item  sm={2} xs={2}>
            <div className="gridItem">
            <div class="gridItem">
                <p class="FooterHeading">Email</p>
                <a href="mailto:cutthecable@techie.com" class="FooterSubHeading">cutthecable@techie.com</a>
            </div>  
            </div>
          </Grid>

          <Grid  item  sm={2} xs={2}>
            <div className="gridItem">
              <div className="gridItem">
                {/* <p className="FooterHeading">Telephone</p>
                <p className="FooterSubHeading">(215) 673-8630</p> */}
              </div>
            </div>
          </Grid>
          <Grid  item  sm={2} xs={2}>
            <div className="gridItem">
              <div className="gridItem">
                <p className="FooterHeading">Quick Links</p>
                <p className="FooterSubHeading">Privacy Policy</p>
              </div>
            </div>
          </Grid>
        </Grid>

        <div className="CenteringDiv">
          <hr className="Divider" />
        </div>

        <div className="CenteringDiv">
          <Grid item container gap={2} spacing={0} className="FooterLowerGrid">
            <Grid  item  sm={3} xs={11.5}>
              <div className="gridItem2">
                <p className="LoverGridText1">Copyright 2024 ©. cutthecable</p>
              </div>
            </Grid>

            <Grid  item  sm={3}>
              <div className="gridItem2">
                <p className="LoverGridText1" style={{ opacity: 0 }}></p>

                <div className="CenteringDiv2">
                  <TwitterIcon onClick={() => window.open('https://twitter.com/@slick_nsavvy', '_blank')} className="FooterIcon" />
                  <FacebookIcon onClick={() => window.open('https://tinyurl.com/Cut-The-Cable', '_blank')}  className="FooterIcon" />
                  <YouTubeIcon className="FooterIcon" />
                  <MusicNoteIcon className="FooterIcon" />
                </div>
              </div>
            </Grid>
            <Grid  item  sm={3}>
              <div className="gridItem2">
                <div onClick={scrollToTop} className="ToTopDiv">
                  <p className="LoverGridText2">Back on top</p>
                  <SwipeUpAltIcon className="TopIcon" />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  bottom: 0;
  width: 100%;
  height: 350x;

  .FooterHeading {
    color: #1c1f25;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
  .FooterSubHeading {
    color: grey;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
  }
  .FooterSubHeading:hover {
    cursor: pointer;
  }

  .CenteringDiv {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .CenteringDiv2 {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .FooterUpperGrid {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
  }

  .FooterLowerGrid {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 1%;
  }
  .gridItem {
    height: 100px;
  }
  .gridItem2 {
    height: 70px;
  }

  .Divider {
    width: 75%;
    opacity: 0.05;
    background-color: grey;
  }
  .LoverGridText1 {
    color: #1c1f25;
    font-size: 14px;
    font-weight: 400;
    padding-left: 50px;
  }
  .LoverGridText2 {
    color: #1c1f25;
    font-size: 14px;
    font-weight: 400;
    text-align: right;
  }
  .FooterIcon {
    font-size: 20px;
    color: #1c1f25;
  }
  .FooterIcon:hover {
    cursor: pointer;
  }
  .ToTopDiv {
    display: flex;
    justify-content: right;
    align-items: center;
  }
  .ToTopDiv:hover {
    cursor: pointer;
  }
  
  .TopIcon {
    font-size: 25px;
    color: #1c1f25;
    padding-left: 5px;
    padding-right: 50px;
  }
  @media (max-width: 767px) {
    height: 100%;
    .CenteringDiv2 {
      display: none;
    }
    .ToTopDiv {
      display: none;
    }
    .LoverGridText1 {
      text-align: center;
      margin-top: 10%;
    }
  }
`;

export default Footer;
