import { useCallback, useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { IconButton, Menu, MenuItem } from '@mui/material'
import plus from '../../assets/images/round-add-icon.svg'
import './reports.css'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '@/service/store'
import { debounce } from 'lodash'
import { fetchBenchmarkListApi } from '../benchmark/state'
import { fetchFundsListApi } from '../fund/state'
import { IBenchmark } from '@/interface/benchmark'
import CommonLoader from '@/components/common/CommonLoader'
import { IFundDetails } from '@/interface/fund'
import { createReportTabData } from '@/utils/staticData'
import CustomScrollbar from '@/components/CustomScrollbar'

export default function ReportList() {
  const [page] = useState<number>(1)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [activeTab, setActiveTab] = useState('benchmarks')
  const open = Boolean(anchorEl)
  const [search, setSearch] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  const dispatch = useDispatch()

  const {
    benchmarkData = {},
    loader,
    typeLoader,
    fundsList
  } = useSelector((state: StoreType) => ({
    fundsList: state?.funds?.fundData?.results,
    benchmarkData: state?.benchmark?.benchmarkData,
    loader: state?.benchmark?.loader,
    typeLoader: state?.benchmark?.typeLoader
  }))

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setSearch(searchTerm)
    }, 1000),
    []
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
    setSearchValue(e.target.value)
  }

  const dragItems = [
    { name: 'Dispersion Graph', icon: plus },
    { name: 'Performance Table', icon: plus },
    { name: 'Risk Chart', icon: plus },
    { name: 'Summary Note', icon: plus }
  ]

  const dragFundItemsOne = [
    { name: 'Dispersion Graph', icon: plus },
    { name: 'Performance Table', icon: plus }
  ]

  console.log(dragFundItemsOne)

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

  const fetchBenchmarkAndFundList = useCallback(
    async (page: number, search: string, activeTab: string) => {
      if (activeTab === 'benchmarks') {
        commonSetLoading('benchmark/setBenchmarkLoader', true, 'benchmarkList')
        await fetchBenchmarkListApi(`page=${page}${search ? `&search=${search}` : ''}`).then(
          res => {
            dispatch({
              type: 'benchmark/setList',
              payload: {
                results: res?.results?.data,
                count: res?.count,
                next: '',
                previous: ''
              }
            })
            commonSetLoading('benchmark/setBenchmarkLoader', false, 'benchmarkList')
          }
        )
      } else if (activeTab === 'fund') {
        commonSetLoading('benchmark/setBenchmarkLoader', true, 'benchmarkList')
        await fetchFundsListApi(1, search)
          .then(response => {
            dispatch({ type: 'funds/setList', payload: response })
            commonSetLoading('benchmark/setBenchmarkLoader', false, 'benchmarkList')
          })
          .catch(() => {
            commonSetLoading('benchmark/setBenchmarkLoader', false, 'benchmarkList')
          })
      }
    },
    [page, search, activeTab]
  )

  useEffect(() => {
    if (page) {
      fetchBenchmarkAndFundList(page, search, activeTab)
    }
  }, [fetchBenchmarkAndFundList])

  return (
    <div className="create-fund-report-wrapper">
      <div className="element-to-create-fund-report">
        <div className="d-flex flex-column px-3">
          <div className="create-fund-report-title">
            <h3>Reports</h3>
            <div>
              <IconButton onClick={ handleMenuClick }>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                anchorEl={ anchorEl }
                open={ open }
                onClose={ handleMenuClose }
                anchorOrigin={ {
                  vertical: 'top',
                  horizontal: 'right'
                } }
                transformOrigin={ {
                  vertical: 'top',
                  horizontal: 'right'
                } }
              >
                <MenuItem onClick={ handleMenuClose }>Option 1</MenuItem>
                <MenuItem onClick={ handleMenuClose }>Option 2</MenuItem>
                <MenuItem onClick={ handleMenuClose }>Option 3</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="option-fund-report">
            <ul>
              {createReportTabData?.map(d => {
                return (
                  <li
                    key={ d }
                    className={ `${activeTab === d?.toLocaleLowerCase() ? 'active' : ''}` }
                    onClick={ () => {
                      setSearchValue('')
                      setSearch('')
                      setActiveTab(d?.toLocaleLowerCase())
                    } }
                  >
                    {d}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="search-component-fund-report">
            <input
              type="text"
              value={ searchValue }
              onChange={ handleChange }
              placeholder="Search components"
            />
            <img src={ plus } alt="Search icon" />
          </div>
          <div className="list-of-fund-cards">
            <ul>
              <li>
                <span>
                  <img src={ plus } alt="" />
                </span>
                Graphs
              </li>
              <li>
                <span>
                  <img src={ plus } alt="" />
                </span>
                Tables
              </li>

              <li>
                <span>
                  <img src={ plus } alt="" />
                </span>
                Notes
              </li>

              <li>
                <span onClick={ handleMenuClick }>
                  <img src={ plus } alt="" />
                </span>
                Others
                <Menu
                  anchorEl={ anchorEl }
                  open={ open }
                  onClose={ handleMenuClose }
                  anchorOrigin={ {
                    vertical: 'top',
                    horizontal: 'right'
                  } }
                  transformOrigin={ {
                    vertical: 'top',
                    horizontal: 'right'
                  } }
                >
                  <MenuItem onClick={ handleMenuClose }>Option 1</MenuItem>
                  <MenuItem onClick={ handleMenuClose }>Option 2</MenuItem>
                  <MenuItem onClick={ handleMenuClose }>Option 3</MenuItem>
                </Menu>
              </li>
            </ul>
          </div>
        </div>

        <CustomScrollbar height="calc(100vh - 390px)">
          <div className="drag-and-drop-fund-report-container">
            {loader && typeLoader === 'benchmarkList' ? (
              <div className="common-loader">
                <CommonLoader />
              </div>
            ) : activeTab === 'benchmarks' ? (
              benchmarkData?.results?.map((row: IBenchmark, index: number) => {
                return (
                  <div className="drag-and-drop-fund-report-card" key={ index }>
                    <div className="drag-and-drop-fund-report-card-title">
                      <div className="drag-left-bar">
                        <div className="drag-left-bar-img-icon">
                          <img src={ plus } alt="" />
                        </div>
                        <div className="drag-left-bar-text">
                          <span>
                            {/* Equity Growth Fund <label>BM-001</label> */}
                            {row?.benchmark_name}
                          </span>
                          <div>
                            <ul>
                              {row?.strategy?.map((d: string) => {
                                return <li key={ d }>{d}</li>
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <button className="drag-add-all-button">
                        <span>
                          <img src={ plus } alt="" />
                        </span>
                        Add all
                      </button>
                    </div>
                    <div className="drag-related-items-boxes-row">
                      {dragItems.map((item, idx) => (
                        <div className="each-drag-item" key={ idx }>
                          <div className="drag-item-icon">
                            <img src={ item.icon } alt={ `${item.name} icon` } />
                          </div>
                          <div className="drag-item-text">
                            <span>{item.name}</span>
                            <button className="item-info">
                              <img src={ plus } alt="info icon" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="load-more-item-card">
                      <img src={ plus } alt="info icon" /> See 7 more components
                    </div>
                  </div>
                )
              })
            ) : activeTab === 'fund' ? (
              fundsList?.map((row: IFundDetails, index: number) => {
                return (
                  <div className="drag-and-drop-fund-report-card" key={ index }>
                    <div className="drag-and-drop-fund-report-card-title">
                      <div className="drag-left-bar">
                        <div className="drag-left-bar-img-icon">
                          <img src={ plus } alt="" />
                        </div>
                        <div className="drag-left-bar-text">
                          <span>
                            {/* Equity Growth Fund <label>BM-001</label> */}
                            {row?.name}
                          </span>
                          <div>
                            <ul>
                              {(row?.strategy || [])?.map((d: string) => {
                                return <li key={ d }>{d}</li>
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <button className="drag-add-all-button">
                        <span>
                          <img src={ plus } alt="" />
                        </span>
                        Add all
                      </button>
                    </div>
                    <div className="drag-related-items-boxes-row">
                      {dragItems.map((item, idx) => (
                        <div className="each-drag-item" key={ idx }>
                          <div className="drag-item-icon">
                            <img src={ item.icon } alt={ `${item.name} icon` } />
                          </div>
                          <div className="drag-item-text">
                            <span>{item.name}</span>
                            <button className="item-info">
                              <img src={ plus } alt="info icon" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="load-more-item-card">
                      <img src={ plus } alt="info icon" /> See 7 more components
                    </div>
                  </div>
                )
              })
            ) : (
              ''
            )}

            {/* <div className="drag-and-drop-fund-report-card">
              <div className="drag-and-drop-fund-report-card-title">
                <div className="drag-left-bar">
                  <div className="drag-left-bar-img-icon">
                    <img src={ plus } alt="" />
                  </div>
                  <div className="drag-left-bar-text">
                    <span>
                      Sustainable index <label>BM-002</label>
                    </span>
                    <div>
                      <ul>
                        <li>Green</li>
                        <li>Low Risk</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button className="drag-add-all-button">
                  <span>
                    <img src={ plus } alt="" />
                  </span>
                  Add all
                </button>
              </div>
              <div className="drag-related-items-boxes-row">
                {dragFundItemsOne.map((item, idx) => (
                  <div className="each-drag-item" key={idx}>
                    <div className="drag-item-icon">
                      <img src={ item .icon} alt={`${item.name} icon`} />
                    </div>
                    <div className="drag-item-text">
                      <span>{item.name}</span>
                      <button className="item-info">
                        <img src={ plus } alt="info icon" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="drag-and-drop-fund-report-card">
              <div className="drag-and-drop-fund-report-card-title">
                <div className="drag-left-bar">
                  <div className="drag-left-bar-img-icon">
                    <img src={ plus } alt="" />
                  </div>
                  <div className="drag-left-bar-text">
                    <span>
                      Sustainable index <label>BM-002</label>
                    </span>
                    <div>
                      <ul>
                        <li>Green</li>
                        <li>Low Risk</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button className="drag-add-all-button">
                  <span>
                    <img src={ plus } alt="" />
                  </span>
                  Add all
                </button>
              </div>
            </div> */}
          </div>
        </CustomScrollbar>
      </div>
      <div className="set-element-to-create-fund-report"></div>
    </div>
  )
}
