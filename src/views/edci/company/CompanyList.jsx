// External library imports
import { useState } from 'react'

// Local imports
import DoubleCheckSVG from 'icons/check-double-line.svg'
import SearchSVG from 'icons/search-i.svg'
import NotifySVG from 'icons/notifiy.svg'
import BarChartSVG from 'icons/chart-line.svg'
import companies from '../../../data/mock/mockCompaines.json'

export default function CompanyList () {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index)
  }
  return (
    <>
      <div className="alt-card">
        <div className="alt-choose-fund">
          <button className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <BarChartSVG/> Cairn Capital ||
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        <hr/>
        <div className="alt-company-search mt-4">
          <label className="label-row">Companies</label>
          <div className="alt-search-bar mt-3">
            <input type="text" placeholder="Search"/>
            <span className="search-icon">
              <SearchSVG/>
            </span>
          </div>
        </div>
        <button className="alt-add-new-company mt-3"
          data-bs-target="#exampleModalToggle1"
          data-bs-toggle="modal">Add New Company
        </button>
        <button className="alt-notify-company mt-3">Notify All Companies</button>

        <ul className="list-of-company mt-4">
          { companies.map((company, index) => (
            <li key={ index }
              className={ activeIndex === index ? 'active' : '' }
              onClick={ () => handleItemClick(index) }>
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div>{ company.name }</div>
                <div className="d-flex gap-2 align-items-center">
                  { company.year }
                  { company.notifyRequired && (
                    <span className="right-mark  d-flex">
                      <DoubleCheckSVG/>
                    </span>
                  ) }
                  { company.reportComplete && (
                    <span className="notifiy d-flex">
                      <NotifySVG/>
                    </span>
                  ) }
                </div>
              </div>
            </li>
          )) }
        </ul>
      </div>
    </>
  )
}