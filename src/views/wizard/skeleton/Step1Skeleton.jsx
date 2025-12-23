import Skeleton from 'react-loading-skeleton'

const Step1Skeleton = () => {
  return Array.from({ length: 8 }, (_, index) => (
    <li key={ index }>
      <div>
        <span className="option-number">
          <Skeleton width={ 25 } height={ 27 } />
        </span>
      </div>
      <div className="option">
        <div className="f-name">
          <Skeleton width={ 240 } height={ 20 } className='mb-2' />
        </div>
        <div className="list-of-detl">
          <label>
            <Skeleton width={ 100 } height={ 20 } />:{' '}
            <b>
              <Skeleton width={ 100 } height={ 20 } />
            </b>
          </label>
          <label>
            <Skeleton width={ 100 } height={ 20 } />:{' '}
            <b>
              <Skeleton width={ 100 } height={ 20 } />
            </b>
          </label>
          <label>
            <Skeleton width={ 100 } height={ 20 } />:{' '}
            <b>
              <Skeleton width={ 100 } height={ 20 } />
            </b>
          </label>
        </div>
      </div>
      <div className="checkbox-content">
        <span>
          <svg height="13" width="16">
            <path
              d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
              fill="#88a4c7"
            ></path>
          </svg>
        </span>
      </div>
    </li>
  ))
}

export default Step1Skeleton
