// ** Custom Component Import
import InputField from '../../../components/InputField'
import RadioButton from '../../../components/RadioButton'
import SelectBox from '../../../components/SelectBox'

// ** Utils Import
import { fundCurrencyOptions } from '../../../utils/staticData'

// ** Interfaces Import
import { FundFormProps } from './FundForm'

export default function FundFormChild({
  setValue, errors, trigger, register, getValues }: FundFormProps) {
  return (
    <>
      <div className='col-sm-12'>
        <div className='row'>
          <div className='col-sm-6'>
            <InputField
              onChange={ e => {
                setValue('lifespan_extension', e?.target?.value?.replace(/[^0-9]/g, ''))
                trigger('lifespan_extension')
              } }
              register={ register('lifespan_extension') }
              name={ 'lifespan_extension' }
              label={ 'Lifespan Extension' }
              errorMsg={ errors?.lifespan_extension?.message }
            />
          </div>
          <div className='col-sm-6'>
            <SelectBox
              name={ 'fund_currency' }
              onChange={ e => {
                setValue('fund_currency', e?.target?.value as string)
                trigger('fund_currency')
              } }
              value={ getValues()?.fund_currency }
              errorMsg={ errors?.fund_currency?.message }
              label={ 'Fund Currency' }
              options={ fundCurrencyOptions }
            />
          </div>
        </div>
      </div>
      <div className='col-sm-12'>
        <InputField
          onChange={ e => {
            setValue('target_size', e?.target?.value?.replace(/[^0-9]/g, ''))
            trigger('target_size')
          } }
          register={ register('target_size') }
          name={ 'target_size' }
          label={ 'Target Size (USD MN)' }
          errorMsg={ errors?.target_size?.message }
        />
      </div>
      <div className='col-sm-12'>
        <div className='row'>
          <div className='col-sm-6'>
            <InputField
              onChange={ e => {
                setValue('core_industries', e?.target?.value?.replace(/[^a-zA-Z\s]/g, ''))
                trigger('core_industries')
              } }
              register={ register('core_industries') }
              name={ 'core_industries' }
              label={ 'Core Industries' }
              errorMsg={ errors?.core_industries?.message }
            />
          </div>
          <div className='col-sm-6'>
            <InputField
              onChange={ e => {
                setValue('industries', e?.target?.value?.replace(/[^a-zA-Z\s]/g, ''))
                trigger('industries')
              } }
              register={ register('industries') }
              name={ 'industries' }
              label={ 'Industries' }
              errorMsg={ errors?.industries?.message }
            />
          </div>
        </div>
      </div>
      <div className='col-sm-12'>
        <div className='row'>
          <div className='form-group custom-radio-choose'>
            <label>Offer Co-Investment Opportunities to LPS?</label>
            <RadioButton
              name='offer_co_investment_opportunities'
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                setValue('offer_co_investment_opportunities', e?.target?.value)
                trigger('offer_co_investment_opportunities')
              } }
              checked={ getValues()?.offer_co_investment_opportunities === 'Yes' }
              label={ 'Yes' }
              value={ 'Yes' }
              className={ `ps-0 ${getValues()?.offer_co_investment_opportunities === 'Yes' ? 'radio-checked' : ''}` }
            />
            <RadioButton
              name='offer_co_investment_opportunities'
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                setValue('offer_co_investment_opportunities', e?.target?.value)
                trigger('offer_co_investment_opportunities')
              } }
              checked={ getValues()?.offer_co_investment_opportunities === 'No' }
              label={ 'No' }
              value={ 'No' }
              className={ `ps-0 ${getValues()?.offer_co_investment_opportunities === 'No' ? 'radio-checked' : ''}` }
            />
            <div className='text-danger fs-12'>
              { errors?.offer_co_investment_opportunities?.message }
            </div>
          </div>
        </div>
      </div>

      <div className='col-sm-12'>
        <div className='row'>
          <div className='form-group custom-radio-choose'>
            <label>Subscription Credit Facility</label>
            <RadioButton
              name='subscription_credit_facility'
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                setValue('subscription_credit_facility', e?.target?.value)
                trigger('subscription_credit_facility')
              } }
              checked={ getValues()?.subscription_credit_facility === 'Yes' }
              label={ 'Yes' }
              value={ 'Yes' }
              className={ `ps-0 ${getValues()?.subscription_credit_facility === 'Yes' ? 'radio-checked' : ''}` }
            />
            <RadioButton
              name='subscription_credit_facility'
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
                setValue('subscription_credit_facility', e?.target?.value)
                trigger('subscription_credit_facility')
              } }
              checked={ getValues()?.subscription_credit_facility === 'No' }
              label={ 'No' }
              value={ 'No' }
              className={ `ps-0 ${getValues()?.subscription_credit_facility === 'No' ? 'radio-checked' : ''}` }
            />
            <div className='text-danger fs-12'>
              { errors?.subscription_credit_facility?.message }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
