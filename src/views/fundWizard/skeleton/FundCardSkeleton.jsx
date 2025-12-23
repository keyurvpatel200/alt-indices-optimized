import Skeleton from 'react-loading-skeleton'

const FundCardSkeleton = () => {
  return Array.from({ length: 8 }, (_, index) => (
    <div key={ index } className="col-lg-3 col-md-6 col-sm-12 mb-3">
      <div className="card fund-card h-100">
        <div className="fund-card-body">
          {/* First Row: Sr Number, Fund Name, Radio Button */}
          <div className="fund-card-row fund-card-header mb-3">
            <div className="fund-card-info">
              <span className="fund-serial-number">
                <Skeleton width={ 25 } height={ 20 } />
              </span>
              <span className="fund-name-truncated">
                <Skeleton width={ 180 } height={ 20 } />
              </span>
            </div>
            <div className="fund-radio-container">
              <Skeleton width={ 20 } height={ 20 } circle={ true } />
            </div>
          </div>
          {/* Fund Details */}
          <div className='d-flex flex-column gap-1'>
            <div className="fund-card-row fund-card-details">
              <span className="fund-label">
                <Skeleton width={ 80 } height={ 16 } />
              </span>
              <span className="fund-value">
                <Skeleton width={ 60 } height={ 16 } />
              </span>
            </div>
            <div className="fund-card-row fund-card-details">
              <span className="fund-label">
                <Skeleton width={ 70 } height={ 16 } />
              </span>
              <span className="fund-value">
                <Skeleton width={ 100 } height={ 16 } />
              </span>
            </div>
            <div className="fund-card-row fund-card-details">
              <span className="fund-label">
                <Skeleton width={ 50 } height={ 16 } />
              </span>
              <span className="fund-value">
                <Skeleton width={ 80 } height={ 16 } />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}

export default FundCardSkeleton
