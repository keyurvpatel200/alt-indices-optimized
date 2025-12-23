// ** Third Party Imports
import * as z from 'zod'

export const fundValidationSchema = () =>
  z.object({
    fund_id: z.string().nonempty({ message: 'Fund ID is required' }),
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters' })
      .nonempty({ message: 'Name is required' }),
    strategy: z.string().nonempty({ message: 'Strategy is required' }),
    target_size: z.string().nonempty({ message: 'Target size is required' }),
    primary_geographic_focus: z.string().nonempty({
      message: 'Geographic focus is required'
    }),
    fund_size_usd: z.string().nonempty({ message: 'Fund size is required' }),
    status: z.string().nonempty({ message: 'Status is required' }),
    country: z.string().nonempty({ message: 'Country is required' }),
    fund_structure: z.string().nonempty({ message: 'Fund structure is required' }),
    fund_legal_structure: z.string().nonempty({
      message: 'Legal structure is required'
    }),
    fund_number_overall: z.string().nonempty({
      message: 'Fund number overall is required'
    }),
    fund_number_series: z.string().nonempty({
      message: 'Fund number series is required'
    }),
    single_deal_fund: z.string().nonempty({ message: 'Single deal fund is required' }),
    lifespan_years: z.string().nonempty({ message: 'Lifespan years is required' }),
    lifespan_extension: z.string().nonempty({
      message: 'Lifespan extension is required'
    }),
    fund_currency: z.string().nonempty({ message: 'Currency is required' }),
    core_industries: z.string().nonempty({ message: 'Core industries are required' }),
    industries: z.string().nonempty({ message: 'Industries are required' }),
    offer_co_investment_opportunities: z.string().nonempty({
      message: 'Offer co-investment opportunities is required'
    }),
    subscription_credit_facility: z.string().nonempty({
      message: 'Subscription credit facility is required'
    }),
    vintage_year: z.string(),
    asset_class: z.string()
  })

export const fundManageValidationSchema = () =>
  z.object({
    firm_name: z.string().min(1, 'Firm name is required'),
    company_email: z.string().min(1, 'Company email is required').email('Invalid email format'),
    country: z.string().min(1, 'Country is required'),
    state: z.string().min(1, 'State is required'),
    zip_code: z.string().min(1, 'ZIP code is required'),
    address: z.string().min(5, 'Address must be at least 5 characters long'),
    website: z.string().min(1, 'Website is required').url('Invalid URL format'),
    city: z.string().min(1, 'City is required')
  })

export const fundPerformanceValidationSchema = () =>
  z.object({
    as_at_date: z.string().nonempty({ message: 'Date is required' }),
    dpi: z
      .string()
      .nonempty({ message: 'DPI is required' })
      .refine((val) => !isNaN(Number(val)), { message: 'DPI must be a number' }),
    rvpi: z
      .string()
      .nonempty({ message: 'RVPI is required' })
      .refine((val) => !isNaN(Number(val)), { message: 'RVPI must be a number' }),
    net_irr: z
      .string()
      .nonempty({ message: 'Net IRR is required' })
      .refine((val) => !isNaN(Number(val)), { message: 'Net IRR must be a number' }),
    net_multiple: z
      .string()
      .nonempty({ message: 'Net Multiple is required' })
      .refine((val) => !isNaN(Number(val)), { message: 'Net Multiple must be a number' }),
    called: z
      .string()
      .nonempty({ message: 'Called is required' })
      .refine((val) => !isNaN(Number(val)), { message: 'Called must be a number' }),
    source: z.string().nonempty({ message: 'Source is required' }),
    id: z.string().optional(),
    fund: z.string().optional()
  })

export const cashFlowValidationSchema = () =>
  z.object({
    transaction_date: z.string().nonempty({ message: 'Transaction date is required' }),
    transaction_type: z.string().nonempty({ message: 'Transaction type is required' }),
    amount: z.string().nonempty({ message: 'Transaction amount is required' }),
    id: z.string().optional(),
    fund: z.string().optional(),
    as_at_date: z.string().optional(),
  })

export const fundPeFieldChangeSchema = () =>
  z.object({
    field_name: z
      .string()
      .min(1, 'Field name is required')
      .max(255, 'Max length is 255 characters'),
    old_value: z.string().nullable().optional(),
    new_value: z.string().nullable().optional(),
    reason_for_change: z.string().nullable().optional(),
    fund: z.string().nullable().optional()
  })
