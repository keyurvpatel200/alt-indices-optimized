import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const Step2SkeletonTitle = () => {
  return (
    <div className="search-section-row">
      <label className="steps-counts">
        <Skeleton width={ 80 } height={ 20 } className="mb-2" />
      </label>
      <h4>
        <Skeleton width={ 600 } height={ 20 } className="mb-1" />
      </h4>
    </div>
  )
}

export const Step2SkeletonContent = () => {
  return (
    <ul className="region-list-row">
      {Array.from({ length: 7 })?.map((location, index) => (
        <li key={ index }>
          {index === 0 ? (
            <div className="text-row">
              <Skeleton width={ 100 } height={ 80 } className="mb-2" />
            </div>
          ) : index === 1 ? (
            <div className="text-row">
              <Skeleton width={ 100 } height={ 80 } className="mb-2" />
            </div>
          ) : index === 2 ? (
            <div className="text-row">
              <Skeleton width={ 100 } height={ 80 } className="mb-2" />
            </div>
          ) : index === 3 ? (
            <div className="text-row">
              <Skeleton width={ 100 } height={ 80 } className="mb-2" />
            </div>
          ) : index === 4 ? (
            <div className="text-row">
              <Skeleton width={ 100 } height={ 80 } className="mb-2" />
            </div>
          ) : index === 5 ? (
            <div className="text-row">
              <Skeleton width={ 100 } height={ 80 } className="mb-2" />
            </div>
          ) : index === 6 ? (
            <div className="text-row">
              <Skeleton width={ 100 } height={ 80 } className="mb-2" />
            </div>
          ) : null}

          <div className="option">
            <Skeleton width={ 50 } height={ 20 } className="mb-2" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export const Step2SkeletonContentInput = () => {
  return (
    <div className="search-row">
      <label>
        <Skeleton width={ 50 } height={ 20 } className="mb-2" />
      </label>
      <Skeleton width={ 600 } height={ 40 } className="mb-2" />
    </div>
  )
}

const Step2Skeleton = () => {
  return Array.from({ length: 10 })?.map((_, index) => (
    <li key={ index }>
      <div className="option">
        <Skeleton width={ 80 } height={ 15 } className="mb-2" />
      </div>
    </li>
  ))
}

export default Step2Skeleton
