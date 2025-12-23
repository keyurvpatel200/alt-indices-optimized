import { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import AboutImg from '../../../assets/landing/group-img.svg'

export default function StartUp() {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  return (
    <div className="startup-wrapper" id="startup">
      <div className="container">
        <div className="cover-img">
          <img src={AboutImg} alt="company" loading="lazy" />
        </div>
        <div className="about-contain">
          <h3>Roadmap for Navigating Transperancy</h3>
          <p>Alt Indices ensures reliable evaluations of private market outperformance by offering
            transparent benchmarks and establishing a common yardstick for comparison—an essential
            factor in making well-informed investment decisions. By eradicating malpractices in
            performance reporting, our platform fosters a standardized approach, thwarting
            manipulations like the &apos;time-zero&apos; assumption.</p>
          <ul>
            <li><b>Countering distortions</b> caused by financial products like Subscription Lines
              of Credit.
            </li>
            <li>Provide a <b>fair evaluation</b> of fund manager performance amid skewed incentive
              structures and over-reliance on IRR.
            </li>
            <li>Addressing <b>disintermediation risks</b> by shedding light on the &apos;Lemons Proble&apos;m
              in co-investing, exposing potential adverse selection issues, and providing clarity on
              the performance of both direct investing and co-investing.
            </li>
            <li>Confidently navigate the intricacies of performance analysis in private markets, <b>select
              suitable methods</b> from the PME Zoo, where terminology commonly varies between
              academia and industry practices.
            </li>
            <li>Curbing the practice of shopping for benchmarks, to ensure <b>consistency and
              comparability</b> in performance reporting.
            </li>
          </ul>
          <button className="read-btn" onClick={toggle}>Read our Whitepaper</button>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <div className="iframe-wrapper">
            <iframe loading="lazy"
              title="canva"
              className="iframe-container"
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-sR__0Zw&#x2F;IajdCLrl0xHN4ToYHYBFEg&#x2F;view?embed"
              allowfullscreen="allowfullscreen"
              allow="fullscreen"></iframe>
          </div>

          <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-sR_0Zw&#x2F;IajdCLrl0xHN4ToYHYBFEg&#x2F;view?utm_content=DAF-sR_0Zw&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link"
            target="_blank"
            rel="noreferrer">Website - Whitepaper</a> by Paigaam dhaliwal
          <br /> <br />
        </ModalBody>
      </Modal>
    </div>
  )
}