import { useEffect, useState } from 'react'
import { FormGroup, Input } from 'reactstrap'

import NewStep2Skeleton from './skeleton/NewStep2Skeleton'
import { SkeletonTheme } from 'react-loading-skeleton'

export default function NewStep2({
  nextStep,
  prevStep,
  widgetData,
  setWidgetData
}) {
  const [loading] = useState(false)
  const assetClasses = ['Venture Capital', 'Private Equity']
  const [selectedAssets, setSelectedAssets] = useState({
    vintage_year: null,
    asset_class: null
  })
  // Generate years dynamically from 1990 to the current year
  const getYearsList = () => {
    const currentYear = new Date().getFullYear()
    let years = []
    for (let i = 1990; i <= currentYear; i++) {
      years.push(i)
    }
    return years
  }

  // Fetch asset data from API or use initial values from selectedAssets
  const fetchLocations = () => {
    const year = widgetData?.[3]?.vintage_year
    const asset = widgetData?.[3]?.asset_class

    setSelectedAssets({
      asset_class: asset,
      vintage_year: year
    })
  }

  useEffect(() => {
    fetchLocations()
  }, [fetchLocations])

  // Handle dropdown change for vintage year
  const handleVintageYearChange = e => {
    setSelectedAssets(prevOptions => ({
      ...prevOptions,
      vintage_year: e.target.value
    }))
  }

  // Handle dropdown change for asset class
  const handleAssetClassChange = e => {
    setSelectedAssets(prevOptions => ({
      ...prevOptions,
      asset_class: e.target.value
    }))
  }

  const handleBack = () => {
    prevStep() // Go to previous step
  }

  // Handle next step and save selected options (PUT request)
  const handleNext = () => {
    const data = {
      ...widgetData,
      '3': selectedAssets,
      step: 4
    }
    setWidgetData(data)
    localStorage.setItem('widgetData', JSON.stringify(data))
    nextStep()
  }

  return loading ? (
    <SkeletonTheme baseColor="#fff" highlightColor="#2f4665">
      <NewStep2Skeleton />
    </SkeletonTheme>
  ) : (
    <div className="step-out step-2-wrap mt-5">
      <div className="search-section-row">
        <label className="steps-counts">3/8 steps</label>
        <h4>What is the vintage year and asset class of the fund?</h4>
      </div>

      <div className="list-of-que">
        <div className="selection-bx">
          <label className="option">Vintage Year:</label>
          <FormGroup className="w-100">
            <Input
              type="select"
              name="vintageYear"
              value={ selectedAssets?.vintage_year || '' }
              onChange={ handleVintageYearChange }
            >
              <option value="" disabled>
                Select Vintage Year
              </option>
              {getYearsList().map(year => (
                <option key={ year } value={ year }>
                  {year}
                </option>
              ))}
            </Input>
          </FormGroup>
          <label className="note">
            Vintage: Defined as the first year of investment/drawdown from the investor.
          </label>
        </div>

        <div className="choose-asset-property">
          <label>Asset Class</label>
          <div>
            <FormGroup className="mb-0">
              {assetClasses.map((assetClass, index) => (
                <div key={ assetClass } className="radio-option">
                  <label className="text-assets-row">
                    <Input
                      type="radio"
                      name="assetClass"
                      value={ assetClass }
                      checked={ selectedAssets?.asset_class === assetClass }
                      onChange={ handleAssetClassChange }
                    />
                    <div>
                      <span>{assetClass}</span>

                      {index === 0 ? (
                        <div className="text-row">
                          Provides capital to new or growing businesses with perceived long-term
                          growth potential.{' '}
                        </div>
                      ) : index === 1 ? (
                        <div className="text-row">
                          Invests in established companies, often with the intention of improving
                          operations and/or financials. Investment often involves the use of
                          leverage.{' '}
                        </div>
                      ) : null}
                    </div>
                  </label>
                </div>
              ))}
            </FormGroup>
          </div>
        </div>
      </div>

      <div className="button-row">
        <button onClick={ handleBack } disabled={ loading } className="back-btn">
          Back
        </button>
        <button onClick={ handleNext } className="btn" disabled={ loading }>
          Next
        </button>
      </div>
    </div>
  )
}
