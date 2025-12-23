import Skeleton from 'react-loading-skeleton'

const BenchmarkCardSkeleton = () => {
  return Array.from({ length: 6 }, (_, index) => (
    <div key={ index } className="col-lg-4 col-md-6 col-sm-12 mb-3">
      <div className="card fund-card h-100">
        <div className="fund-card-body">
          {/* First Row: Sr Number, Benchmark Name, Radio Button */}
          <div className="fund-card-row fund-card-header mb-3">
            <div className="fund-card-info">
              <span className="fund-serial-number">
                <Skeleton width={ 25 } height={ 20 } />
              </span>
              <span className="fund-name-truncated">
                <Skeleton width={ 200 } height={ 20 } />
              </span>
            </div>
            <div className="fund-radio-container">
              <Skeleton width={ 20 } height={ 20 } circle={ true } />
            </div>
          </div>
          {/* Benchmark Details Rows */}
          <div className='fund-details-container'>
            <div className="fund-card-row fund-card-details">
              <span className="fund-label">
                <Skeleton width={ 100 } height={ 16 } />
              </span>
              <span className="fund-value">
                <Skeleton width={ 80 } height={ 16 } />
              </span>
            </div>
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
                <Skeleton width={ 60 } height={ 16 } />
              </span>
              <span className="fund-value">
                <Skeleton width={ 120 } height={ 16 } />
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
                <Skeleton width={ 140 } height={ 16 } />
              </span>
              <span className="fund-value">
                <Skeleton width={ 40 } height={ 16 } />
              </span>
            </div>
          </div>

          {/* HR Line */}
          <hr className="fund-divider" />

          {/* Tags Row */}
          <div className="fund-tags-container">
            <Skeleton width={ 80 } height={ 24 } className="me-2 mb-1" />
            <Skeleton width={ 100 } height={ 24 } className="me-2 mb-1" />
            <Skeleton width={ 90 } height={ 24 } className="me-2 mb-1" />
          </div>
        </div>
      </div>
    </div>
  ))
}

export default BenchmarkCardSkeleton
