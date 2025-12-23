import Slider from 'react-slick'

import 'react-alice-carousel/lib/alice-carousel.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import NextIcon from 'icons/arrow-right.svg'
import PrevIcon from 'icons/arrow-left.svg'

const PrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className="arrow-container">
      <button
        onClick={ onClick }
        className="prev-arrow"
        style={ {
          position: 'absolute',
          bottom: '-67px',
          left: '50%',
          transform: 'translateX(-120%)',
          zIndex: 1,
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
        } }
      >
        <PrevIcon />
      </button>
    </div>
  )
}

const NextArrow = (props) => {
  const { onClick } = props
  return (
    <div className="arrow-container">
      <button
        onClick={ onClick }
        className="next-arrow"
        style={ {
          position: 'absolute',
          bottom: '-67px',
          left: '50%',
          transform: 'translateX(20%)',
          zIndex: 1,
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
        } }
      >
        <NextIcon />
      </button>
    </div>
  )
}

const settings = {
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  dots: false,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 990,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 2,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
      },
    },
    {
      breakpoint: 768,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 2,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
      },
    },
    {
      breakpoint: 575,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
      },
    },
  ],
}

const Testimonial = () => {
  return (
    <div className="testimonial-wrap" id="what-we-do">
      <div className="header-section">
        <h3>Turn Complexity into Clarity</h3>
        <p>Our platform is designed to help you effectively address key questions and seamlessly convert information into investor confidence.</p>
      </div>
      <div className="image-slider-container">
        <Slider { ...settings }>
          <div>            
            <div className="testimonial-section bg-1">
              <div className="client-name">
                <label className='small-title fw-normal'>Return Objective Benchmarking</label>
                <h3>Have we earned enough to meet our financial objectives ?</h3>
                <p>Assesses whether the fund has earned enough to meet financial objectives. Users
                  can compare actual returns with target returns and inflation metrics for a real
                  return assessment over a long period.</p>
              </div>
            </div>
          </div>
          <div>            
            <div className="testimonial-section bg-2">
              <div className="client-name">
                <label className='small-title fw-normal'>Portfolio Policy Benchmark</label>
                <h3>Have we outperformed a mix of indexes that represents our long-term strategic
                  asset allocation?</h3>                
                <p>Assesses outperformance against a mix of indices representing long-term strategic
                  asset allocation.</p>
              </div>
            </div>
          </div>
          <div>            
            <div className="testimonial-section bg-3">
              <div className="client-name">
                <label className='small-title fw-normal'>Dispersion of Return</label>
                <h3>How have we performed on a risk-adjusted basis?</h3>                
                <p> Examines performance dispersion within asset classes, highlighting risks and
                  opportunities in alternative assets.</p>
              </div>
            </div>
          </div>
          <div>            
            <div className="testimonial-section bg-4">
              <div className="client-name">
                <label className='small-title fw-normal'>PME Benchmarks</label>
                <h3>Was the decision to allocate capital to private investments a good one?</h3>                
                <p>Evaluate your performance against a public benchmark with similar attributes to
                  compute Alpha.</p>
              </div>
            </div>
          </div>
          <div>            
            <div className="testimonial-section bg-5">
              <div className="client-name">
                <label className='small-title fw-normal'>Manager Benchmarks</label>
                <h3>Have we added value through our selection of active managers? </h3>                
                <p>Assess performance by comparing it against a combination of each manager&apos;s
                  specific benchmark, considering their respective weights within the portfolio.</p>
              </div>
            </div>
          </div>
          <div>            
            <div className="testimonial-section bg-1">
              <div className="client-name">
                <label className='small-title fw-normal'>Customized Benchmarks</label>
                <h3>Did we make good allocation decisions across strategies, sectors, geographies,
                  and vintages?</h3>                
                <p>Custom-weighted benchmarks to perform &quot;what if&quot; analysis under different
                  allocation scenarios and across strategic groups.</p>
              </div>
            </div>
          </div>
          <div>            
            <div className="testimonial-section bg-2">
              <div className="client-name">
                <label className='small-title fw-normal'>Peer Benchmarks</label>
                <h3>Have we outperformed other similar institutions?</h3>                
                <p>Evaluate your performance against a custom group of peers with similar
                  attributes.</p>
              </div>
            </div>
          </div>
          <div>            
            <div className="testimonial-section bg-3">
              <div className="client-name">
                <label className='small-title fw-normal'>Model Portfolio Benchmark</label>
                <h3>Have we done better than a simple, investable & passive approach?</h3>                
                <p>Evaluates pool performance against a traditional 60/40 portfolio. Offers
                  customization based on investment constraints and the investable universe,
                  providing flexibility for different equity and fixed-income allocations.</p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  )
}
export default Testimonial