import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import {handelConnect} from "./utils/connectionUtils"

import Video from "../Video/doorlocked.mp4";
import Videos from "../Video/doorwithkey.mp4";
import Navbars from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { loadOwnershipStatus } from "./utils/connectionUtils";

import PrivatePage from "./PrivatePage";
import ConnectWallet from "./ConnectWallet";



// update
// import handelConnect from "./utils/connectionUtils"
// import ConnectWallet from './ConnectWallet';

const DoorClose = () => {
  let navigate = useNavigate();
  const [section, Setsection] = React.useState(0);
  const [connect, setConnect] = React.useState(false)

  const ref = useRef(null);

  
  return (
    <div>
      {section === 0 && (
        <div>
          <Grid container>
            <video
              autoPlay="true"
              loop="true"
              muted="false"
              className="videoTag"
            >
              <source src={Video} type="video/mp4" />
            </video>

            {/* THIS JAVASCRIPT CODE IS FOR the rainbow image on the Home Page*/}
          </Grid>
          <Navbars />
          <a
            className="btn-grad open_door"
            data-glitch="Explore"
            onClick={() => {
              Setsection(1);
              setConnect(true)
            }}
            style={{ cursor: "pointer" }}
          >
            {" "}
            open door
          </a>

          <Footer />
        </div>
      )}
      {section === 1 && (
        <div>
        
              <Grid container>
              <div style={{display: 'none'}}>
                <ConnectWallet val={connect}/>
              </div>

              <video
              autoPlay="true"
              loop="true"
              muted="false"
              className="videoTag"
              >
              <source src={Videos} type="video/mp4" />
            </video>
              
            
            </Grid>
            }
           

            {/* THIS JAVASCRIPT CODE IS FOR the rainbow image on the Home Page*/}
          
          <Navbars />
          <a
            className="btn-grad open_door"
            data-glitch="Explore"
            style={{ cursor: "pointer" }}
          >
            {" "}
            open door
          </a>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default DoorClose;
