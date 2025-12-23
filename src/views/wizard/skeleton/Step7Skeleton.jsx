import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

import Skeleton from 'react-loading-skeleton'
import CustomScrollbar from '../../../components/CustomScrollbar'

const Step7Skeleton = () => {
  return (
    <div className="performance-content-box">
      <CustomScrollbar height="100vh">
        <div className="p-3">
          <Skeleton width={ 20 } height={ 20 } circle={ true } />
          <div className="question-hdr-row">
            <h6>
              <Skeleton width={ 220 } height={ 20 } count={ 2 } />
            </h6>

            <div className="checkbox-content">
              <div className="white-dot"></div>
              <span>
                <svg height="13" width="16">
                  <path
                    d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
                    fill="#88a4c7"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="paragraph-row">
            <Skeleton width={ 300 } height={ 20 } count={ 3 } />
          </div>
          <div className="second-question-row mt-3">
            <label>
              <Skeleton width={ 120 } height={ 20 } className="mb-2" />
            </label>
            <p>
              <Skeleton width={ 300 } height={ 20 } count={ 3 } />
            </p>
          </div>
          <div>
            <Accordion flush open={ false } toggle={ () => {} }>
              <AccordionItem>
                <AccordionHeader targetId="1">
                  <Skeleton width={ 300 } height={ 20 } className="mt-2" />
                </AccordionHeader>
                <AccordionBody accordionId="1"></AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </CustomScrollbar>
    </div>
  )
}

export default Step7Skeleton
