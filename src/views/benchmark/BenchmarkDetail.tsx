// ** React Imports
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// ** Mui Components Imports
import {
  Chip,
  FormControlLabel,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Radio,
  Tooltip,
  Typography
} from '@mui/material'

// ** Custom Components Imports
import CommonLoader from '@/components/common/CommonLoader'
import { StoreType } from '@/service/store'
import { fetchBenchmarkDetailsApi } from './state'

// ** Assets and CSS Imports
import './banchmark.css'
import InfoIcon from '../../assets/icons/info.svg'
import BenchmarkDetailIcon from '../../assets/icons/benchmark-detail.svg'
import BenchmarkStatisticIcon from '../../assets/icons/benchmark-statistic.svg'
import MethodologyIcon from '../../assets/icons/methodology.svg'
import WarningsIcon from '../../assets/icons/warnings.svg'
import PrivacyIcon from '../../assets/icons/privacy.svg'
import ArrowIcon from '../../assets/icons/arrow-icon.svg'
import { capitalizeFirstLetter } from '@/utils/utils'
import InfoOutline from '../../assets/icons/info-outline.svg'

const BenchmarkDetail = () => {
  const [activeTab, setActiveTab] = useState<number>(1)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedOption, setSelectedOption] = useState('Option 1')
  const [showGridTable, setShowGridTable] = useState(false)
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | SVGSVGElement>(null)

  // **Hooks
  const { id } = useParams()
  const dispatch = useDispatch()

  const { benchmarkDetails, loader, typeLoader } = useSelector((state: StoreType) => ({
    benchmarkDetails: state?.benchmark?.benchmarkDetails,
    loader: state?.benchmark?.loader,
    typeLoader: state?.benchmark?.typeLoader
  }))

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value)
    handleClose()
  }
  const toggleGridTable = () => {
    setShowGridTable(!showGridTable)
  }
  const handlePopoverOpen = (event: React.MouseEvent<HTMLSpanElement>) => {
    setPopoverAnchorEl(event.currentTarget as unknown as SVGSVGElement)
  }
  const handlePopoverClose = () => {
    setPopoverAnchorEl(null)
  }

  const isPopoverOpen = Boolean(popoverAnchorEl)

  const tabs = [
    { name: 'Benchmark Details', icon: <MethodologyIcon /> },
    { name: 'Benchmark Statistic', icon: <BenchmarkStatisticIcon /> },
    { name: 'Methodology and Governance', icon: <BenchmarkDetailIcon /> },
    { name: 'Warnings', icon: <WarningsIcon /> }
  ]

  const commonSetLoading = (
    type: string,
    loader: boolean = false,
    typeLoader: string = 'benchmarkList'
  ) => {
    dispatch({
      type: type,
      payload: { loader, typeLoader }
    })
  }

  const getBenchmarkDetails = useCallback(async (id: string) => {
    commonSetLoading('benchmark/setBenchmarkLoader', true, 'benchmarkDetails')
    await fetchBenchmarkDetailsApi(id)
      .then((res) => {
        dispatch({ type: 'benchmark/setDetails', payload: res?.data })
        commonSetLoading('benchmark/setBenchmarkLoader', false, 'benchmarkDetails')
      })
      .catch(() => {
        commonSetLoading('benchmark/setBenchmarkLoader', false, 'benchmarkDetails')
      })
  }, [])

  useEffect(() => {
    if (id) {
      getBenchmarkDetails(id)
    }
  }, [id])

  return loader && typeLoader === 'benchmarkDetails' ? (
    <div className='common-loader'>
      <CommonLoader />
    </div>
  ) : (
    <div className='alt-benchmark-detail-card'>
      <div className='d-flex flex-row align-items-center justify-content-between w-100 alt-benchmark-header-row'>
        <div className='alt-fund-name'>
          <label>{benchmarkDetails?.benchmark_id}</label>
          <span>{benchmarkDetails?.benchmark_name}</span>
        </div>
        <div className='alt-action-button-row'>
          <button className='privacy-btn shadow-none'>
            <PrivacyIcon /> Privacy
          </button>
          <button className='request-reconstitution-btn' onClick={ handleClick }>
            Request Reconstitution
          </button>
          <Menu
            id='simple-menu'
            anchorEl={ anchorEl }
            keepMounted
            open={ Boolean(anchorEl) }
            onClose={ handleClose }
            anchorOrigin={ {
              vertical: 'bottom',
              horizontal: 'right'
            } }
            transformOrigin={ {
              vertical: 'top',
              horizontal: 'right'
            } }
            sx={ { mt: 1 } }
          >
            <MenuItem className='request-label-row'>
              <ListItemText primary='Who should this benchmark be visible to?' />
              <span onClick={ handlePopoverOpen } style={ { cursor: 'pointer' } }>
                <InfoIcon />
              </span>
              <Popover
                open={ isPopoverOpen }
                anchorEl={ popoverAnchorEl }
                onClose={ handlePopoverClose }
                className='benchmark-popover'
                anchorOrigin={ {
                  vertical: 'bottom',
                  horizontal: 'center'
                } }
                transformOrigin={  {
                  vertical: 'top',
                  horizontal: 'center'
                } }
                sx={ { mt: 1 } }
              >
                <Typography sx={ { p: 2 } }>
                  <strong>Only visible to me:</strong> The benchmark is visible only to the user who
                  created it; e.g., a fund manager creates a benchmark for internal evaluation and
                  stress testing before sharing it.
                  <br /> <br />
                  <strong>Visible to others in the same firm:</strong> The benchmark is shared
                  within the same firm, accessible to colleagues but not external parties; e.g., a
                  firm-wide benchmark helps the investment team compare fund performance across
                  different strategies internally.
                  <br />
                  <br />
                  <strong>Visible to others in the same fund:</strong> The benchmark is accessible
                  to people involved with the fund, such as LPs, GPs, or other authorized
                  stakeholders; e.g., a GP shares a benchmark with LPs to provide insights into how
                  the fund performs relative to its peer set.
                </Typography>
              </Popover>
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={
                  <Radio
                    checked={ selectedOption === 'Option 1' }
                    onChange={ handleOptionChange }
                    value='Option 1'
                  />
                }
                label={ <ListItemText primary='Only visible to me' /> }
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={
                  <Radio
                    checked={ selectedOption === 'Option 2' }
                    onChange={ handleOptionChange }
                    value='Option 2'
                  />
                }
                label={ <ListItemText primary='Visible to others in the same fund' /> }
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={
                  <Radio
                    checked={ selectedOption === 'Option 3' }
                    onChange={ handleOptionChange }
                    value='Option 3'
                  />
                }
                label={ <ListItemText primary='Visible to others in the same firm' /> }
              />
            </MenuItem>
          </Menu>
          <button className='recalculate-btn'>Recalculate Benchmark</button>
        </div>
      </div>

      <div className='d-flex flex-column w-100'>
        <div className='alt-categories-tab'>
          <ul className='parent-tabs'>
            {tabs.map((tab, index) => (
              <li
                key={ index }
                className={ activeTab === index + 1 ? 'active' : '' }
                onClick={ () => setActiveTab(index + 1) }
                style={ { cursor: 'pointer' } }
              >
                {tab.icon} {tab.name}
              </li>
            ))}
          </ul>
        </div>

        <div className='alt-tab-related-categories'>
          {activeTab === 1 && (
            <div className='tab-content'>
              <ul className='inner-content-list'>
                <li>
                  <label>Benchmark Type</label>
                  <span className='eqitity-list'>
                    <Chip
                      className='custom-chip'
                      label={ capitalizeFirstLetter(benchmarkDetails?.benchmark_type) }
                      deleteIcon={
                        <Tooltip
                          className='custom-tooltip'
                          title={
                            <div className='tooltip-content'>
                              <label className='tooltip-label'>
                                {capitalizeFirstLetter(benchmarkDetails?.benchmark_type)} Benchmark Type
                              </label>
                              <p className='tooltip-text'>
                                Compromise between speed and accuracy, ensuring efficient
                                performance without sacrificing too much in either area. It&apos;s
                                ideal for general use cases where a balance between fast processing
                                and good result quality is required, making it a versatile choice
                                for a variety of scenarios.
                              </p>
                            </div>
                          }
                          placement='right'
                        >
                          <InfoOutline />
                        </Tooltip>
                      }
                      onDelete={ () => {} }
                    />
                  </span>
                </li>
                <li>
                  <label>Tags</label>
                  <span className={ 'tag-list special-item' }>
                    {benchmarkDetails?.tags?.length > 0 &&
                      benchmarkDetails?.tags?.map((value: string, i: number) => (
                        <div key={ i } className={ 'tag-item' }>
                          {value}
                        </div>
                      ))}
                  </span>
                </li>
                <li>
                  <label>Fund Selected</label>
                  <span>{benchmarkDetails?.fund_selected}</span>
                </li>
                <li>
                  <label>Benchmark Fund Count</label>
                  <span>{benchmarkDetails?.benchmark_fund_count || 0}</span>
                </li>
                <li>
                  <label>Date Created</label>
                  <span>{benchmarkDetails?.date_created}</span>
                </li>
                <li>
                  <label>Fund Size Range</label>
                  <span>{benchmarkDetails?.date_created}</span>
                </li>
                <li>
                  <label>Sub-strategy</label>
                  <span className='eqitity-list'>
                    <div>{benchmarkDetails?.strategies}</div>
                  </span>
                </li>
                <li>
                  <label>Countries</label>
                  <span className='tag-list special-item'>
                    {benchmarkDetails?.locations?.length > 0 &&
                      benchmarkDetails?.locations?.join(', ')}
                  </span>
                </li>
                <li>
                  <label>Geographic Region</label>
                  <span>{benchmarkDetails?.vintage_year}</span>
                </li>
                <li>
                  <label>Outlier Treatment</label>
                  <span className='eqitity-list'>
                    <div>{benchmarkDetails?.owner}</div>
                  </span>
                </li>
              </ul>
            </div>
          )}
          {activeTab === 2 && (
            <div className='tab-content'>
              <ul className='inner-content-list'>
                <li>
                  <label>Total Number of Peer Funds</label>
                  <span className='eqitity-list'>
                    <div>{benchmarkDetails?.fund}</div>
                  </span>
                </li>
                <li>
                  <label>Funds without Size</label>
                  <span className='tag-list special-item'>
                    <div>{benchmarkDetails?.custom_size_min}</div>
                  </span>
                </li>
                <li>
                  <label>Funds without Performance Figures</label>
                  <span>
                    <div>{benchmarkDetails?.fund}</div>
                  </span>
                </li>
                <li>
                  <label>Funds with Stale Valuation</label>
                  <span>
                    <div>{benchmarkDetails?.fund}</div>
                  </span>
                </li>
                <li>
                  <label>Outliers Detected</label>
                  <span>
                    <div>{benchmarkDetails?.custom_size_max}</div>
                  </span>
                </li>
              </ul>

              <div className='valution-report-chart'>
                <button
                  onClick={ toggleGridTable }
                  className={ `arrow-button ${showGridTable ? 'open' : ''}` }
                >
                  <ArrowIcon /> Valuation Aging Report
                </button>
                {showGridTable && (
                  <div className='valutioin-table-chart'>
                    <div className='grid-table'>
                      <div className='grid-header'>Valuation Period</div>
                      <div className='grid-header'>Number of Funds</div>
                      <div className='grid-cell'>Less than 1 year</div>
                      <div className='grid-cell'>12 Funds</div>
                      <div className='grid-cell'>1-3 years</div>
                      <div className='grid-cell'>8 Funds</div>
                      <div className='grid-cell'>3-5 years</div>
                      <div className='grid-cell'>5 Funds</div>
                      <div className='grid-cell'>More than 5 years</div>
                      <div className='grid-cell'>2 Funds</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div className='tab-content'>
              {/* <div className='nested-tab'>
                <ul className="parent-tabs">
                  {['Material Changes', 'Methodology & Documentation'].map((tab, index) => (
                    <li
                      key={ index + 5 }
                      className={ nestedTab === index + 5 ? 'active' : '' }
                      onClick={ () => setNestedTab(index + 5) }
                      style={ { cursor: 'pointer' } }
                    >
                      {tab}
                    </li>
                  ))}
                </ul>
              </div>              
              <div className='alt-tab-related-categories'>
                {nestedTab === 5 && (
                  <div className='table-container'>
                    <div className='table-row table-header'>
                      <div className='date'>Date <InfoIcon /></div>
                      <div className='datails-of-change'>Details of Change</div>
                      <div className='approved-by'>Approved By <InfoIcon /></div>
                    </div>

                    {mockBenchmarkContentList.map((item, index) => (
                      <div key={ index } className='table-row before-point list-of-content-row'>
                        <div className='date'>
                          <label className='fw-bold fs-12'>{item.event}</label>
                          <span className='fs-14 fw-normal'>{item.date}</span>
                        </div>
                        <div className='datails-of-change'>
                          {item.details}
                        </div>
                        <div className='approved-by approved-by-name d-flex align-items-center'>
                          {item.approvedBy.image ? (
                            <img src={ item.approvedBy.image } alt={ item.approvedBy.name } className='avatar' />
                          ) : (
                            <div className='aprved-avatar'>{item.approvedBy.name}</div>
                          )}
                          <div className='d-flex flex-column'>
                            <label>{item.approvedBy.company}</label>
                            <span>{item.approvedBy.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                )}
                {nestedTab === 6 && (
                  <div className='alt-methodology-row'>
                    <div className='alt-document-card-row'>
                      <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                        <div className='file-avatar'>
                          <ChartIcon />                         
                        </div>
                        <div className='d-flex flex-row justify-content-between align-items-center gap-3'>
                          <span><InfoIcon /></span>
                          <span>
                            <DownloadIcon />
                          </span>
                        </div>
                      </div>   
                      <div className='d-flex flex-column'>
                        <label>Name of pdf document</label>
                        <span>9,8 mb</span>
                      </div>                   
                    </div> 
                    <div className='alt-document-card-row'>
                      <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                        <div className='file-avatar'>
                          <ChartIcon />                         
                        </div>
                        <div className='d-flex flex-row justify-content-between align-items-center gap-3'>
                          <span><InfoIcon /></span>
                          <span>
                            <DownloadIcon />
                          </span>
                        </div>
                      </div>   
                      <div className='d-flex flex-column'>
                        <label>Name of pdf document</label>
                        <span>9,8 mb</span>
                      </div>                   
                    </div> 
                    <div className='alt-document-card-row'>
                      <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                        <div className='file-avatar'>
                          <ChartIcon />                         
                        </div>
                        <div className='d-flex flex-row justify-content-between align-items-center gap-3'>
                          <span><InfoIcon /></span>
                          <span>
                            <DownloadIcon />
                          </span>
                        </div>
                      </div>   
                      <div className='d-flex flex-column'>
                        <label>Name of pdf document</label>
                        <span>9,8 mb</span>
                      </div>
                    </div>                    
                  </div>                    
                )}
              </div> */}

              <p className='w-100 text-center py-4'>Contact to admin </p>
            </div>
          )}
          {activeTab === 4 && (
            <div className='tab-content'>
              <p className='w-100 text-center py-4'>Contact to admin </p>
              {/* <div className='list-of-warnings d-flex flex-column gap-3'>
                {['Security Update Alert', 'Fund Benchmark Update', 'Risk Management'].map((label, index) => (
                  <div className='alt-privacy-notes-row' key={ index }>
                    <div>
                      <InfoIcon />
                    </div>
                    <div className='d-flex flex-column'>
                      <label>{label}</label>
                      <p className='mb-0'>Relevant message for {label}.</p>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          )}
        </div>
      </div>

      {/* {activeTab !== 4 && (
        <div className='alt-privacy-notes-row'>
          <div>
            <InfoIcon />
          </div>
          <div className='d-flex flex-column'>
            <label>Privacy Notice</label>
            <p className='mb-0'>Data displayed in this benchmark is anonymized and subject to restricted access to ensure confidentiality.</p>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default BenchmarkDetail
