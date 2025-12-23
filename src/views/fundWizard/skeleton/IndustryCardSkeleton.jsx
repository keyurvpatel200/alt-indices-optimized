import Skeleton from 'react-loading-skeleton'

const IndustryCardSkeleton = () => {
  return (
    <>
      {/* Core Industries skeleton */}
      <div className="w-100 mb-4">
        <div className="mb-3">
          <Skeleton width={ 280 } height={ 20 } />
        </div>
        <div className="row">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={ index } className="col-lg-3 col-md-6 col-sm-12 mb-3">
              <div className="category-card">
                <div className="category-card-body">
                  <div className="category-content">
                    <div className="category-icon-container">
                      <Skeleton width={ 20 } height={ 20 } />
                    </div>
                    <div className="category-name">
                      <Skeleton width={ 140 } height={ 16 } />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Industries list skeleton */}
      <div className="w-100 categories-section">
        <div className="mb-3">
          <Skeleton width={ 150 } height={ 20 } />
        </div>
        <div className="categories-list-container">
          <div className="categories-grid">
            {Array.from({ length: 20 }, (_, index) => (
              <div key={ index } className="category-item">
                <div className="category-item-content">
                  <span className="category-item-name">
                    <Skeleton width={ 120 } height={ 16 } />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default IndustryCardSkeleton
