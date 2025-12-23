// External library imports
import { useEffect, useState } from 'react'

// Local imports
import categories from '../categories.json'
import jsonData from '../../../data/mock/mock.json'
import EditSVG from 'icons/pencil-fill.svg'
import ShareSVG from 'icons/share-link.svg'
import UserAddSVG from 'icons/user-add.svg'
import DoubleCheckSVG from 'icons/check-double-line.svg'

export default function CompanyDetail () {
  const [data, setData] = useState([])
  useEffect(() => {
    setData(jsonData)
  }, [])

  const [activeTab, setActiveTab] = useState(0)
  const [activeInnerTab, setActiveInnerTab] = useState(0)
  const [step, setStep] = useState(1)
  const handleContinue = () => setStep((prevStep) => prevStep + 1)
  const handleGoBack = () => setStep((prevStep) => prevStep - 1)
  const [parentData, setParentData] = useState(null)
  const handleInnerTabClick = (categoryIndex, stepIndex) => {
    setActiveInnerTab(stepIndex)
  }
  const [inputValue, setInputValue] = useState('') // State for input value

  const handleCopyClick = () => {
    navigator.clipboard.writeText(inputValue)
  }

  return (
    <div className="alt-edci-form-detail">
      <div className="company-edci">
        <div className="alt-cmpy-name">
          Company 1
        </div>
        <div className="alt-action-button-row gap-2">
          <span className="p-2 cursor-pointer"><EditSVG/></span>
          <button className="share-btn"
            data-bs-target="#exampleModalToggle"
            data-bs-toggle="modal">Share
          </button>
          <div className="select-submitted-year">
            <button className="dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              2024 year
              <label className="d-flex flex-row gap-1"><span className="right-mark  d-flex">
                <DoubleCheckSVG/>
              </span> submitted</label>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#">2024 year</a></li>
              <li><a className="dropdown-item" href="#">2024 year</a></li>
              <li><a className="dropdown-item" href="#">2024 year</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="categories-tabs">
        <div className="alt-categories-tab">
          <ul className="parent-tabs">
            { categories.slice(0, 4).map((category, index) => (
              <li key={ index } onClick={ () => {
                setActiveTab(index)
                setActiveInnerTab(0)
                setParentData(null)
              } } className={ activeTab === index ? 'active' : '' }>
                { category.name }
              </li>
            )) }
          </ul>
        </div>

        <div className="tab-content">
          { activeTab === 3 ? (
            <div className="last-categories-inner-tabs">
              <ul className="inner-tabs">
                { categories.slice(4).map((category, index) => (
                  <li key={ index }
                    onClick={ () => setActiveInnerTab(index) }
                    className={ activeInnerTab === index ? 'active' : '' }>
                    { category.name }
                  </li>
                )) }
              </ul>
              <div className="inner-tab-content">
                { categories[activeTab + 1 + activeInnerTab]?.steps ? (
                  <ul className="d-flex flex-column">
                    { categories[activeTab + 1 + activeInnerTab].steps.map((step, idx) => (
                      <li key={ idx }>
                        <label>{ step }:</label>
                        <span>{ `Details for ${ step }` }</span>
                      </li>
                    )) }
                  </ul>
                ) : (
                  <div>No steps available for this category.</div>
                ) }
              </div>
            </div>
          ) : (
            categories[activeTab]?.steps ? (
              <>
                <ul className="inner-tabs">
                  { categories[activeTab].steps.map((step, index) => (
                    <li key={ index }
                      onClick={ () => handleInnerTabClick(activeTab, index) }
                      className={ activeInnerTab === index ? 'active' : '' }>
                      { step }
                    </li>
                  )) }
                </ul>

                <div className="inner-tab-content">
                  { parentData ? (
                    <ul className="edci-form-data">
                      { parentData.map((item, index) => (
                        <li key={ index }>
                          <label>{ item.label }:</label>
                          <span>{ item.value }</span>
                        </li>
                      )) }
                    </ul>
                  ) : (
                    <ul className="edci-form-data">
                      { Object.entries(data).map(([key, value], index) => (
                        <li key={ index }>
                          <label>{ key.replace(/([a-z])([A-Z])/g, '$1 $2') }</label> {/* Add spaces for camelCase */ }
                          <span>{ value }</span>
                        </li>
                      )) }
                    </ul>
                  ) }
                </div>
              </>
            ) : (
              <div className="parent-tab-content">
                <ul className="edci-form-data">
                  { Object.entries(data).map(([key, value], index) => (
                    <li key={ index }>
                      <label>{ key.replace(/([a-z])([A-Z])/g, '$1 $2') }</label> {/* Add spaces for camelCase */ }
                      <span>{ value }</span>
                    </li>
                  )) }
                </ul>
              </div>
            )
          ) }
        </div>
      </div>

      <div className="modal fade pin-drop-dailog"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4 w-100 justify-content-between d-flex align-items-center pe-3"
                id="exampleModalToggleLabel">
                Share form link
                <span className="fs-6 d-flex gap-2 copy-link"
                  onClick={ handleCopyClick }><ShareSVG/>Copy link</span>
              </h1>
              <button type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body pb-4 fs-6">
              <div className="d-flex flex-row justify-content-between gap-2 share-email-box">
                <span>
                  <input type="text"
                    placeholder="Enter email"
                    value={ inputValue }
                    onChange={ (e) => setInputValue(e.target.value) }/>
                  <UserAddSVG/>
                </span>
                <button className="btn share-link"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal">
                  Share link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade pin-drop-dailog"
        id="exampleModalToggle1"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel1"
        tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4 w-100 justify-content-between d-flex align-items-center pe-3"
                id="exampleModalToggleLabel1">
                Add New Company </h1>
              <button type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body fs-6">
              <form className="request-form">
                {/* Step 1 */ }
                { step === 1 && (
                  <div className="first-step">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input type="text"/>
                    </div>
                    <div className="form-group">
                      <label>Contact person</label>
                      <input type="text"/>
                    </div>
                    <div className="form-group">
                      <label>Email ID:</label>
                      <input type="text"/>
                    </div>
                    <div className="form-group">
                      <label>Secret code:</label>
                      <input type="text"/>
                    </div>
                  </div>
                ) }

                {/* Step 2 */ }
                { step === 2 && (
                  <div className="first-step">
                    <div className="form-group">
                      <label>Company manager</label>
                      <input type="text"/>
                    </div>
                    <div className="form-group">
                      <label>Email Company manager</label>
                      <input type="text"/>
                    </div>
                  </div>
                ) }

                {/* Footer */ }
                <div className="modal-footer pt-4 px-0">
                  <label>{ step }/2</label>

                  { step === 2 && (
                    <button type="button" className="btn go-back-btn ms-2" onClick={ handleGoBack }>
                      Go back </button>
                  ) }

                  { step === 1 ? (
                    <button type="button"
                      className="btn share-link ms-2"
                      onClick={ handleContinue }>
                      Continue </button>
                  ) : (
                    <button className="btn share-link ms-2" type="submit">
                      Request </button>
                  ) }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}