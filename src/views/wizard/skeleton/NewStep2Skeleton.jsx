import Skeleton from 'react-loading-skeleton'
import { FormGroup } from 'reactstrap'

const NewStep2Skeleton = () => {
  const assetClasses = ['Venture Capital', 'Private Equity']
  return (
    <div className="step-out step-2-wrap mt-5">
      <div className="search-section-row">
        <label className="steps-counts">
          <Skeleton width={ 80 } height={ 20 } className="mb-2" />
        </label>
        <h4>
          <Skeleton width={ 600 } height={ 20 } className="mb-1" />
        </h4>
      </div>
      <div className="list-of-que">
        <div className="selection-bx">
          <label className="option">
            <Skeleton width={ 80 } height={ 20 } className="mb-2" />
          </label>
          <Skeleton width={ 600 } height={ 40 } className="mb-2" />
          <label className="note">
            <Skeleton width={ 400 } height={ 20 } className="mb-2" />
          </label>
        </div>

        <div className="choose-asset-property">
          <label>
            <Skeleton width={ 80 } height={ 20 } className="mb-2" />
          </label>
          <div>
            <FormGroup className="mb-0">
              {assetClasses.map((assetClass, index) => (
                <div key={ assetClass } className="radio-option">
                  <label className="text-assets-row">
                    <Skeleton width={ 20 } height={ 20 } circle={ true } />
                    <div>
                      <span>
                        <Skeleton width={ 200 } height={ 20 } className="mb-2" />
                      </span>

                      {index === 0 ? (
                        <Skeleton width={ 500 } height={ 20 } className="mb-1" />
                      ) : index === 1 ? (
                        <div className="text-row">
                          <Skeleton width={ 500 } height={ 20 } className="mb-1" />
                        </div>
                      ) : null}
                    </div>
                  </label>
                </div>
              ))}
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewStep2Skeleton
