import mouse from '../../../assets/landing/mouse.svg'
import CraftSVG from 'icons/Craft.svg'
import ShareSVG from 'icons/Share.svg'

export default function HowItWorks() {
  return (
    <div className="how-it-works-wrapper">
      <div className="container">
        <div className="header-section">
          <label>HOW IT WORKS</label>
          <h3>Demystifying Performance</h3>
        </div>
        <div className="white-section">
          <div className="steps-list">
            <ul>
              <li>
                <div className="icons-box">
                  <img src={mouse} alt="company" loading="lazy" />
                </div>
                <div className="text-area">
                  <h3>Enroll & Signup</h3>
                  <p>Verify identity and gain access by signing up.</p>
                </div>
              </li>
              <li>
                <div className="icons-box green">
                  <CraftSVG />
                </div>
                <div className="text-area">
                  <h3>Craft Your Narrative</h3>
                  <p>Review your data and craft customized dashboards.</p>
                </div>
              </li>
              <li>
                <div className="icons-box blue">
                  <ShareSVG />
                </div>
                <div className="text-area">
                  <h3>Share Your Story</h3>
                  <p>Easily share your insights with stakeholders</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="pricing-section mt-5 mt-md-0">
            <div className="col-sm-12">
              <h2>Sign Up & Start Sharing!</h2>
              <ul>
                <li>Start your journey by enrolling and signing up for our platform, where your
                  identity is verified for secure access.
                </li>
                <li>Effortlessly manage and refine your data from various sources, creating
                  customized dashboards that tell your unique story.
                </li>
                <li>Share your insights seamlessly, allowing you to communicate the impact of your
                  data-driven narrative with stakeholders.
                </li>
              </ul>
            </div>
            <div className="col-sm-12 price-action">
              <div className="price-tag">
                <h4>Free Sign-Up</h4>
                <label className='text-center text-md-start'>for Investors</label>
              </div>
              <a href="#our-pricing" className="our-pricing">
                See our pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}