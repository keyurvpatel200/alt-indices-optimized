import Slider from 'react-slick'

import 'react-alice-carousel/lib/alice-carousel.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import NextIcon from 'icons/arrow-right.svg'
import PrevIcon from 'icons/arrow-left.svg'
import blogImg from '../../../assets/images/blog-img.jpg'
import blogImg1 from '../../../assets/images/blog-img1.jpg'
import authorImg from '../../../assets/images/author-img.png'

import arrowRightUp from '../../../assets/images/white-link.svg'

const PrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className="arrow-container">
      <button
        onClick={onClick}
        className="prev-arrow"
        style={{
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
        }}
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
        onClick={onClick}
        className="next-arrow"
        style={{
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
        }}
      >
        <NextIcon />
      </button>
    </div>
  )
}

const settings = {
  centerMode: false,
  centerPadding: '60px',
  slidesToShow: 2,
  dots: true,
  arrows: false,
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
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
        dots: false,
      },
    },
  ],
}

const Blog = () => {
  return (
    <div className="blog-wrapper">
      <div className="container">
        <div className="container-fluid header-section">
          <h3>Insights</h3>
          <a href="https://altindices.com/insights/" className="view-btn">View All</a>
        </div>
        <div className="container-fluid image-slider-container pe-0">
          <Slider {...settings}>
            <div>
              <div className="each-blog">
                <div className='blog-image'>
                  <figure>
                    <img src={blogImg} alt="Blog" loading="lazy" />
                  </figure>
                </div>
                <div className='blog-content'>
                  <div>
                    <h5>Fixing the Flaws: How Behavioral Biases and Outliers can skew Private Market Performance</h5>
                    <p>Behavioral finance demonstrates how psychological biases, such as framing and contrast effects, influence financial decision-making and asset valuation.</p>
                  </div>
                  <div className='blog-footer d-flex flex-column flex-md-row justify-content-between align-items-center'>
                    <div className='author-info d-flex flex-direction-row gap-3'>
                      <div className='author-image'>
                        <img src={authorImg} alt="Author" loading="lazy" />
                      </div>
                      <div className='author-name d-flex flex-column'>
                        <label className="fw-semibold">Paigaam Pegg Dhaliwal</label>
                        <span className="fw-light">June 12, 2024</span>
                      </div>
                    </div>
                    <div className='read-more'>
                      <a href="#" className="read-more-btn d-flex flex-row gap-3 text-white align-items-center">Read More <img src={arrowRightUp} alt="Why Alt?" loading="lazy" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="each-blog">
                <div className='blog-image'>
                  <figure>
                    <img src={blogImg1} alt="Blog" loading="lazy" />
                  </figure>
                </div>
                <div className='blog-content'>
                  <div>
                    <h5>Wrapping Up 2024: Highlights from Our AI in Finance Series!</h5>
                    <p>As we close an exhilarating 2024, I&#39;m thrilled to showcase our enlightening LinkedIn series on AI in Finance, inspired by the latest insights from the 10th Annual Bloomberg Columbia Machine Learning in Finance Conference. </p>
                  </div>
                  <div className='blog-footer d-flex flex-column flex-md-row justify-content-between align-items-center'>
                    <div className='author-info d-flex flex-direction-row gap-3'>
                    </div>
                    <div className='read-more'>
                      <a href="#" className="read-more-btn align-items-center d-flex flex-row gap-3 text-white">Read More <img src={arrowRightUp} alt="Why Alt?" loading="lazy" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}
export default Blog