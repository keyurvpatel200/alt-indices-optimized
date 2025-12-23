import Skeleton from 'react-loading-skeleton'

export const Step4ChartSkeleton = () => {
  return (
    <div>
      <div>
        <fieldset>
          <legend>
            <Skeleton width={ 150 } height={ 20 } />
            <div className="help-i me-auto">
              <Skeleton width={ 25 } height={ 25 } circle={ true } />
            </div>
          </legend>
          <div className="chart-label">
            {['fund_percentage', 'size_percentage'].map(value => (
              <label key={ value }>
                <Skeleton width={ 25 } height={ 25 } circle={ true } />
                <Skeleton width={ 100 } height={ 20 } />
                <div className="help-i me-auto">
                  <Skeleton width={ 25 } height={ 25 } circle={ true } />
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <Skeleton width={ 700 } height={ 400 } />
    </div>
  )
}

const Step4Skeleton = () => {
  return (
    <ul className="fund-size-list">
      {/* Render the options dynamically */}
      {Array.from({ length: 4 }).map((_, index) => (
        <li key={ index }>
          <div>
            <span className="option-number">
              <Skeleton width={ 25 } height={ 25 } borderRadius={ 4 } />
            </span>
          </div>
          <div className="option">
            <Skeleton width={ 200 } height={ 20 } />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Step4Skeleton
