// ** React Imports
import { useState } from 'react'

// ** Third Party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Component Import
import InputField from '../../components/InputField'
import SelectBox from '../../components/SelectBox'

// ** Utils Import
import {
  cityOptions,
  countryOptions,
  stateOptions,
  zipCodeOptions,
} from '../../utils/staticData'
import { fundManageValidationSchema } from './validations'

// ** Redux Actions and Reducers Import
import { StoreType } from '@/service/store'
import { fundManagerInformationApi } from './state'

//** Asset Import
import Alt from '../../assets/images/alt-logo.svg'

//** Interface Import
import { IFundManagerInformation } from '../../interface/fund'

const initialValue: IFundManagerInformation = {
  firm_name: '',
  company_email: '',
  country: '',
  state: '',
  zip_code: '',
  address: '',
  website: '',
  city: '',
}
export default function FundManagerInformation() {
  // **Hooks
  const [fundManager] = useState<IFundManagerInformation>(initialValue)

  // **States
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    trigger
  } = useForm({
    defaultValues: fundManager,
    resolver: zodResolver(fundManageValidationSchema()),
  })

  const { loader, typeLoader } = useSelector((state: StoreType) => ({
    loader: state?.funds?.loader,
    typeLoader: state?.funds?.typeLoader,
  }))

  const onSubmit = async (data: IFundManagerInformation) => {
    dispatch({
      payload: { loader: true, typeLoader: 'fundManager' },
      type: 'funds/setFundLoader',
    })
    await fundManagerInformationApi(data)
      .then(() => {
        dispatch({
          payload: { loader: false, typeLoader: 'fundManager' },
          type: 'funds/setFundLoader',
        })
        navigate('/layout/fund')
      })
      .catch(() => {
        dispatch({
          payload: { loader: false, typeLoader: 'fundManager' },
          type: 'funds/setFundLoader',
        })
      })
  }

  return (
    <>
      <div className='add-fund-header'>
        <Link to='/layout/dashboard'>
          <img src={ Alt } alt='' />
        </Link>
      </div>
      <form onSubmit={ handleSubmit(onSubmit) } className='add-new-fund-row'>
        <div className='add-fund-column'>
          <div className='d-flex flex-column gap-1'>
            <label className='label-text'>Add new fund</label>
            <span className='heading-text'>Fund Manager Information</span>
          </div>
          <div className='add-fund-form'>
            <div className='col-sm-12'>
              <div className='row'>
                <div className='col-sm-6'>
                  <InputField
                    onChange={ (e) => {
                      setValue(
                        'firm_name',
                        e?.target?.value
                      )
                      trigger('firm_name')
                    } }
                    register={ register('firm_name') }
                    name={ 'firm_name' }
                    label={ 'Firm Name' }
                    errorMsg={ (errors?.firm_name?.message as string | undefined) }
                  />
                </div>
                <div className='col-sm-6'>
                  <InputField
                    onChange={ (e) => {
                      setValue('company_email', e?.target?.value)
                      trigger('company_email')
                    } }
                    register={ register('company_email') }
                    name={ 'company_email' }
                    label={ 'Company Email' }
                    errorMsg={
                      (errors?.company_email?.message as string | undefined)
                    }
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='row'>
                <div className='col-sm-6'>
                  <SelectBox
                    name={ 'country' }
                    onChange={ (e) => { setValue('country', e?.target?.value as string); trigger('country') } }
                    value={ getValues()?.country }
                    errorMsg={ (errors?.country?.message as string | undefined) }
                    label={ 'Country' }
                    options={ countryOptions }
                  />
                </div>
                <div className='col-sm-6'>
                  <SelectBox
                    name={ 'state' }
                    onChange={ (e) => { setValue('state', e?.target?.value as string); trigger('state') } }
                    value={ getValues()?.state }
                    errorMsg={ (errors?.state?.message as string | undefined) }
                    label={ 'State/Country' }
                    options={ stateOptions }
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-12'>
              <div className='row'>
                <div className='col-sm-6'>
                  <SelectBox
                    name={ 'city' }
                    onChange={ (e) => { setValue('city', e?.target?.value as string); trigger('city') } }
                    value={ getValues()?.city }
                    errorMsg={ (errors?.city?.message as string | undefined) }
                    label={ 'City' }
                    options={ cityOptions }
                  />
                </div>
                <div className='col-sm-6'>
                  <SelectBox
                    name={ 'zip_code' }
                    onChange={ (e) => { setValue('zip_code', e?.target?.value as string); trigger('zip_code') } }
                    value={ getValues()?.zip_code }
                    errorMsg={ (errors?.zip_code?.message as string | undefined) }
                    label={ 'Zip Code' }
                    options={ zipCodeOptions }
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-12'>
              <InputField
                onChange={ (e) => {
                  setValue('address', e?.target?.value)
                  trigger('address')
                } }
                name={ 'address' }
                label={ 'Address' }
                errorMsg={ (errors?.address?.message as string | undefined) }
              />
            </div>
            <div className='col-sm-12'>
              <InputField
                onChange={ (e) => {
                  setValue('website', e?.target?.value)
                  trigger('website')
                } }
                name={ 'website' }
                label={ 'Website' }
                errorMsg={ (errors?.website?.message as string | undefined) }
              />
            </div>
            <div className='col-sm-12'>
              <button
                className='add-new-fund-btn'
                disabled={ typeLoader === 'fundManager' && loader }
                type='submit'
              >
                { typeLoader === 'fundManager' && loader
                  ? 'Loading...'
                  : 'Save Manager' }
              </button>
            </div>
          </div>
          <div className='blank-space'></div>
        </div>
      </form>
    </>
  )
}
