import { lazy } from 'react'

import Dashboard from '../views/dashboard/Dashboard'

const Teams = lazy(() => import('../views/teams'))
const CompanyProfile = lazy(() => import('../views/setting/Profile'))
const FirmProfile = lazy(() => import('../views/firm-profile/FirmProfile'))
const UserProfile = lazy(() => import('../views/user/UserProfile'))
const ChatSection = lazy(() => import('../views/chat/chat'))
const EDCICompanyForm = lazy(() => import('../views/edci/CompanyForm'))
const Fund = lazy(() => import('../views/fund/Fund'))
const FundDetails = lazy(() => import('../views/fund/FundDetails'))
const NewFund = lazy(() => import('../views/fund/new-fund/NewFund'))
const EditFund = lazy(() => import('../views/fund/EditFund'))
const ReviewChanges = lazy(() => import('../views/fund/ReviewChanges'))
const DirectFundPerformance = lazy(() =>
  import('../views/fund/DirectFundPerformance')
)
const FundManagerInformation = lazy(() =>
  import('../views/fund/FundManagerInformation')
)
const FundCashFlow = lazy(() => import('../views/fund/FundCashFlow'))
const EDCICompany = lazy(() => import('../views/edci/company/index'))
const Benchmark = lazy(() => import('../views/benchmark/Benchmark'))
const BenchmarkDetail = lazy(() => import('../views/benchmark/BenchmarkDetail'))
// const FundCashflow = lazy(() => import('../views/fund/FundCashFlow'))
const ReportList = lazy(() => import('../views/reports/ReportList'))
const CreateReport = lazy(() => import('../views/reports/CreateFundReport'))
const CreateReportDemo = lazy(() =>
  import('../views/reports/ReactDndDemo')
)
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/teams', name: 'interquartile', element: Teams },
  { path: '/setting', name: 'profile', element: CompanyProfile },
  { path: '/firm-profile', name: 'EditDetail', element: FirmProfile },
  { path: '/user-profile', name: 'EditDetail', element: UserProfile },
  { path: '/chat', name: 'EditDetail', element: ChatSection },
  { path: '/edci/portco', name: 'EDCICompanyForm', element: EDCICompanyForm },
  { path: '/fund', name: 'Funds', element: Fund },
  // { path: '/fund-list', name: 'FundList', element: FundList },
  // { path: '/add-new-fund', name: 'NewFundForm', element: NewFundForm },
  { path: '/edci/company/index', name: 'NewFundForm', element: EDCICompany },
  { path: '/benchmark', name: 'Benchmark', element: Benchmark },
  { path: '/benchmark/benchmark-details/:id', name: 'NewFundForm', element: BenchmarkDetail },
  { path: '/fund/:id', name: 'Fund Details', element: FundDetails },
  { path: '/fund/new-fund', name: 'AddFund', element: NewFund },
  { path: '/fund/review-changes/:fund_id', name: 'ReviewChanges', element: ReviewChanges },
  { path: '/fund/edit/:id', name: 'AddFund', element: EditFund },
  { path: '/fund/cashflow/:fund_id', name: 'FundCashFlow', element: FundCashFlow },
  {
    path: '/fund/performance/:fund_id',
    name: 'DirectFundPerformance',
    element: DirectFundPerformance
  },
  {
    path: '/add-fund-manager',
    name: 'FundManagerInformation',
    element: FundManagerInformation
  },
  { path: '/edci/company/index', name: 'EDCICompany', element: EDCICompany },
  // { path: '/fund-cashflow', name: 'FundCashflow', element: FundCashflow }

  { path: '/reports', name: 'ReportList', element: ReportList },
  { path: '/reports/demo', name: 'CreateReportDemo', element: CreateReportDemo },
  { path: '/reports/create', name: 'CreateReport', element: CreateReport },
  { path: '/edci/company/index', name: 'EDCICompany', element: EDCICompany },
]

export default routes