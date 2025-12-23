// ** Third Party Imports
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// ** Custom Component Import
import InputField from '../../../components/InputField'
import SelectBox from '../../../components/SelectBox'
import FundFormChild from './FundFormChild'

// ** Utils Import
import {
  assetClassOptions,
  countriesOptions,
  fundLegalStructureOptions,
  fundStructureOptions,
  primaryGeographicFocusOptions,
  singleDealFundOptions,
  strategyOptions,
  vintageYearOptions
} from '../../../utils/staticData'

// ** Redux Actions and Reducers Import
import { StoreType } from '@/service/store'

// ** Interfaces Import
import { IAddFund } from '@/interface/fund'

// ** Asset Import
import backArrow from '../../../assets/images/back-arrow.svg'

export interface FundFormProps {
  setValue: UseFormSetValue<IAddFund>
  register: UseFormRegister<IAddFund>
  errors: FieldErrors<IAddFund>
  trigger: UseFormTrigger<IAddFund>
  getValues: UseFormGetValues<IAddFund>
}

export default function FundForm({
  setValue,
  errors,
  trigger,
  register,
  getValues
}: FundFormProps) {
  const navigate = useNavigate()

  const { loader, typeLoader } = useSelector((state: StoreType) => ({
    loader: state?.funds?.loader,
    typeLoader: state?.funds?.typeLoader
  }))
  return (
    <div className='add-new-fund-row'>
      <div className='w-280'>
        <div className='back-section' onClick={ () => navigate('/layout/fund') }>
          <img src={ backArrow } alt='' /> Back to Funds
        </div>
      </div>
      <div className='add-fund-column'>
        <div className='d-flex flex-column gap-1'>
          <label className='label-text'>Add new fund</label>
          <span className='heading-text'>Fund Profile Information</span>
        </div>
        <div className='add-fund-form'>
          <div className='col-sm-12'>
            <InputField
              onChange={ e => {
                setValue('name', e?.target?.value)
                trigger('name')
              } }
              register={ register('name') }
              name={ 'name' }
              label={ 'Fund Name' }
              errorMsg={ errors?.name?.message }
            />
          </div>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-6'>
                <InputField
                  onChange={ e => {
                    setValue('status', e.target.value?.replace(/[^a-zA-Z\s]/g, ''))
                    trigger('status')
                  } }
                  register={ register('status') }
                  name={ 'status' }
                  label={ 'Status' }
                  errorMsg={ errors?.status?.message }
                />
              </div>
              <div className='col-sm-6'>
                <SelectBox
                  name={ 'vintage_year' }
                  onChange={ e => {
                    setValue('vintage_year', e?.target?.value as string)
                    trigger('vintage_year')
                  } }
                  value={ getValues()?.vintage_year }
                  errorMsg={ errors?.vintage_year?.message }
                  label={ 'Vintage Year' }
                  options={ vintageYearOptions }
                />
              </div>
            </div>
          </div>
          <div className='col-sm-12'>
            <InputField
              onChange={ e => {
                setValue('fund_id', e.target.value.replace(/[^0-9]/g, ''))
                trigger('fund_id')
              } }
              register={ register('fund_id') }
              name={ 'fund_id' }
              label={ 'Fund ID' }
              errorMsg={ errors?.fund_id?.message }
            />
          </div>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-6'>
                <SelectBox
                  name={ 'asset_class' }
                  onChange={ e => {
                    setValue('asset_class', e?.target?.value as string)
                    trigger('asset_class')
                  } }
                  value={ getValues()?.asset_class }
                  errorMsg={ errors?.asset_class?.message }
                  label={ 'Asset Class' }
                  options={ assetClassOptions }
                />
              </div>
              <div className='col-sm-6'>
                <SelectBox
                  name={ 'strategy' }
                  onChange={ e => {
                    setValue('strategy', e?.target?.value as string)
                    trigger('strategy')
                  } }
                  value={ getValues()?.strategy }
                  errorMsg={ errors?.strategy?.message }
                  label={ 'Strategy' }
                  options={ strategyOptions }
                />
              </div>
            </div>
          </div>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-6'>
                <SelectBox
                  name={ 'primary_geographic_focus' }
                  onChange={ e => {
                    setValue('primary_geographic_focus', e?.target?.value as string)
                    trigger('primary_geographic_focus')
                  } }
                  value={ getValues()?.primary_geographic_focus }
                  errorMsg={ errors?.primary_geographic_focus?.message }
                  label={ 'Primary Geographic Focus' }
                  options={ primaryGeographicFocusOptions }
                />
              </div>
              <div className='col-sm-6'>
                <SelectBox
                  name={ 'country' }
                  onChange={ e => {
                    setValue('country', e?.target?.value as string)
                    trigger('country')
                  } }
                  value={ getValues()?.country }
                  errorMsg={ errors?.country?.message }
                  label={ 'Countries' }
                  options={ countriesOptions }
                />
              </div>
            </div>
          </div>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-12'>
                <InputField
                  onChange={ e => {
                    setValue('fund_size_usd', e?.target?.value?.replace(/[^0-9]/g, ''))
                    trigger('fund_size_usd')
                  } }
                  register={ register('fund_size_usd') }
                  name={ 'fund_size_usd' }
                  label={ 'Fund SIze (USD)' }
                  errorMsg={ errors?.fund_size_usd?.message }
                />
              </div>
            </div>
          </div>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-6'>
                <SelectBox
                  name={ 'fund_structure' }
                  onChange={ e => {
                    setValue('fund_structure', e?.target?.value as string)
                    trigger('fund_structure')
                  } }
                  value={ getValues()?.fund_structure }
                  errorMsg={ errors?.fund_structure?.message }
                  label={ 'Fund Structure' }
                  options={ fundStructureOptions }
                />
              </div>
              <div className='col-sm-6'>
                <SelectBox
                  name={ 'fund_legal_structure' }
                  onChange={ e => {
                    setValue('fund_legal_structure', e?.target?.value as string)
                    trigger('fund_legal_structure')
                  } }
                  value={ getValues()?.fund_legal_structure }
                  errorMsg={ errors?.fund_legal_structure?.message }
                  label={ 'Fund Legal Structure' }
                  options={ fundLegalStructureOptions }
                />
              </div>
            </div>
          </div>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-6'>
                <InputField
                  onChange={ e => {
                    setValue('fund_number_overall', e?.target?.value?.replace(/[^0-9]/g, ''))
                    trigger('fund_number_overall')
                  } }
                  register={ register('fund_number_overall') }
                  name={ 'fund_number_overall' }
                  label={ 'Fund Number (Overall)' }
                  errorMsg={ errors?.fund_number_overall?.message }
                />
              </div>
              <div className='col-sm-6'>
                <InputField
                  onChange={ e => {
                    setValue('fund_number_series', e.target.value?.replace(/[^0-9]/g, ''))
                    trigger('fund_number_series')
                  } }
                  register={ register('fund_number_series') }
                  name={ 'fund_number_series' }
                  label={ 'Fund Number (Series)' }
                  errorMsg={ errors?.fund_number_series?.message }
                />
              </div>
            </div>
          </div>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-6'>
                <SelectBox
                  name={ 'single_deal_fund' }
                  onChange={ e => {
                    setValue('single_deal_fund', e?.target?.value as string)
                    trigger('single_deal_fund')
                  } }
                  value={ getValues()?.single_deal_fund }
                  errorMsg={ errors?.single_deal_fund?.message }
                  label={ 'Single Deal Fund' }
                  options={ singleDealFundOptions }
                />
              </div>
              <div className='col-sm-6'>
                <InputField
                  onChange={ e => {
                    setValue('lifespan_years', e?.target?.value?.replace(/[^0-9]/g, ''))
                    trigger('lifespan_years')
                  } }
                  register={ register('lifespan_years') }
                  name={ 'lifespan_years' }
                  label={ 'Lifespan (Years)' }
                  errorMsg={ errors?.lifespan_years?.message }
                />
              </div>
            </div>
          </div>
          <FundFormChild
            setValue={ setValue }
            errors={ errors }
            trigger={ trigger }
            register={ register }
            getValues={ getValues }
          />
          <div className='col-sm-12'>
            <button
              disabled={ loader && typeLoader === 'addFund' }
              className='add-new-fund-btn'
              type='submit'
            >
              { loader && typeLoader === 'addFund' ? 'Loading...' : 'Add new fund' }
            </button>
          </div>
        </div>
        <div className='blank-space'></div>
      </div>
      <div className='blank-space w-280'></div>
    </div>
  )
}
