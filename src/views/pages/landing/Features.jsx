import { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import arrowRightUp from '../../../assets/landing/arrow-up-right.svg'

export default function Features() {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const [altModal, setaltModal] = useState(false)
  const altToggle = () => setaltModal(!altModal)

  const [aptlyModal, setaptlyModal] = useState(false)
  const aptlyToggle = () => setaptlyModal(!aptlyModal)

  const [transparentModal, settransparentModal] = useState(false)
  const transparentToggle = () => settransparentModal(!transparentModal)
  return (
    <div className="feature-wrapper" id="why-alt">
      <div className="container">
        <div className="header-container d-flex flex-column justify-content-center align-items-center text-center">
          <p className=''>Better storytelling</p>
          <h2>Why Alt?</h2>
        </div>
      </div>
      <div className="container feature-box">
        <div className="left-f-bar">
          <p>Stop one-size-fits-all comparisons. Alt Indices delivers apples-to-apples peer views that match how you actually invest.</p>
          <ul>
            <li><strong>Tailored cohorts:</strong> matched by strategy, vintage band, geography, and fund size.
            </li>
            <li><strong>Correct proxy:</strong> use the right public index as PME and compare results net of fees.</li>
            <li><strong>Aligned to your goals:</strong> tuned for fundraising, manager monitoring, or IC memos, the benchmark is tuned to your objective.</li>
          </ul>
          <p>Alt Indices eliminates these concerns, ensuring your benchmarks align
            with your investment goals. Choose customized benchmarks for a
            strategic edge in your investment journey!</p>
          <div className="ft-section">
            <label>Tailored Benchmarking <br />Solutions</label>
            <a href="#why" onClick={toggle}><img src={arrowRightUp} alt="Why Alt?" loading="lazy" /></a>
          </div>
        </div>
        <div className="right-f-bar">
          <div className="l-feature-box">
            <div className="top-box">
              <p>Built for quick onboarding and everyday decisions, so GPs and LPs get instant clarity instead of setup overhead.</p>
              <div className="ft-section">
                <label>Aptly<br />Aligned</label>
                <a href="#why" onClick={aptlyToggle}><img src={arrowRightUp} alt="Why Alt?" loading="lazy" /></a>
              </div>
            </div>
            <div className="bottom-box">
              <p>We show the shape and spread of results; so coverage, dispersion, and outliers are obvious, and no single number dominates the story.</p>
              <div className="ft-section">
                <label>Comprehensive<br />Insights</label>
                <a href="#why" onClick={altToggle}><img src={arrowRightUp} alt="Why Alt?" loading="lazy" /></a>
              </div>
            </div>
          </div>
          <div className="r-feature-box">
            <p>De-identified peers and <strong>aligned</strong> platform that keeps trust high and compliance simple; aligning incentives and removing bias from private-market performance reporting..</p>
            <div className="ft-section">
              <label>Transparent Performance Metrics </label>
              <a href="#why" onClick={transparentToggle}><img src={arrowRightUp} alt="Why Alt?" loading="lazy" /></a>
            </div>
          </div>
        </div>
      </div>

      { /* Left Modal */}
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Tailored Benchmarking Solutions</ModalHeader>
        <ModalBody>
          <div className="iframe-wrapper">
            <iframe className="iframe-container"
              title="canva"
              loading="lazy"
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFNfjhaI-8&#x2F;Ocv09SuSWvHBwF53BAHJGQ&#x2F;view?embed"
              allowfullscreen="allowfullscreen"
              allow="fullscreen"></iframe>
          </div>
          <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFNfjhaI-8&#x2F;Ocv09SuSWvHBwF53BAHJGQ&#x2F;view?utm_content=DAFNfjhaI-8&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link"
            target="_blank"
            rel="noreferrer">Website Whats Wrong?</a> by Paigaam Dhaliwal
          <br /> <br />
        </ModalBody>
      </Modal>

      { /* right Modal */}
      <Modal isOpen={altModal} toggle={altToggle} centered>
        <ModalHeader altToggle={altToggle}>Comprehensive Insights</ModalHeader>
        <ModalBody>
          <div className="iframe-wrapper">
            <iframe loading="lazy"
              title="canva"
              className="iframe-container"
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-sT8zVAY&#x2F;NsxxckZuMAMON2atZNiFuA&#x2F;view?embed"
              allowfullscreen="allowfullscreen"
              allow="fullscreen"></iframe>
          </div>
          <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-sT8zVAY&#x2F;NsxxckZuMAMON2atZNiFuA&#x2F;view?utm_content=DAF-sT8zVAY&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link"
            target="_blank"
            rel="noreferrer">Website - Comprehensive Insights</a> by Paigaam dhaliwal
          <br /> <br />
        </ModalBody>
      </Modal>

      { /* right Modal */}
      <Modal isOpen={aptlyModal} toggle={aptlyToggle} centered>
        <ModalHeader aptlyToggle={aptlyToggle}>Aptly Aligned</ModalHeader>
        <ModalBody>
          <div className="iframe-wrapper">
            <iframe loading="lazy"
              title="canva"
              className="iframe-container"
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-saOfNlU&#x2F;67TXHOcC7duik6IlndYBfw&#x2F;view?embed"
              allowfullscreen="allowfullscreen"
              allow="fullscreen"></iframe>
          </div>
          <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-saOfNlU&#x2F;67TXHOcC7duik6IlndYBfw&#x2F;view?utm_content=DAF-saOfNlU&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link"
            target="_blank"
            rel="noreferrer">Website - Aptly Aligned</a> by Paigaam Dhaliwal
          <br /> <br />

        </ModalBody>
      </Modal>

      { /* right Modal */}
      <Modal isOpen={transparentModal} toggle={transparentToggle} centered>
        <ModalHeader transparentToggle={transparentToggle}>Transparent Performance Metrics
        </ModalHeader>
        <ModalBody>
          <div className="iframe-wrapper">
            <iframe loading="lazy"
              title="canva"
              className="iframe-container"
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-sezMliM&#x2F;DqKzFF6nKh1swfGz3ZqmDA&#x2F;view?embed"
              allowfullscreen="allowfullscreen"
              allow="fullscreen"></iframe>
          </div>
          <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-sezMliM&#x2F;DqKzFF6nKh1swfGz3ZqmDA&#x2F;view?utm_content=DAF-sezMliM&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link"
            target="_blank"
            rel="noreferrer">Website - Transparent Performance Metrics</a> by Paigaam dhaliwal
          <br /> <br />

        </ModalBody>
      </Modal>
    </div>
  )
}