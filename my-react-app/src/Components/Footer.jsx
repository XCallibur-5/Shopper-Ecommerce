import '../App.css';
function Footer(){
    return(
        <div className="bottom">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-6 col-lg-4">
        <p><a href="/getInTouch/aboutUs">About Us</a></p>
        <p><a href="/getInTouch/contactUs">Contact Us</a></p>
        <span><a className="smedia" href="/"> <img src="/images/socials/facebook.png" alt="fb" className="socials" /> </a></span>
        <span><a className="smedia" href="/"> <img src="/images/socials/linkedin.png" alt="LI" className="socials" /> </a></span>
        <span><a className="smedia" href="/"> <img src="/images/socials/twitter.png" alt="Tw" className="socials" /> </a></span>
        <span><a className="smedia" href="/"> <img src="/images/socials/instagram.png" alt="Tw" className="socials" /> </a></span>
      </div>
      <div className="col-md-6 col-lg-4">
        <p><a href="/getInTouch/help">Help & Support</a></p>
        <p><a href="/getInTouch/affiliate">Affiliate</a></p>
      </div>
      <div className="col-md-6 col-lg-4">
        <p><a href="/getInTouch/terms">Terms</a></p>
        <p><a href="/getInTouch/advertise">Advertise</a></p>
      </div>
    </div>
    <div className="row">
      <div className="cpyrite">
        <p>© Shopper 2022 </p>
        <p>ALL RIGHTS RESERVED </p>
      </div>
    </div>
  </div>
</div>
    )
}
export default Footer;