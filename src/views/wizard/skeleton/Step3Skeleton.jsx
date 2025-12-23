import Skeleton from 'react-loading-skeleton'

const Step3Skeleton = () => {
  return Array.from({ length: 4 }).map((_, index) => {
    return (
      <li key={ index }>
        <div>
          <span className="option-number">
            <Skeleton borderRadius={ 4 } width={ 25 } height={ 25 }  />
          </span>
        </div>
        <div className="option">
          <Skeleton width={ 80 } height={ 20 }  className='mb-1' />
        </div>
        <div className="help-i me-auto">
          <Skeleton width={ 20 } height={ 20 } circle={ true } />
        </div>
        <div className="checkbox-content">
          <Skeleton width={ 20 } height={ 20 } circle={ true } className="mb-2" />
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
    )
  })
}

export default Step3Skeleton
