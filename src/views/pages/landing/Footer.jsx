import LinkedinSVG from 'icons/Linkedin.svg'
import ALTSVG from 'icons/Add copy.svg'
import VisitIconSVG from 'icons/mail.svg'
import InstagramSVG from 'icons/Insta.svg'
import FbSVG from 'icons/Facebook.svg'

export default function Footer () {
  return (
    <div className="footer-wrapper pb-0">
      <div className="container">
        <div className="f-data">
          <div className="f-logo-section">
            <ALTSVG/>
            <p>Convert information into investor confidence.</p>            
          </div>
          <div className="f-menu">
            <ul>
              <h3>Company</h3>
              <li><a href="https://altindices.com/">Home</a></li>
              <li><a href="https://altindices.com/about-us/">About Us</a></li>
              <li><a href="https://altindices.com/insights/">Insights</a></li>
            </ul>
            <ul>
              <h3>Services</h3>
              <li><a href="https://altindices.com/hhi/banking/">Banking HHI</a></li>
              <li><a href="https://altindices.com/hhi/insurance/">Insurance HHI</a></li>
              <li><a href="https://altindices.com/hhi/telecom/">Telecom HHI</a></li>
            </ul>
            <ul>
              <h3>Support</h3>
              <li><a href="#contact-us">Contact Us</a></li>
              <li><a href="#help-center">Help Center</a></li>
            </ul>
          </div>
          <div className="contact-address">
            <div className="contact-info">
              <label>Contact Us</label>
              <span><VisitIconSVG/><a href="mailto:info@altindices.com">info@altindices.com</a></span>
            </div>
          </div>
        </div>
        <div className=''>
          <div className="f-bottom d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center py-3 gap-3 gap-md-0">
            <p className='text-white mb-0'>© 2025 Alt Indices. All rights reserved.</p>
            <div className="social-icons">
              <a href="https://www.linkedin.com/company/alt-indices/" className='text-white me-0 me-md-3 text-underline border-bottom'>Privacy Policy</a>
              <a href="https://www.linkedin.com/company/alt-indices/" className='social-icon' title='LinkedIn' target='_blank' rel='noopener noreferrer'><LinkedinSVG/></a>
              <a href="https://www.instagram.com/alt_indicies/" className='social-icon' title='Instagram' target='_blank' rel='noopener noreferrer'><InstagramSVG/></a>
              <a href="https://www.facebook.com/altindices/" className='social-icon' title='Facebook' target='_blank' rel='noopener noreferrer'><FbSVG/></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}