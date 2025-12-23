// ** React Imports
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from 'icons/search-gray.svg'
// ** Mui Components Imports
// import SearchIcon from '@mui/icons-material/Search'
import {
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'

// ** Third Party Imports
import { debounce } from 'lodash'

// ** Custom Components Imports
import { StoreType } from '../../service/store'
import {
  allRecalculateBenchmarkApi,
  fetchBenchmarkListApi,
  singleRecalculateBenchmarkApi
} from './state'

// ** Interface Imports
import { IBenchmark } from '@/interface/benchmark'

// ** Utils Imports
import { capitalizeFirstLetter } from '@/utils/utils'

// ** Assets and CSS Imports
import InfiniteScroll from 'react-infinite-scroll-component'
import InfoOutline from '../../assets/icons/info-outline.svg'
import './banchmark.css'

export default function Benchmark() {
  const [page, setPage] = useState<number>(0)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [search, setSearch] = useState<string>('')
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [selectAllCheckbox, setSelectAllCheckbox] = useState<boolean>(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [benchmarkList, setBenchmarkList] = useState<IBenchmark[]>([])

  const tagColors = [
    '#F6DADA40',
    '#7EC4CF40',
    '#9CADCE',
    '#7EC4CF',
    '#A133FF',
    '#33FFF5',
    '#FF8C33',
    '#8CFF33',
    '#FF3333',
    '#33FF8C'
  ]

  const tagBorderColors = [
    '#CA787A',
    '#5E939B',
    '#3A5486',
    '#397A84',
    '#A133FF',
    '#33FFF5',
    '#FF8C33',
    '#8CFF33',
    '#FF3333',
    '#33FF8C'
  ]

  const {
    benchmarkData = {},
    loader,
    typeLoader
  } = useSelector((state: StoreType) => ({
    benchmarkData: state?.benchmark?.benchmarkData,
    loader: state?.benchmark?.loader,
    typeLoader: state?.benchmark?.typeLoader
  }))

  console.log(loader,typeLoader)

  const handleNavigate = (id: number) => navigate(`/layout/benchmark/benchmark-details/${id}`)

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

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setSearch(searchTerm)
    }, 1000),
    []
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  const fetchBenchmarkList = useCallback(
    async (page: number, search: string) => {
      commonSetLoading('benchmark/setBenchmarkLoader', true, 'benchmarkList')
      await fetchBenchmarkListApi(`page=${page}${search ? `&search=${search}` : ''}`).then(res => {
        setBenchmarkList([...benchmarkList, ...(res?.results?.data || [])])
        dispatch({
          type: 'benchmark/setList',
          payload: {
            results: [...(benchmarkData?.results || []), ...(res?.results?.data || [])],
            count: res?.count,
            next: '',
            previous: ''
          }
        })

        if (benchmarkData?.results?.length + res?.results?.data.length >= res?.count) {
          setHasMore(false)
        }
        commonSetLoading('benchmark/setBenchmarkLoader', false, 'benchmarkList')
      })
    },
    [page, search, benchmarkData?.results]
  )

  const loadMoreData = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchBenchmarkList(nextPage, search)
  }

  const handleSingleRecalculateBenchmark = async (id: number) => {
    try {
      commonSetLoading('benchmark/setBenchmarkLoader', true, 'benchmarkList')
      await singleRecalculateBenchmarkApi(id).then(() => {
        commonSetLoading('benchmark/setBenchmarkLoader', false, 'benchmarkList')
      })
    } catch (error) {
      console.log('error', error)
      commonSetLoading('benchmark/setBenchmarkLoader', false, 'benchmarkList')
    }
  }

  const handleAllRecalculateBenchmark = async () => {
    try {
      commonSetLoading('benchmark/setBenchmarkLoader', true, 'benchmarkList')
      await allRecalculateBenchmarkApi(selectedIds).then(() => {
        commonSetLoading('benchmark/setBenchmarkLoader', false, 'benchmarkList')
      })
    } catch (error) {
      console.log('error', error)
      commonSetLoading('benchmark/setBenchmarkLoader', false, 'benchmarkList')
    }
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  return (
    <>
      <div className="alt-table-search-header-row d-flex flex-row align-items-center justify-content-between w-100 my-4">
        <div>{benchmarkData?.count} Benchmarks</div>
        <div className="alt-search-bar-row d-flex flex-row gap-3 align-items-center">
          <div className="search-row">
            <SearchIcon />
            <input type="text" placeholder="Search benchmarks" onChange={ handleChange } />
          </div>
          {/* <button className='recalculate-selected-button' disabled={ selectedIds?.length === 0 } >Recalculate Selected</button> */}
          <button
            className="recalculate-selected-button"
            onClick={ handleAllRecalculateBenchmark }
            disabled={ selectedIds?.length === 0 }
          >
            Recalculate All
          </button>
        </div>
      </div>
      <InfiniteScroll
        dataLength={ benchmarkData?.count || 0 }
        next={ loadMoreData }
        hasMore={ hasMore }
        loader={ <div style={ { textAlign: 'center', padding: '20px' } }>Loading more benchmarks...</div> }
        scrollableTarget="scrollableDiv"
      >
        <TableContainer
          className="styled-table-container"
          id="scrollableDiv"
          sx={ {
            // maxHeight: 'calc(100vh - 100px)',
            // overflow: 'auto'
          } }
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  className="styled-table-cell"
                  sx={ {
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    fontSize: '12px'
                  } }
                >
                  <Checkbox
                    sx={ {
                      color: '#D0D5DD',
                      borderRadius: '6px',
                      '&.Mui-checked': {
                        color: '#3A495C'
                      }
                    } }
                    checked={ selectAllCheckbox }
                    onChange={ e => {
                      if (e?.target?.checked) {
                        setSelectedIds(
                          benchmarkData?.results?.map((row: IBenchmark) => row?.id) || []
                        )
                      } else {
                        setSelectedIds([])
                      }
                      setSelectAllCheckbox(e?.target?.checked)
                    } }
                  />
                </TableCell>
                <TableCell
                  className="styled-table-cell"
                  sx={ {
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    fontSize: '12px',
                    lineHeight: 1.2
                  } }
                >
                  Sr.no
                </TableCell>
                <TableCell
                  className="styled-table-cell"
                  sx={ {
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    fontSize: '12px',
                    lineHeight: 1.2
                  } }
                >
                  Benchmark Id
                </TableCell>
                <TableCell
                  className="styled-table-cell"
                  sx={ {
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    fontSize: '12px',
                    lineHeight: 1.2
                  } }
                >
                  Benchmark Name
                </TableCell>
                <TableCell
                  className="styled-table-cell"
                  sx={ {
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    fontSize: '12px',
                    lineHeight: 1.2
                  } }
                >
                  Benchmark Type
                </TableCell>
                <TableCell
                  className="styled-table-cell"
                  sx={ {
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    fontSize: '12px',
                    lineHeight: 1.2
                  } }
                >
                  Tags
                </TableCell>
                <TableCell
                  className="styled-table-cell"
                  sx={ {
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    fontSize: '12px',
                    lineHeight: 1.2
                  } }
                >
                  Fund Selected
                </TableCell>
                <TableCell
                  className="styled-table-cell"
                  sx={ {
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    fontSize: '12px',
                    lineHeight: 1.2
                  } }
                >
                  Benchmark Fund Count
                </TableCell>
                <TableCell
                  className="styled-table-cell"
                  sx={ {
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    fontSize: '12px',
                    lineHeight: 1.2
                  } }
                >
                  Date Created
                </TableCell>
                <TableCell
                  className="styled-table-cell"
                  sx={ {
                    backgroundColor: '#ffffff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    fontSize: '12px',
                    lineHeight: 1.2
                  } }
                >
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {benchmarkData?.results?.map((row: IBenchmark, index: number) => (
                <TableRow key={ `${row?.id}-${index}` }>
                  <TableCell sx={ { fontSize: '12px' } }>
                    <Checkbox
                      sx={ {
                        color: '#D0D5DD',
                        borderRadius: '6px',
                        '&.Mui-checked': {
                          color: '#3A495C'
                        }
                      } }
                      checked={ selectedIds?.includes(row?.id) }
                      onChange={ e => {
                        if (e?.target?.checked) {
                          setSelectedIds([...selectedIds, row?.id])
                        } else {
                          setSelectedIds(selectedIds?.filter(id => id !== row?.id))
                        }
                      } }
                    />
                  </TableCell>
                  <TableCell sx={ { fontSize: '12px' } }>{index + 1}</TableCell>
                  <TableCell sx={ { fontSize: '12px' } } onClick={ () => handleNavigate(+row?.id) }>{row.benchmark_id}</TableCell>
                  <TableCell sx={ { fontSize: '12px' } } onClick={ () => handleNavigate(+row?.id) }>
                    <Link
                      to={ `/layout/benchmark/benchmark-details/${row?.id}` }
                      style={ { textDecoration: 'none', color: 'inherit' } }
                    >
                      {row?.benchmark_name}
                    </Link>
                  </TableCell>
                  <TableCell sx={ { fontSize: '12px' } }>
                    <Chip
                      className="custom-chip"
                      label={ capitalizeFirstLetter(row.benchmark_type) }
                      sx={ {
                        marginRight: '4px',
                        backgroundColor: 'transparent',
                        border: '1px solid #d0d5dd',
                        color: '#344054',
                        borderRadius: '4px',
                        boxShadow: '0px 1px 2px 0px #1018280d',
                        height: '20px',
                        fontSize: '12px',
                        fontWeight: 500,                       
                        '& .MuiChip-label': {
                          padding: '0 6px',
                          lineHeight: 1
                        },
                        '& .MuiChip-deleteIcon': {
                          width: '11px',
                          height: '11px',
                          margin: '0 2px 0 0'
                        }
                      } }
                      deleteIcon={
                        <Tooltip
                          className="custom-tooltip"
                          title={
                            <div className="tooltip-content">
                              <label className="tooltip-label">
                                {capitalizeFirstLetter(row.benchmark_type)} Benchmark Type
                              </label>
                              <p className="tooltip-text">
                                Compromise between speed and accuracy, ensuring efficient performance
                                without sacrificing too much in either area. It&aposs ideal for general
                                use cases where a balance between fast processing and good result quality
                                is required, making it a versatile choice for a variety of scenarios.
                              </p>
                            </div>
                          }
                          placement="right"
                        >
                          <InfoOutline />
                        </Tooltip>
                      }
                      onDelete={ () => {} }
                    />
                  </TableCell>
                  <TableCell sx={ { fontSize: '12px' } }>
                    {Array.isArray(row?.tags) &&
                      row?.tags?.length > 0 &&
                      row?.tags?.map((tag: string, idx: number) => (
                        <Chip
                          key={ idx }
                          label={ tag }
                          style={ {
                            marginRight: 4,
                            backgroundColor: tagColors[idx % tagColors.length],
                            border: '1px solid white',
                            borderColor: tagBorderColors[idx % tagBorderColors.length],
                            color: '#0F4E7E',
                            fontWeight: 600,
                            borderRadius: '3px',
                            height: '20px',
                            fontSize: '12px',
                            marginBlock: '4px',
                            textTransform: 'capitalize'
                          } }
                        />
                      ))}
                  </TableCell>
                  <TableCell sx={ { fontSize: '12px' } }>Fund {row?.fund_selected}</TableCell>
                  <TableCell sx={ { fontSize: '12px' } }>{row?.benchmark_fund_count || 0}</TableCell>
                  <TableCell sx={ { fontSize: '12px' } }>{row?.date_created}</TableCell>
                  <TableCell sx={ { fontSize: '12px' } }>
                    <button
                      className="recalculate-button"
                      onClick={ () => handleSingleRecalculateBenchmark(row?.id) }
                    >
                      Recalculate
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </>
  )
}
