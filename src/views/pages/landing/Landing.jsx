import Banner from './Banner'
import Blog from './Blog'
import Features from './Features'
import Footer from './Footer'
import GetStarted from './GetStarted'
import Header from './Header'
import HowItWorks from './HowItWorks'
import RoadMap from './RoadMap'
import Testimonial from './Testimonial'
import WhyYouNeed from './WhyYouNeed'
import './home.css'

export default function Landing () {
  return (<div className="landing-fuild-wrapper">
    <Header/>
    <Banner/>
    <WhyYouNeed />
    <RoadMap /> 
    <Testimonial/>
    <Features/>
    <HowItWorks/>
    <Blog/>
    <GetStarted />
    <Footer/>
  </div>)
}