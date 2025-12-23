// Local imports
import CompanyDetail from './CompanyDetail'
import CompanyList from './CompanyList'

export default function Index () {
  return (
    <>
      <div className="alt-container">
        <div className="company-sidebar">
          <CompanyList/>
        </div>
        <div className="alt-company-details">
          <CompanyDetail/>
        </div>
      </div>
    </>
  )
}