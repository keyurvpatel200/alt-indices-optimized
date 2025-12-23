// ** React Imports
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

// ** Third Party Components
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// ** Custom Component Imports
import CommonConfirmationModal from '@/components/common/CommonConfirmationModal'
import CommonDatePicker from '@/components/CommonDatePicker'
import InputField from '@/components/InputField'
import { StoreType } from '@/service/store'
import {
  createFundPerformanceInfo,
  deleteFundPerformanceInfo,
  getFundPerformanceInfo,
  getFundPerformanceTimeline,
  putFundPerformanceInfo
} from './state'

// ** Zod Schema Import
import { fundPerformanceValidationSchema } from './validations'

// ** Utils  Import
import { commonDateFormat, handleCloseModal } from '@/utils/utils'

//** Interface Import
import { FundApiResponse, IFundPerformanceInformation } from '@/interface/fund'

// ** Assets Imports
import CloseIcon from '../../assets/icons/close-icon.svg'
import Alt from '../../assets/images/alt-logo.svg'
import backArrow from '../../assets/images/back-arrow.svg'
import excle from '../../assets/images/excle.svg'
import edit from '../../assets/images/gray-edit-icon.svg'
import Remove from '../../assets/images/remove.svg'
import plus from '../../assets/images/white-plus.svg'

const initialValue: IFundPerformanceInformation = {
  as_at_date: '',
  dpi: '',
  rvpi: '',
  net_irr: '',
  net_multiple: '',
  called: '',
  source: '',
  fund: ''
}

export default function DirectFundPerformance() {
  // ** State
  const { fund_id } = useParams<{ fund_id: string }>()
  const [directFundPerformance] = useState<IFundPerformanceInformation>(initialValue)
  const [isEditable, setIsEditable] = useState(false)
  const [mode, setMode] = useState<string>('Edit')
  const [page] = useState<number>(1)
  const [timelineData, setTimeLineData] = useState<FundApiResponse>({
    count: 0,
    next: null,
    previous: null,
    results: []
  })
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const { loader, typeLoader } = useSelector((state: StoreType) => ({
    loader: state?.funds?.loader,
    typeLoader: state?.funds?.typeLoader
  }))

  // ** Hooks
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    reset,
    getValues,
    clearErrors,
    watch
  } = useForm<IFundPerformanceInformation & { id?: string }>({
    defaultValues: directFundPerformance,
    resolver: zodResolver(fundPerformanceValidationSchema())
  })

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.preventDefault()
    setIsEditable(true)
  }

  const handleLoader = (typeLoader: string = 'fundPerformanceDelete', loader: boolean = true) =>
    dispatch({
      type: 'funds/setFundLoader',
      payload: { loader, typeLoader }
    })

  const onConfirm = async () => {
    if (!getValues('id')?.toString()) {
      return
    }
    handleLoader()
    await deleteFundPerformanceInfo(getValues('id')?.toString())
      .then(() => {
        reset()
        handleApiCall()
        setIsEditable(false)
        handleCloseModal('deleteFundPerformanceModal')
        handleLoader('fundPerformanceDelete', false)
      })
      .catch(() => {
        handleLoader('fundPerformanceDelete', false)
      })
  }

  const handleOnChange = (name: string, value: string | null) => {
    setValue(name as 'as_at_date' | 'dpi' | 'rvpi' | 'net_irr' | 'net_multiple' | 'called' | 'source', value || '', {
      shouldValidate: true,
      shouldDirty: true
    })
    trigger(name as 'as_at_date' | 'dpi' | 'rvpi' | 'net_irr' | 'net_multiple' | 'called' | 'source')
  }

  const handleApiCall = () => {
    if (fund_id) {
      getFundPerformanceTimelineData(fund_id, page)
    }
  }

  const handleSetData = (data: IFundPerformanceInformation) => {
    Object.keys(data || {}).forEach((key: string) => {
      setValue(
        key as 'as_at_date' | 'dpi' | 'rvpi' | 'net_irr' | 'net_multiple' | 'called' | 'source',
        (data?.[key as keyof IFundPerformanceInformation]?.toString() ?? ''),
        {
          shouldValidate: true,
          shouldDirty: true
        }
      )
    })
    setIsEditable(false)
  }

  const handleApiResponse = () => {
    reset()
    handleLoader('updateFundPerformance', false)
    setIsEditable(false)
    handleApiCall()
  }

  const onSubmit = async () => {
    const data: IFundPerformanceInformation = {
      ...getValues(),
    }
    handleLoader('updateFundPerformance')
    if (data?.id) {
      await putFundPerformanceInfo(+data?.id, {
        ...data,
        as_at_date: commonDateFormat(data?.as_at_date, 'YYYY-MM-DD')
      })
        .then(() => {
          handleApiResponse()
        })
        .catch(() => {
          handleLoader('updateFundPerformance', false)
        })
    } else {
      if (!fund_id) {
        return
      }
      await createFundPerformanceInfo({
        ...data,
        fund: fund_id,
        as_at_date: commonDateFormat(data?.as_at_date, 'YYYY-MM-DD')
      })
        .then(() => {
          handleApiResponse()
        })
        .catch(() => {
          handleLoader('updateFundPerformance', false)
        })
    }
  }

  const getFundPerformanceInfoApi = async (id: string) => {
    await getFundPerformanceInfo(id).then((res) => {
      handleSetData(res as IFundPerformanceInformation)
    })
  }

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

  const getFundPerformanceTimelineData = useCallback(
    async (fund_id: string, page: number) => {
      handleLoader('fundPerformance')
      await getFundPerformanceTimeline(`page=${page}&fund=${fund_id}`)
        .then((res) => {
          if (Object.keys(res).length > 0) {
            setTimeLineData(res)
            setMode('Edit')
            if (res?.results?.at(0)?.id) {
              getFundPerformanceInfoApi(res?.results?.at(0)?.id?.toString())
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

  useEffect(() => {
    handleApiCall()
  }, [getFundPerformanceTimelineData])

  return (
    <>
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
      <div className='add-new-fund-row'>
        <div className='w-280'>
          <div className='back-section' onClick={ () => navigate(`/layout/fund/${fund_id}`) }>
            <img src={ backArrow } alt='' /> Back to Funds
          </div>
          <div className='note-section'>
            <div className='note-hdr d-flex flex-row justify-content-between align-items-center w-100 '>
              <span className='fw-bold'>Note</span>
              <span>
                <CloseIcon />
              </span>
            </div>
            <div>
              <p>
                When creating reports, you can either{' '}
                <strong>Direct Submission of Performance Metrics</strong> key metrics like IRR and
                TVPI for quick analysis, or opt for a{' '}
                <strong>Cash Flow Calculation to analyze</strong> all money in and out for a
                detailed view and market comparison.
              </p>
              <p className='opacity-75 mb-0'>
                Should there be discrepancies between the methods, our platform will display a
                warning message; however, no error will be shown on the report page. It remains the
                user&#39;s responsibility to select the most suitable and accurate reporting method.
              </p>
            </div>
          </div>
        </div>
        <form className='add-fund-column'>
          <div className='d-flex flex-row gap-1 justify-content-between align-items-start'>
            <div className='d-flex flex-column'>
              <label className='label-text'>Data update</label>
              <span className='heading-text'>Fund Performance Information</span>
            </div>
            <div className='d-flex flex-row align-items-center'>
              {isEditable ? (
                <>
                  {mode === 'Edit' && (
                    <button
                      onClick={ (e) => e.preventDefault() }
                      className='alt-delete-btn m-2'
                      data-bs-target='#deleteFundPerformanceModal'
                      data-bs-toggle='modal'
                    >
                      <img src={ Remove } alt='' /> Delete
                    </button>
                  )}
                  <button
                    onClick={ handleSubmit(onSubmit) }
                    disabled={ loader && typeLoader === 'updateFundPerformance' }
                    type='submit'
                    className='apply-btn'
                  >
                    {loader && typeLoader === 'updateFundPerformance' ? 'Loading...' : 'Apply'}
                  </button>
                </>
              ) : (
                <button className='edit-btn' onClick={ handleEdit }>
                  <img src={ edit } alt='' /> Edit
                </button>
              )}
            </div>
          </div>
          <div className='add-fund-form'>
            <div className='col-sm-12'>
              <CommonDatePicker
                value={ watch()?.as_at_date }
                label='As At Date'
                name='as_at_date'
                onChange={ (date) => {
                  handleOnChange('as_at_date', (date ? commonDateFormat(date as Date | string) : '') as string)
                } }
                errorMessage={ errors?.as_at_date?.message as string }
                disabled={ !isEditable }
              />
            </div>
            <div className='col-sm-12'>
              <div className='row'>
                <div className='col-sm-6'>
                  <InputField
                    label='Called (%)'
                    name='called'
                    value={ watch('called') }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                      if (+e?.target?.value <= 100) {
                        handleOnChange('called', e?.target?.value as string)
                      }
                    } }
                    errorMsg={ errors?.called?.message }
                    isDisable={ !isEditable }
                  />
                </div>
                <div className='col-sm-6'>
                  <InputField
                    label='DPI (%)'
                    name='dpi'
                    value={ watch('dpi') }
                    onChange={ (e) => {
                      if (+e?.target?.value <= 100) {
                        handleOnChange('dpi', e?.target?.value as string)
                      }
                    } }
                    errorMsg={ errors?.dpi?.message }
                    isDisable={ !isEditable }
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='row'>
                <div className='col-sm-6'>
                  <InputField
                    label='RVPI (%)'
                    name='rvpi'
                    value={ watch('rvpi') }
                    onChange={ (e) => {
                      if (+e?.target?.value <= 100) {
                        handleOnChange('rvpi', e?.target?.value as string)
                      }
                    } }
                    errorMsg={ errors?.rvpi?.message }
                    isDisable={ !isEditable }
                  />
                </div>
                <div className='col-sm-6'>
                  <InputField
                    label='NET Multiple (X)'
                    name='net_multiple'
                    value={ watch('net_multiple') }
                    onChange={ (e) => {
                      handleOnChange('net_multiple', e?.target?.value as string)
                    } }
                    errorMsg={ errors?.net_multiple?.message }
                    isDisable={ !isEditable }
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='row'>
                <div className='col-sm-6'>
                  <InputField
                    label='NET IRR (%)'
                    name='net_irr'
                    value={ watch('net_irr') }
                    onChange={ (e) => {
                      if (+e?.target?.value <= 100) {
                        handleOnChange('net_irr', e?.target?.value as string)
                      }
                    } }
                    errorMsg={ errors?.net_irr?.message }
                    isDisable={ !isEditable }
                  />
                </div>
                <div className='col-sm-6'>
                  <InputField
                    label='Source'
                    name='source'
                    value={ watch('source') }
                    onChange={ (e) => {
                      handleOnChange('source', e?.target?.value as string)
                    } }
                    errorMsg={ errors?.source?.message }
                    isDisable={ !isEditable }
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className='timeline-space w-280'>
          <h5>Updates timeline</h5>
          <div className='timeline-vertical-col'>
            <ul>
              {timelineData?.results?.length > 0 &&
                timelineData?.results?.map((item, index:number) => (
                  <li
                    key={ index }
                    className={ activeIndex == index ? 'active' : '' }
                    onClick={ () => {
                      if(item?.id){
                        setActiveIndex(index)
                        getFundPerformanceInfoApi(item?.id?.toString())
                      }
                    } }
                  >
                    <label>{item.as_at_date}</label>
                    <p>Updated</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <CommonConfirmationModal
          modelId={ 'deleteFundPerformanceModal' }
          title={ 'Are you sure want delete this data?' }
          confirmText={ 'Delete' }
          onConfirm={ onConfirm }
          loader={ loader && typeLoader === 'fundPerformanceDelete' }
        />
      </div>
    </>
  )
}

