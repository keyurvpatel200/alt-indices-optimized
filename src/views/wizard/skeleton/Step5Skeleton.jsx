import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const Step5OutliersSkeleton = () => {
  return (
    <div className="why-adjust">
      <label>
        <Skeleton width={ 100 } height={ 20 } />
      </label>
      <p>
        <Skeleton width={ 200 } height={ 20 } count={ 3 } />
      </p>
      <span className="help-icon">
        <Skeleton width={ 25 } height={ 25 } circle={ true } />
      </span>
    </div>
  )
}

export const Step5OutliersTableSkeleton = () => {
  return (
    <div className="grid-col">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="grid-header-row" key={ index }>
          <Skeleton width={ 100 } height={ 20 } />
        </div>
      ))}

      {Array.from({ length: 3 }).map((_, index) => (
        <div className="grid-item-row" key={ index }>
          <div className="form-check">
            <Skeleton width={ 25 } height={ 25 } circle={ true } />
          </div>
        </div>
      ))}
    </div>
  )
}

export const Step5OutliersChartSkeleton = () => {
  return (
    <div className="table-header">
      {Array.from({ length: 3 })?.map(d => {
        return (
          <div className="header-cell" key={ d }>
            <Skeleton width={ 100 } height={ 20 } />
          </div>
        )
      })}
    </div>
  )
}

export const Step5SkeletonChart = () => {
  return <Skeleton width={ 700 } height={ 450 } />
}

