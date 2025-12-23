import Skeleton from 'react-loading-skeleton'

const CategoryCardSkeleton = () => {
  return Array.from({ length: 12 }, (_, index) => (
    <div key={ index } className="col-lg-3 col-md-6 col-sm-12 mb-3">
      <div className="category-card">
        <div className="category-card-body">
          <div className="category-content">
            <div className="category-icon-container">
              <Skeleton width={ 20 } height={ 20 } />
            </div>
            <div className="category-name">
              <Skeleton width={ 120 } height={ 16 } />
            </div>
            <div className="category-checkbox-container">
              <Skeleton width={ 20 } height={ 20 } />
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}

export default CategoryCardSkeleton
