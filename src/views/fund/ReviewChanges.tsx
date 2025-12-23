import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import CommonLoader from '@/components/common/CommonLoader'
import InputField from '@/components/InputField'
import SelectBox from '@/components/SelectBox'
import { IFundPeFieldChange, IFundReviewList } from '@/interface/fund'
import { StoreType } from '@/service/store'
import { getFundReviewTypeAndOptions } from '@/utils/staticData'
import {
  getLocalStorage,
  handleCloseModal,
  handleOpenModal,
  REVIEW_CHANGES,
  setLocalStorage
} from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Tooltip } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import AttachedFile from '../../assets/images/attached-file.svg'
import Info from '../../assets/images/infor.svg'
import Remove from '../../assets/images/remove.svg'
import updatedInfo from '../../assets/images/updated-info.svg'
import CommonConfirmationModal from '../../components/common/CommonConfirmationModal'
import { createFundReview } from './state'
import { fundPeFieldChangeSchema } from './validations'

const ReviewChanges: React.FC = () => {
  // ** State
  const { fund_id } = useParams<{ fund_id: string }>()
  const [directFundPerformance] = useState<IFundReviewList>({
    field_name: '',
    old_value: '',
    new_value: '',
    reason_for_change: '',
    fund: '',
    document: ''
  })
  const [isEditable, setIsEditable] = useState(false)
  const [document, setDocument] = useState<File | string>('')
  // const [reloadConfirmed] = useState(true)
  const [id, setId] = useState(0)
  const { loader, typeLoader, fundReviewList } = useSelector((state: StoreType) => ({
    loader: state?.funds?.loader,
    typeLoader: state?.funds?.typeLoader,
    fundReviewList: state?.funds?.reviewChange
  }))
  
  // ** Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    handleSubmit,
    setValue,
    trigger,
    reset,
    getValues,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: directFundPerformance,
    resolver: zodResolver(fundPeFieldChangeSchema())
  })

  const onSubmit = (data: IFundReviewList & { fund?: string | null }) => {
    const updateData = fundReviewList?.map((d: IFundReviewList) => {
      if (d?.field_name === data?.field_name) {
        return {
          ...data,
          fund: data.fund || undefined, // Ensure `fund` is `string | undefined`
          document
        }
      }
      return d
    })
    setDocument('')
    handleCommonResponse(updateData)
  }

  const handleSetData = (data: IFundReviewList) => {
    Object.keys(data || {}).forEach((key: string) => {
      if (key !== 'document') {
        setValue(
          key as keyof Omit<IFundReviewList, 'document'>,
          data?.[key as keyof IFundReviewList]
            ? data?.[key as keyof IFundReviewList]?.toString()
            : '',
          {
            shouldValidate: true,
            shouldDirty: true
          }
        )
      } else {
        setDocument(
          data?.[key as keyof IFundReviewList] !== undefined
            ? (data?.[key as keyof IFundReviewList] as string | File)
            : ''
        )
      }        
    })
  }

  const handleOnChange = (name: string, value: string | number | null) => {
    setValue(
      name as 'field_name' | 'old_value' | 'new_value' | 'reason_for_change' | 'fund',
      value !== null && typeof value === 'number' ? value.toString() : value,
      {
        shouldValidate: true,
        shouldDirty: true
      }
    )
    trigger(name as 'field_name' | 'old_value' | 'new_value' | 'reason_for_change' | 'fund')
  }

  const commonSetLoading = (
    type: string,
    loader: boolean = false,
    typeLoader: string = 'fundReview'
  ) => {
    dispatch({
      type: type,
      payload: { loader, typeLoader }
    })
  }

  const handleGetValue = () => {
    if (getValues()?.field_name) {
      const data = getFundReviewTypeAndOptions?.find((d) => d?.key === getValues()?.field_name)
      if (data?.type === 'select') {
        return data?.option?.find((d) => d?.value === getValues()?.old_value)?.label
      }
      return getValues()?.old_value
    }
  }

  const getInputOptionsData = () => {
    return getFundReviewTypeAndOptions?.find((d) => d?.key === getValues()?.field_name)
  }

  const fetchFundReviewList = useCallback(async () => {
    // await getAllFundReview(`fund=${fund_id}&page=${page}`)
    //   .then((response) => {
    //     dispatch({ type: 'funds/setList', payload: response })
    //     commonSetLoading('funds/setFundLoader', false)
    //   })
    //   .catch(() => {
    //     commonSetLoading('funds/setFundLoader', false)
    //   })

    commonSetLoading('funds/setFundLoader', true, 'fundReviewList')
    const getAllReview = getLocalStorage(REVIEW_CHANGES)
    dispatch({
      type: 'funds/setReviewList',
      payload: (Array.isArray(getAllReview) && getAllReview.length > 0 ? getAllReview : []) as
        | IFundReviewList[]
        | []
    })
    commonSetLoading('funds/setFundLoader', false, 'fundReviewList')
  }, [fund_id])

  const handleFundReviewSubmit = async () => {
    commonSetLoading('funds/setFundLoader', true)
    const formData = new FormData()

    fundReviewList.forEach((item:IFundPeFieldChange, index:number) => {
      formData.append(`data[${index}][field_name]`, item.field_name)
      formData.append(`data[${index}][old_value]`, item.old_value ?? '')
      formData.append(`data[${index}][new_value]`, item.new_value ?? '')
      formData.append(`data[${index}][reason_for_change]`, item.reason_for_change ?? '')
      formData.append(`data[${index}][fund]`, item?.fund?.toString() ?? '')

      if (item.document) {
        formData.append(`data[${index}][document]`, item.document)
      }
    })

    await createFundReview(formData as unknown as IFundPeFieldChange[] | [])
      .then((res) => {
        setId(res?.data?.id)
        commonSetLoading('funds/setFundLoader', false)
        handleOpenModal('fundReviewModal')
      })
      .catch(() => {
        commonSetLoading('funds/setFundLoader', false)
      })
  }

  const handleCommonResponse = (data: IFundReviewList[] | []) => {
    dispatch({ type: 'funds/setReviewList', payload: data as IFundReviewList[] | [] })
    setLocalStorage(REVIEW_CHANGES, data)
    reset()
    setIsEditable(false)
  }

  const onConfirm = () => {
    const removeData = (fundReviewList || [])?.filter(
      (d: IFundReviewList) => d?.field_name !== getValues()?.field_name
    )
    setDocument('')
    handleCommonResponse(removeData)
    handleCloseModal('deleteFundReview')
    if(removeData?.length === 0){
      navigate(`/layout/fund/${fund_id}`)
    }
  }

  const handleApiCall = () => {
    if (fund_id) {
      fetchFundReviewList()
    }
  }

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
  //     if (reloadConfirmed) {
  //       event.preventDefault()
  //       event.returnValue = ''
  //     }
  //   }

  //   window.addEventListener('beforeunload', handleBeforeUnload)
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //   }
  // }, [reloadConfirmed])

  useEffect(() => {
    handleApiCall()
  }, [fetchFundReviewList])
  return (
    <div>
      <div className='fund-list-wrapper'>
        <div className='fund-profile-header-row'>
          <div className='fund-heading-row'>
            <label>Fund Profile</label>
            <p>
              The fund focuses on high-growth companies within emerging markets, targeting sectors
              like technology, healthcare, and renewable energy to deliver long-term value.
            </p>
          </div>
          <div className='fund-right-sec'>
            <button className='cancel-btn' onClick={ () => navigate(`/layout/fund/${fund_id}`) }>
              Cancel
            </button>
            <button
              onClick={ handleFundReviewSubmit }
              className='review-changes-btn'
            >
              {loader && typeLoader === 'fundReview' ? 'Loading...' : 'Submit Changes'}
            </button>
          </div>
        </div>
        <div className='alt-review-changes-card-column'>
          <div className='alt-list-of-updates'>
            <h5>List of updates</h5>
            <div className='alt-list-of-updates-row'>
              {loader && typeLoader === 'fundReviewList' ? (
                <div className='common-loader'>
                  <CommonLoader />
                </div>
              ) : (
                fundReviewList?.length > 0 &&
                fundReviewList?.map((update: IFundReviewList, index: number) => (
                  <div className='alt-list-of-updates-col' key={ index }>
                    <div className='d-flex flex-column'>
                      <label>
                        {
                          getFundReviewTypeAndOptions?.find((d) => d?.key === update?.field_name)
                            ?.title
                        }
                      </label>
                      <span className='d-flex align-items-center gap-1'>
                        {!update.reason_for_change && (
                          <span className='red'>
                            <img src={ Info } alt='' /> Additional information needed
                          </span>
                        )}
                        <span className='grey'>
                          {update.reason_for_change && 'Additional information is provided'}
                        </span>
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={ () => {
                          setIsEditable(true)
                          handleSetData(update)
                        } }
                        className='alt-edit-btn'
                      >
                        <img src={ updatedInfo } alt='' /> Update Info
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className='alt-funds-size-details add-fund-form'>
            <div className='d-flex flex-row justify-content-between align-items-center w-100'>
              <h5 className='mb-0'>
                {isEditable &&
                  getFundReviewTypeAndOptions?.find((d) => d?.key === getValues()?.field_name)
                    ?.title}
              </h5>
              <div className='d-flex flex-row align-items-center'>
                {isEditable && (
                  <button
                    className='alt-delete-btn'
                    data-bs-target='#deleteFundReview'
                    data-bs-toggle='modal'
                  >
                    <img src={ Remove } alt='' /> Delete
                  </button>
                )}
                <button
                  disabled={ !isEditable }
                  onClick={ handleSubmit(onSubmit) }
                  className='apply-btn m-1'
                >
                  Apply
                </button>
              </div>
            </div>
            <div className='d-flex flex-row justify-content-between align-items-center w-100'>
              <div className='col-sm-12'>
                <div className='row'>
                  <div className='col-sm-6 '>
                    <div className='form-group'>
                      <label className='fs-14 gap-1 d-flex align-items-center'>
                        Previous Value
                        <Tooltip
                          className='custom-tooltip'
                          title={
                            <div className='review-tooltip-content'>
                              <p className='review-tooltip-text'>The value before the change.</p>
                            </div>
                          }
                          placement='top'
                        >
                          <img src={ Info } alt='' className='info-b' />
                        </Tooltip>
                      </label>
                      <InputField
                        name='old_value'
                        value={ handleGetValue() || '' }
                        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                          handleOnChange('old_value', e?.target?.value as string)
                        } }
                        isDisable={ true }
                        errorMsg={ errors?.old_value?.message }
                      />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className=' form-group'>
                      <label className='fs-14 gap-1 d-flex align-items-center'>
                        Updated Value
                        <Tooltip
                          className='custom-tooltip'
                          title={
                            <div className='review-tooltip-content'>
                              <p className='review-tooltip-text'>The new value you want to apply.</p>
                            </div>
                          }
                          placement='top'
                        >
                          <img src={ Info } alt='' className='info-b' />
                        </Tooltip>
                      </label>
                      {getInputOptionsData()?.type === 'select' ? (
                        <SelectBox
                          name='new_value'
                          value={ watch('new_value') || '' }
                          onChange={ (e) => {
                            setValue('new_value', e?.target?.value as string, {
                              shouldValidate: true,
                              shouldDirty: true
                            })
                            trigger('new_value')
                          } }
                          options={ getInputOptionsData()?.option || [] }
                          placeholder='Select asset class'
                        />
                      ) : (
                        <InputField
                          name='new_value'
                          value={ watch('new_value') }
                          onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                            if (getInputOptionsData()?.type === 'number') {
                              handleOnChange(
                                'new_value',
                                e?.target?.value?.replace(/[^0-9]/g, '') as string
                              )
                            } else if (getInputOptionsData()?.type === 'pointNumber') {
                              handleOnChange(
                                'new_value',
                                e?.target?.value?.replace(/[^0-9.]|(?<=\..*)\./g, '') as string
                              )
                            } else {
                              handleOnChange('new_value', e?.target?.value as string)
                            }
                          } }
                          isDisable={ !isEditable }
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className='row mt-4'>
                  <div className='col-sm-12 form-group'>
                    <label className='fs-14'>Reason for change</label>
                    <textarea
                      disabled={ !isEditable }
                      name='reason_for_change'
                      value={ watch('reason_for_change') || '' }
                      onChange={ (e) => handleOnChange('reason_for_change', e?.target?.value) }
                    ></textarea>
                  </div>
                </div>
                <div className='row mt-4'>
                  <div className='col-sm-12 form-group'>
                    <label className='fs-14 gap-1 d-flex align-items-center'>
                      Supporting Documents
                      <Tooltip
                        className='custom-tooltip'
                        title={
                          <div className='review-tooltip-content'>
                            <p className='review-tooltip-text'>
                              Upload any relevant documents or files to support your request
                              (optional).
                            </p>
                          </div>
                        }
                        placement='top'
                      >
                        <img src={ Info } alt='' className='info-b' />
                      </Tooltip>
                    </label>
                    {/* <FileUploader /> */}
                    <div className='alt-file-upload' role='button'>
                      <img src={ AttachedFile } alt='' className='info-b' />{' '}
                      <input
                        type='file'
                        disabled={ !isEditable }
                        onChange={ (e) => {
                          const file = e.target.files?.[0]
                          setDocument((file || '') as File | string)
                        } }
                      />{' '}
                      Attached file
                    </div>
                  </div>
                  {(document instanceof File ? document.name : '') && (
                    <div className='mt-2 d-flex'>
                      {document instanceof File ? document.name : ''}{' '}
                      <img src={ Remove } alt='' onClick={ () => setDocument('') }  />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonConfirmationModal
        modelId={ 'fundReviewModal' }
        title={ 'Request sent' }
        body={ `Your request to edit has been sent to the admin.\n
          Your request number is ${id}.\n
          You can track this request via the email associated with your account.` }
        confirmText={ 'Done' }
        hideCancel={ false }
        onConfirm={  () => {
          navigate('/layout/fund')
          handleCloseModal('fundReviewModal')
        } }
      />

      <CommonConfirmationModal
        modelId={ 'deleteFundReview' }
        title={ 'Are you sure want delete this data?' }
        confirmText={ 'Submit' }
        onConfirm={ onConfirm }
      />
    </div>
  )
}

export default ReviewChanges
