import { lazy, Suspense } from 'react'
import './home.css'

const Header = lazy(() => import('./Header'))
const Banner = lazy(() => import('./Banner'))
const WhyYouNeed = lazy(() => import('./WhyYouNeed'))
const RoadMap = lazy(() => import('./RoadMap'))
const Testimonial = lazy(() => import('./Testimonial'))
const Features = lazy(() => import('./Features'))
const HowItWorks = lazy(() => import('./HowItWorks'))
const Blog = lazy(() => import('./Blog'))
const GetStarted = lazy(() => import('./GetStarted'))
const Footer = lazy(() => import('./Footer'))

const SectionLoader = () => (
  <div style={{ minHeight: '200px' }} />
)

export default function Landing() {
  return (
    <div className="landing-fuild-wrapper">
      <Suspense fallback={<SectionLoader />}>
        <Header />
        <Banner />
        <WhyYouNeed />
        <RoadMap />
        <Testimonial />
        <Features />
        <HowItWorks />
        <Blog />
        <GetStarted />
        <Footer />
      </Suspense>
    </div>
  )
}
