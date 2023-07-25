import { FaLinkedin, FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";

export function Footer(){
    return(
        <div
        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        {/* Copyright */}
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2023. All rights reserved.
        </div>
        {/* Copyright */}
    
        {/* Right */}
        <div>
          <a href="http://www.facebook.com" className="text-white me-4" target="_blank" rel='noreferrer'>
          <FaFacebook />
          </a>
          <a href="http://www.twitter.com" className="text-white me-4" target="_blank" rel='noreferrer'>
           <FaTwitter />
          </a>
          <a href="http://www.google.com" className="text-white me-4" target="_blank" rel='noreferrer'>
           <FaGoogle />
          </a>
          <a href="http://www.linkedin.com" className="text-white" target="_blank" rel='noreferrer'>
           <FaLinkedin />
          </a>
        </div>
        {/* Right */}
      </div>
    )
};