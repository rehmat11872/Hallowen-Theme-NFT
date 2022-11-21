import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { FaTwitter, FaDiscord, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <MDBFooter className="text-center text-lg-start footer ">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 ">
        <div className="me-5 d-none d-lg-block">
         
        </div>

        <div>
          <a href="" className="me-3  " >
            <FaTwitter style={{ color: "#fff", fontWeight: "900" , fontSize:"25px" }}  id="pulse"  />
          </a>
          <a href="" className="me-3 ">
            <FaDiscord style={{ color: "#fff", fontWeight: "900" , fontSize:"25px" }}   id="pulse"/>
          </a>
          <a href="" className="me-3 ">
            <FaInstagram style={{ color: "#fff", fontWeight: "900", fontSize:"25px" }}  id="pulse" />
          </a>
        </div>
      </section>
    </MDBFooter>
  );
};

export default Footer;
