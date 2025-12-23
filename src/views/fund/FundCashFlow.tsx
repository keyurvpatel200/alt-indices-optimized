// ** React Imports
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Imports
import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import ReactDatePicker from 'react-datepicker'

// ** Custom Component Import
import CommonDatePicker from '@/components/CommonDatePicker'
import SelectBox from '../../components/SelectBox'
import CommonConfirmationModal from '@/components/common/CommonConfirmationModal'
import { StoreType } from '@/service/store'
import CashFlowChart from './CashFlowChart'

// ** State Schema Import
import {
  createFundCashflow,
  deleteFundCashflow,
  getCashFlowTimeline,
  getFundCashflow,
  getFundCashFlowFinancialMetrics,
  updateFundCashflow
} from './state'

// ** Zod Schema Import
import { cashFlowValidationSchema } from './validations'

// ** Utils Import
import { transactionTypeOptions } from '@/utils/staticData'
import { commonDateFormat, handleCloseModal } from '@/utils/utils'

// ** Interface Import
import { CardData, ICashFlowTimeLine, IFundCashFlowTimeLineApiResponse } from '@/interface/fund'

// ** Asset Import
import Alt from '../../assets/images/alt-logo.svg'
import backArrow from '../../assets/images/back-arrow.svg'
import dateicon from '../../assets/images/date-icon.svg'
import excle from '../../assets/images/excle.svg'
import edit from '../../assets/images/gray-edit-icon.svg'
import Remove from '../../assets/images/remove.svg'
import plus from '../../assets/images/white-plus.svg'
import InputField from '@/components/InputField'

const initialValue: ICashFlowTimeLine = {
  transaction_date: '',
  transaction_type: '',
  amount: '',
  fund: '',
  as_at_date: ''
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip { ...props } classes={ { popper: className } } />
))(( { theme } ) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))

const getCurrentWeek = () => {
  const today = new Date()
  const firstDay = new Date(today.setDate(today.getDate() - today.getDay()))
  const lastDay = new Date(today.setDate(today.getDate() + 6))

  return [firstDay.toISOString().split('T')[0], lastDay.toISOString().split('T')[0]]
}


const FundCashflow: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false)
  const [cashFlowData] = useState<ICashFlowTimeLine>(initialValue)
  const [page] = useState<number>(1)
  const [mode, setMode] = useState<string>('Edit')
  const navigate = useNavigate()
  const { fund_id } = useParams()
  const dispatch = useDispatch()
  const [timelineData, setTimeLineData] = useState<IFundCashFlowTimeLineApiResponse>({
    count: 0,
    next: null,
    previous: null,
    results: []
  })
  const [rangeValue, setRangeValue] = useState<[Date | null | string, Date | null | string] | []>(getCurrentWeek() as [Date | null | string, Date | null | string] | [])
  const datePickerRef = useRef<ReactDatePicker>(null)

  const { loader, typeLoader, financialMetricsDetails } = useSelector((state: StoreType) => ({
    loader: state?.funds?.loader,
    typeLoader: state?.funds?.typeLoader,
    financialMetricsDetails: state?.funds?.financialMetricsDetails
  }))

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    getValues,
    reset,
    clearErrors,
    watch
  } = useForm<ICashFlowTimeLine & { id?: string }>({
    defaultValues: cashFlowData,
    resolver: zodResolver(cashFlowValidationSchema())
  })

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (datePickerRef.current) {
      ;(datePickerRef.current as any).setOpen(true) // Open date picker manually
    }
  }

  const cardData: CardData[] = [
    {
      label: 'IRR (%)',
      value:
        !isNaN(financialMetricsDetails?.irr) && financialMetricsDetails?.irr
          ? financialMetricsDetails?.irr
          : 0,
      description: 'Internal Rate of Return'
    },
    {
      label: 'TVPI (%)',
      value:
        !isNaN(financialMetricsDetails?.tvpi) && financialMetricsDetails?.tvpi
          ? financialMetricsDetails?.tvpi
          : 0,
      description: 'Total Value to Paid-In'
    },
    {
      label: 'DPI (%)',
      value:
        !isNaN(financialMetricsDetails?.dpi) && financialMetricsDetails?.dpi
          ? financialMetricsDetails?.dpi
          : 0,
      description: 'Distributions to Paid-In'
    },
    {
      label: 'RPVI (%)',
      value:
        !isNaN(financialMetricsDetails?.rvpi) && financialMetricsDetails?.rvpi
          ? financialMetricsDetails?.rvpi
          : 0,
      description: 'Rsidual Value to Paid-In'
    }
  ]
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleItemClick = (index: number, id: string) => {
    setActiveIndex(index)
    getFundCashflowApi(id)
  }
  const handleSetData = (data: ICashFlowTimeLine) => {
    Object.keys(data || {}).forEach((key) => {
      setValue(
        key as keyof ICashFlowTimeLine,
        data?.[key as keyof ICashFlowTimeLine]
          ? data?.[key as keyof ICashFlowTimeLine]?.toString()
          : '',
        {
          shouldValidate: true,
          shouldDirty: true
        }
      )
    })
    setIsEditable(false)
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsEditable(true)
  }

  const handleApply = () => {
    setIsEditable(false)
  }

  const handleLoader = (typeLoader: string = 'fundCashFlow', loader: boolean = true) =>
    dispatch({
      type: 'funds/setFundLoader',
      payload: { loader, typeLoader }
    })

  const handleAddNewUpdate = () => {
    reset()
    if (fund_id) {
      handleSetData({ ...initialValue, fund: fund_id })
    }
    setTimeout(() => {
      clearErrors()
    }, 0)
    setMode('Add')
    setIsEditable(true)
  }

  const onConfirm = async () => {
    if (getValues('id')) {
      handleLoader('deleteCashFlowModal')
      const id = getValues('id')
      if (id) {
        await deleteFundCashflow(id).then(() => {
          reset()
          handleApiCall()
          setIsEditable(false)
          handleCloseModal('deleteCashFlowModal')
          handleLoader('deleteCashFlowModal', false)
        }).catch(() => {
          handleLoader('deleteCashFlowModal', false)
        })
      }
    }
  }

  const getFundCashflowApi = async (fund_id: string) => {
    await getFundCashflow(fund_id).then((res) => {
      handleSetData(res as ICashFlowTimeLine)
    })
  }

  const getCashFlowTimeLineData = useCallback(
    async (fund_id: string, page: number) => {
      handleLoader('fundPerformance')
      await getCashFlowTimeline(`page=${page}&fund=${fund_id}`)
        .then((res) => {
          if (Object.keys(res)?.length > 0) {
            setTimeLineData(res)
            setMode('Edit')
            if (res?.results?.at(0)?.id) {
              getFundCashflowApi(res?.results?.at(0)?.id)
            } else {
              handleAddNewUpdate()
            }
          } else {
            handleAddNewUpdate()
          }
          handleLoader('fundPerformance', false)
        })
        .catch(() => {
          handleLoader('fundPerformance', false)
        })
    },
    [fund_id, page]
  )

  const getCashFlowFinancialMetrics = useCallback(
    async (fund_id: string, startDate: string, endDate: string) => {
      handleLoader()
      await getFundCashFlowFinancialMetrics(`fund_id=${fund_id}&start=${startDate}&end=${endDate}`)
        .then((res) => {
          handleLoader('fundCashFlow', false)
          dispatch({
            type: 'funds/setFinancialMetricsDetails',
            payload: res
          })
        })
        .catch(() => {
          handleLoader('fundCashFlow', false)
        })
    },
    [fund_id]
  )

  const handleApiResponse = () => {
    reset()
    handleLoader('updateCashFlowLine', false)
    handleApply()
    handleApiCall()
  }

  const onSubmit = async () => {
    const data: ICashFlowTimeLine = getValues()
    handleLoader('updateCashFlowLine')
    const id = getValues('id')
    if (id && fund_id) {
      await updateFundCashflow(id, {
        ...data,
        as_at_date: commonDateFormat(data?.as_at_date || new Date(), 'YYYY-MM-DD'),
        fund: fund_id,
        transaction_date: commonDateFormat(data?.transaction_date, 'YYYY-MM-DD')
      })
        .then(() => {
          handleApiResponse()
        })
        .catch(() => {
          handleLoader('updateCashFlowLine', false)
        })
    } else {
      if (!fund_id) {
        return
      }
      await createFundCashflow({
        ...data,
        as_at_date: commonDateFormat(data?.as_at_date || new Date(), 'YYYY-MM-DD'),
        fund: fund_id,
        transaction_date: commonDateFormat(data?.transaction_date, 'YYYY-MM-DD')
      })
        .then(() => {
          handleApiResponse()
        })
        .catch(() => {
          handleLoader('updateCashFlowLine', false)
        })
    }
  }

  const handleApiCall = () => {
    if (fund_id) {
      getCashFlowTimeLineData(fund_id, page)
    }
  }

  useEffect(() => {
    if (fund_id) {
      getCashFlowFinancialMetrics(
        fund_id,
        commonDateFormat(rangeValue?.[0] ? rangeValue?.[0] : '', 'YYYY-MM-DD'),
        commonDateFormat(rangeValue?.[1] ? rangeValue?.[1] : '', 'YYYY-MM-DD')
      )
    }
  }, [getCashFlowFinancialMetrics])

  useEffect(() => {
    handleApiCall()
  }, [getCashFlowTimeLineData])

  return (
    <div className='alt-fund-cashflow-wrapper'>
      <div className='add-fund-header'>
        <Link to='/layout/dashboard'>
          <img src={ Alt } alt='' />
        </Link>
        <div className='new-fund-btns'>
          <button className='import-btn'>
            <img src={ excle } alt='' /> Import from Excel
          </button>
          <button
            className='add-update-btn'
            onClick={ (e) => {
              e.preventDefault()
              handleAddNewUpdate()
            } }
          >
            <img src={ plus } alt='' /> Add new update
          </button>
        </div>
      </div>
      <div className='alt-fund-row-section'>
        <div className='alt-left-side'>
          <div className='alt-back-button' onClick={ () => navigate(`/layout/fund/${fund_id}`) }>
            <img src={ backArrow } alt='' />
            Back to Funds
          </div>
          <div className='alt-left-side-title'>
            <label>Since-inception metric</label>
          </div>
          <div className='alt-left-choose-date'>
            <span onClick={ handleClick }>
              <img src={ dateicon } alt='' />
              From {commonDateFormat(rangeValue?.[0] || new Date(), 'MMM-DD')} to{' '}
              {commonDateFormat(rangeValue?.[1] || new Date(), 'MMM-DD')}
            </span>
            <CommonDatePicker
              rangeValue={ rangeValue }
              isRange={ true }
              onChange={ (date) => {
                setRangeValue(date as [Date | null | string, Date | null | string] | [])
                if (
                  fund_id &&
                  (date as [Date | null | string, Date | null | string] | [])?.filter((d) => d)
                    ?.length === 2
                ) {
                  getCashFlowFinancialMetrics(
                    fund_id,
                    commonDateFormat(Array.isArray(date) && date[0] ? date[0] : '', 'YYYY-MM-DD'),
                    commonDateFormat(Array.isArray(date) && date[1] ? date[1] : '', 'YYYY-MM-DD')
                  )
                }
              } }
              datePickerRef={ datePickerRef }
            />
          </div>

          <div className='alt-fund-cashflow-type'>
            <div className='alt-fund-card-list'>
              {cardData.map((card, index) => (
                <div className='alt-fund-card-type' key={ index }>
                  <label>{card.label}</label>
                  <div className='percentage'>{card.value}%</div>
                  <span>{card.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='alt-center-side'>
          <div className='alt-center-side-title'>
            <label>Fund Cashflows Information</label>
          </div>
          <div className='alt-center-chart-bar'>
            <CashFlowChart
              year_data={
                financialMetricsDetails?.cashflow_valuation?.year_data?.length > 0
                  ? financialMetricsDetails?.cashflow_valuation?.year_data
                  : []
              }
              years={
                financialMetricsDetails?.cashflow_valuation?.year_data?.length > 0
                  ? financialMetricsDetails?.cashflow_valuation?.years
                  : []
              }
            />
          </div>
          <div className='alt-center-content'>
            <div className='grid-card'>
              <label>Cumulative Contribution</label>
              <span>
                {financialMetricsDetails?.total_contributions < 0 ? '- $' : '$'}{' '}
                {Math.abs(financialMetricsDetails?.total_contributions || 0).toLocaleString(
                  'en-US'
                )}
              </span>
            </div>
            <div className='grid-card'>
              <label>Cumulative Distribution</label>
              <span>
                {financialMetricsDetails?.total_distributions < 0 ? '- $' : '$'}{' '}
                {Math.abs(financialMetricsDetails?.total_distributions || 0).toLocaleString(
                  'en-US'
                )}
              </span>
            </div>
            <div className='grid-card'>
              <label>Net Cashflow</label>
              <span>
                {financialMetricsDetails?.financialMetricsDetails < 0 ? '- $' : '$'}{' '}
                {Math.abs(financialMetricsDetails?.net_cashflow || 0).toLocaleString('en-US')}
              </span>
            </div>
          </div>
          <form className='alt-center-transaction-details'>
            <div className='alt-center-header mb-2'>
              <label>Transaction Details</label>
              <div className='d-flex flex-row align-items-center'>
                {isEditable ? (
                  <>
                    {mode !== 'Add' && (
                      <button
                        onClick={ (e) => e.preventDefault() }
                        className='alt-delete-btn m-2'
                        data-bs-target='#deleteCashFlowModal'
                        data-bs-toggle='modal'
                        disabled={ loader && typeLoader === 'updateCashFlowLine' }
                      >
                        <img src={ Remove } alt='' /> Delete
                      </button>
                    )}
                    <button
                      type='submit'
                      onClick={ handleSubmit(onSubmit) }
                      disabled={ loader && typeLoader === 'updateCashFlowLine' }
                      className='apply-btn'
                    >
                      {loader && typeLoader === 'updateCashFlowLine' ? 'Loading...' : 'Apply'}
                    </button>
                  </>
                ) : (
                  <button className='edit-btn' onClick={ handleEdit }>
                    <img src={ edit } alt='' /> Edit
                  </button>
                )}
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='row mb-3'>
                <div className='col-sm-12'>
                  <CommonDatePicker
                    label='Transaction Date'
                    value={ watch('transaction_date') }
                    onChange={ (date) => {
                      setValue(
                        'transaction_date',
                        date ? commonDateFormat(date as Date | string, 'YYYY/MM/DD') : ''
                      )
                      trigger('transaction_date')
                    } }
                    disabled={ !isEditable }
                    placeholderText='Click to select a date'
                    errorMessage={ errors.transaction_date?.message }
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-6'>
                  <label>Transaction Type</label>
                  <SelectBox
                    name='transaction_type'
                    isDisabled={ !isEditable }
                    value={ watch('transaction_type') }
                    onChange={ (e) => {
                      setValue('transaction_type', e?.target?.value as string, {
                        shouldValidate: true,
                        shouldDirty: true
                      })
                      trigger('transaction_type')
                    } }
                    renderValue={ (value) => {
                      const selectedOption =
                        transactionTypeOptions?.find((d) => d?.value === value)?.label || ''

                      return (
                        <div style={ { display: 'flex', alignItems: 'center', gap: '5px' } }>
                          {selectedOption}
                          <HtmlTooltip
                            title={
                              <React.Fragment>
                                A {selectedOption} is a request by a venture capital fund for a
                                portion of the capital that investors have committed. It occurs as
                                needed to fund new investments or support existing portfolio
                                companies.
                              </React.Fragment>
                            }
                          >
                            <div>@</div>
                          </HtmlTooltip>
                        </div>
                      )
                    } }
                    options={ transactionTypeOptions }
                    errorMsg={ errors?.transaction_type?.message }
                  />
                </div>
                <div className='col-sm-6'>
                  <label>Transaction Amount</label>
                  <InputField
                    name='amount'
                    onChange={ (e) => {
                      if (
                        e?.target?.value?.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
                          ?.length <= 8
                      ) {
                        setValue(
                          'amount',
                          e?.target?.value?.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
                        )
                        trigger('amount')
                      }
                    } }
                    value={ watch('amount') || '' }
                    className='custom-input'
                    isDisable={ !isEditable }
                    errorMsg={ errors?.amount?.message }
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className='alt-right-side'>
          <div className='timeline-space w-280'>
            <h5>Updates timeline</h5>
            <div className='timeline-vertical-col'>
              <ul>
                {timelineData?.results?.map((item:ICashFlowTimeLine & { id?: string }, index) => (
                  <li
                    key={ index }
                    className={ activeIndex === index ? 'active' : '' }
                    onClick={ () => item?.id?.toString() && handleItemClick(index, item?.id?.toString()) }
                  >
                    <label>{item.as_at_date}</label>
                    <p>Updated</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <CommonConfirmationModal
          modelId={ 'deleteCashFlowModal' }
          title={ 'Are you sure want delete this data?' }
          confirmText={ 'Delete' }
          onConfirm={ onConfirm }
          loader={ loader && typeLoader === 'deleteCashFlowModal' }
        />
      </div>
    </div>
  )
}
export default FundCashflow
