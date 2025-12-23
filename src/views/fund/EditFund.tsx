//** React Import
import React, { useCallback, useEffect, useState } from 'react'

//** Third Party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

//**  Custom Component
import CommonLoader from '@/components/common/CommonLoader'
import { StoreType } from '@/service/store'
import InputField from '../../components/InputField'
import SelectBox from '../../components/SelectBox'

//** Action Imports
import { fetchFundsDetailsApi, updateFundsDetails } from './state'

//** Utils
import {
  assetClassOptions,
  coInvestmentOptions,
  countriesOptions,
  primaryGeographicFocusOptions,
  singleDealFundOptions,
  statusOptions,
  strategyOptions
} from '@/utils/staticData'

//** Validation Schema
import { fundValidationSchema } from './validations'

//** Interface
import { IAddFund, IFundReviewList } from '@/interface/fund'
import { REVIEW_CHANGES, setLocalStorage } from '@/utils/utils'

const initialValue: IAddFund = {
  fund_id: '',
  name: '',
  vintage_year: '',
  asset_class: '',
  strategy: '',
  target_size: '',
  primary_geographic_focus: '',
  fund_size_usd: '',
  status: '',
  country: '',
  fund_structure: '',
  fund_legal_structure: '',
  fund_number_overall: '',
  fund_number_series: '',
  single_deal_fund: '',
  lifespan_years: '',
  lifespan_extension: '',
  fund_currency: '',
  core_industries: '',
  industries: '',
  offer_co_investment_opportunities: '',
  subscription_credit_facility: ''
}

const EditFund: React.FC = (): JSX.Element => {
  // **Hooks
  const [fundData, setFundData] = useState<IAddFund>(initialValue)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const { loader, typeLoader } = useSelector((state: StoreType) => ({
    loader: state?.funds?.loader,
    typeLoader: state?.funds?.typeLoader
  }))

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    trigger
  } = useForm({
    defaultValues: fundData,
    resolver: zodResolver(fundValidationSchema())
  })

  const onSubmit = async (data: IAddFund) => {
    let changeValue = {}
    Object.entries(data)?.forEach((d: any) => {
      if (
        data?.[d[0] as keyof IAddFund]?.toString() !==
        fundData?.[d[0] as keyof IAddFund]?.toString()
      ) {
        changeValue = {
          ...changeValue,
          [d[0]]: d?.[1]
        }
      }
    })

    dispatch({
      payload: { loader: true, typeLoader: 'updateFundDetails' },
      type: 'funds/setFundLoader'
    })
    await updateFundsDetails(id?.toString() as string, data)
      .then(() => {
        const fundReviewList: IFundReviewList[] = []
        dispatch({
          payload: { loader: false, typeLoader: 'updateFundDetails' },
          type: 'funds/setFundLoader'
        })
        if(Object.values(changeValue)?.length > 0){
          Object.entries(changeValue || {}).forEach((d) => {
            fundReviewList.push({
              field_name: d?.[0],
              old_value: (fundData?.[d[0] as keyof IAddFund] as string) || '',
              new_value: (d?.[1] as string) || '',
              reason_for_change: '',
              document: '',
              fund: id ? id?.toString() : ''
            })
          })
          setLocalStorage(REVIEW_CHANGES, fundReviewList)
          navigate(`/layout/fund/review-changes/${id}`)
        }else{
          navigate('/layout/fund')
        }
        
      })
      .catch(() => {
        dispatch({
          payload: { loader: false, typeLoader: 'updateFundDetails' },
          type: 'funds/setFundLoader'
        })
      })
  }

  const getFundDetails = useCallback(
    async (id: string) => {
      dispatch({
        type: 'funds/setFundLoader',
        payload: { loader: true, typeLoader: 'editFundDetails' }
      })
      await fetchFundsDetailsApi(id)
        .then((res) => {
          setFundData(res)
          Object.keys(res || {}).forEach((key: string) => {
            if (key) {
              if (key in fundData) {
                if (key in fundData) {
                  setValue(key as keyof IAddFund, res?.[key as keyof IAddFund] ? res?.[key as keyof IAddFund]?.toString() : '')
                }
              }
            }
          })
          setTimeout(() => {
            dispatch({
              type: 'funds/setFundLoader',
              payload: { loader: false, typeLoader: 'editFundDetails' }
            })
          }, 0)
        })
        .catch(() => {
          dispatch({
            type: 'funds/setFundLoader',
            payload: { loader: false, typeLoader: 'editFundDetails' }
          })
        })
    },
    [id]
  )

  useEffect(() => {
    if (id) {
      getFundDetails(id)
    }
  }, [id])

  return (
    <div>
      {loader && typeLoader === 'editFundDetails' ? (
        <div className='common-loader'>
          <CommonLoader />
        </div>
      ) : (
        <form onSubmit={ handleSubmit(onSubmit) } className='fund-list-wrapper'>
          <div className='fund-profile-header-row'>
            <div className='fund-heading-row'>
              <label>Fund Profile</label>
              <p>
                The fund focuses on high-growth companies within emerging markets, targeting sectors
                like technology, healthcare, and renewable energy to deliver long-term value.
              </p>
            </div>
            <div className='fund-right-sec'>
              <button className='cancel-btn' onClick={ () => navigate(`/layout/fund/${id}`) }>
                Cancel
              </button>
              <button
                type='submit'
                disabled={ loader && typeLoader === 'updateFundDetails' }
                className='review-changes-btn'
              >
                {loader && typeLoader === 'updateFundDetails' ? 'Loading...' : 'Review Changes'}
              </button>
            </div>
          </div>
          <div className='fund-detail-row add-fund-form'>
            <div className='fund-col-row'>
              <InputField
                name='fund_id'
                label='Fund Id'
                value={ watch('fund_id') }
                register={ register('fund_id') }
                onChange={ (e) =>
                  setValue('fund_id', e.target.value?.replace(/[^0-9]/g, ''), {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                placeholder='Enter fund id'
                errorMsg={ errors?.fund_id?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='name'
                label='Fund Name'
                value={ watch('name') }
                register={ register('name') }
                onChange={ (e) =>
                  setValue('name', e.target.value, { shouldValidate: true, shouldDirty: true })
                }
                placeholder='Enter fund name'
                errorMsg={ errors?.name?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='vintage_year'
                label='Vintage Year'
                value={ watch('vintage_year') }
                register={ register('vintage_year') }
                onChange={ (e) =>
                  setValue('vintage_year', e.target.value?.replace(/[^0-9]/g, ''), {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                placeholder='Enter vintage year'
                errorMsg={ errors?.vintage_year?.message }
              />
            </div>
            <div className='fund-col-row'>
              <SelectBox
                name='asset_class'
                label='Asset Class'
                value={ watch('asset_class') }
                onChange={ (e) => {
                  setValue('asset_class', e?.target?.value as string, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                  trigger('asset_class')
                } }
                options={ assetClassOptions }
                placeholder='Select asset class'
              />
            </div>
            <div className='fund-col-row'>
              <SelectBox
                name='strategy'
                label='Strategy'
                value={ watch('strategy') }
                onChange={ (e) => {
                  setValue('strategy', e?.target?.value as string, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                  trigger('strategy')
                } }
                options={ strategyOptions }
                placeholder='Select strategy'
                errorMsg={ errors?.strategy?.message }
              />
            </div>
            <div className='fund-col-row'>
              <SelectBox
                name='primary_geographic_focus'
                label='Primary Geographic Focus'
                value={ watch('primary_geographic_focus') }
                onChange={ (e) => {
                  setValue('primary_geographic_focus', e?.target?.value as string, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                  trigger('primary_geographic_focus')
                } }
                options={ primaryGeographicFocusOptions }
                placeholder='Select primary geographic focus'
                errorMsg={ errors?.primary_geographic_focus?.message }
              />
            </div>
            <div className='fund-col-row'>
              <SelectBox
                name='countries'
                label='Countries'
                value={ watch('country') }
                onChange={ (e) => {
                  setValue('country', e?.target?.value as string, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                  trigger('country')
                } }
                options={ countriesOptions }
                placeholder='Select countries'
                errorMsg={ errors?.country?.message }
              />
            </div>
            <div className='fund-col-row'>
              <SelectBox
                name='status'
                label='Status'
                value={ watch('status') }
                onChange={ (e) => {
                  setValue('status', e?.target?.value as string, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                  trigger('status')
                } }
                options={ statusOptions }
                placeholder='Select status'
                errorMsg={ errors?.status?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='fund_size_usd'
                label='Fund Size (USD)'
                value={ watch('fund_size_usd') }
                register={ register('fund_size_usd') }
                onChange={ (e) =>
                  setValue('fund_size_usd', e.target.value?.replace(/[^0-9.]|(?<=\..*)\./g, ''), {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                placeholder='Enter fund size'
                errorMsg={ errors?.fund_size_usd?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='fund_structure'
                label='Fund Structure'
                value={ watch('fund_structure') }
                register={ register('fund_structure') }
                onChange={ (e) =>
                  setValue('fund_structure', e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                placeholder='Enter fund structure'
                errorMsg={ errors?.fund_structure?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='fund_legal_structure'
                label='Fund Legal Structure'
                value={ watch('fund_legal_structure') }
                register={ register('fund_legal_structure') }
                onChange={ (e) =>
                  setValue('fund_legal_structure', e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                placeholder='Enter fund legal structure'
                errorMsg={ errors?.fund_legal_structure?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='fund_number_overall'
                label='Fund Number (Overall)'
                value={ watch('fund_number_overall') }
                register={ register('fund_number_overall') }
                onChange={ (e) =>
                  setValue(
                    'fund_number_overall',
                    e.target.value?.replace(/[^0-9.]|(?<=\..*)\./g, ''),
                    { shouldValidate: true, shouldDirty: true }
                  )
                }
                placeholder='Enter fund number (overall)'
                errorMsg={ errors?.fund_number_overall?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='fund_number_series'
                label='Fund Number (Series)'
                value={ watch('fund_number_series') }
                register={ register('fund_number_series') }
                onChange={ (e) =>
                  setValue(
                    'fund_number_series',
                    e.target.value?.replace(/[^0-9.]|(?<=\..*)\./g, ''),
                    { shouldValidate: true, shouldDirty: true }
                  )
                }
                placeholder='Enter fund number (series)'
                errorMsg={ errors?.fund_number_series?.message }
              />
            </div>
            <div className='fund-col-row'>
              <SelectBox
                name='single_deal_fund'
                label='Single Deal Fund'
                value={ watch('single_deal_fund') }
                onChange={ (e) => {
                  setValue('single_deal_fund', e?.target?.value as string, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                  trigger('single_deal_fund')
                } }
                options={ singleDealFundOptions }
                placeholder='Select primary geographic focus'
                errorMsg={ errors?.single_deal_fund?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='lifespan_years'
                label='Lifespan (Years)'
                value={ watch('lifespan_years') }
                register={ register('lifespan_years') }
                onChange={ (e) =>
                  setValue('lifespan_years', e.target.value?.replace(/[^0-9.]|(?<=\..*)\./g, ''), {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                placeholder='Enter lifespan (years)'
                errorMsg={ errors?.lifespan_years?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='lifespan_extension'
                label='Lifespan Extension'
                value={ watch('lifespan_extension') }
                register={ register('lifespan_extension') }
                onChange={ (e) =>
                  setValue(
                    'lifespan_extension',
                    e.target.value?.replace(/[^0-9.]|(?<=\..*)\./g, ''),
                    { shouldValidate: true, shouldDirty: true }
                  )
                }
                placeholder='Enter lifespan extension'
                errorMsg={ errors?.lifespan_extension?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='fund_currency'
                label='Fund Currency'
                value={ watch('fund_currency') }
                register={ register('fund_currency') }
                onChange={ (e) =>
                  setValue('fund_currency', e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                placeholder='Enter fund currency'
                errorMsg={ errors?.fund_currency?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='target_size'
                label='Target Size (USD MN)'
                value={ watch('target_size') }
                register={ register('target_size') }
                onChange={ (e) =>
                  setValue('target_size', e.target.value?.replace(/[^0-9.]|(?<=\..*)\./g, ''), {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                placeholder='Enter target size'
                errorMsg={ errors?.target_size?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='core_industries'
                label='Core Industries'
                value={ watch('core_industries') }
                register={ register('core_industries') }
                onChange={ (e) =>
                  setValue('core_industries', e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                placeholder='Enter core industries'
                errorMsg={ errors?.core_industries?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='industries'
                label='Industries'
                value={ watch('industries') }
                register={ register('industries') }
                onChange={ (e) =>
                  setValue('industries', e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                placeholder='Enter industries'
                errorMsg={ errors?.industries?.message }
              />
            </div>
            <div className='fund-col-row'>
              <SelectBox
                name='offer_co_investment_opportunities'
                label='Offer Co-Investment Opportunities to LPs?'
                value={ watch('offer_co_investment_opportunities') }
                onChange={ (e) => {
                  setValue('offer_co_investment_opportunities', e?.target?.value as string, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                  trigger('offer_co_investment_opportunities')
                } }
                options={ coInvestmentOptions }
                placeholder='Select co-investment opportunities'
                errorMsg={ errors?.offer_co_investment_opportunities?.message }
              />
            </div>
            <div className='fund-col-row'>
              <InputField
                name='subscription_credit_facility'
                label='Subscription Credit Facility'
                value={ watch('subscription_credit_facility') }
                register={ register('subscription_credit_facility') }
                onChange={ (e) =>
                  setValue('subscription_credit_facility', e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                placeholder='Enter subscription credit facility'
                errorMsg={ errors?.subscription_credit_facility?.message }
              />
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditFund
