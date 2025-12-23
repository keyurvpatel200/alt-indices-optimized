import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import TotalPortfolioSVG from 'icons/sidebar/TotalPortfolio.svg'
import InterquartileSVG from 'icons/sidebar/Interquartile.svg'
import ChooseHierarchySVG from 'icons/sidebar/ChooseHierarchy.svg'
import LogsSVG from 'icons/sidebar/Logs.svg'
import BenchmarkingSVG from 'icons/sidebar/Benchmarking.svg'
import DashboardSVG from 'icons/sidebar/Dashboard.svg'
import ObjectiveSVG from 'icons/sidebar/Objective.svg'
import ModelSVG from 'icons/sidebar/Model.svg'
import FirmProfileSVG from 'icons/sidebar/FirmProfile.svg'
import OnboardingRequestSVG from 'icons/sidebar/OnboardingRequest.svg'

export const AppSidebarNav = () => {
  const [active] = useState(false)
  return (
    <ul className='main-menu'>
      <li>
        <NavLink to='/layout/dashboard' className='dashboard-link'>
          <span>
            <DashboardSVG />{' '}
          </span>
          <label>Dashboard</label>
        </NavLink>
      </li>
      <li>
        <NavLink to='/layout/fund' className='dashboard-link'>
          <span>
            <FirmProfileSVG />
          </span>
          <label>Fund</label>
        </NavLink>
      </li>
      <li className='has-submenu'>
        <NavLink to='/layout/benchmark'>
          <span>
            <BenchmarkingSVG />
          </span>
          <label>Benchmarking</label>
        </NavLink>
        <ul className={ active ? 'sub-menu show' : 'sub-menu' }>
          <li>
            <NavLink to='/layout/benchmarking/return'>
              <span>
                <ObjectiveSVG />
              </span>
              <label>Return Objective</label>
            </NavLink>
          </li>
          <li>
            <NavLink to='/layout/benchmarking/model'>
              <span>
                <ModelSVG />
              </span>
              <label>Model Portfolio</label>
            </NavLink>
          </li>
          <li>
            <NavLink to='/layout/benchmarking/total'>
              <span>
                <TotalPortfolioSVG />
              </span>
              <label>Total Portfolio Policy</label>
            </NavLink>
          </li>
          <li>
            <NavLink to='/layout/benchmarking/interquartile'>
              <span>
                <InterquartileSVG />
              </span>
              <label>Interquartile Benchmark</label>
            </NavLink>
          </li>
        </ul>
      </li>
      <li>
        <NavLink to='/layout/reports' className='dashboard-link'>
          <span>
            <ChooseHierarchySVG />
          </span>
          <label>Report</label>
        </NavLink>
      </li>
      <li>
        <NavLink to='/layout/choose-hierarchy' className='dashboard-link'>
          <span>
            <ChooseHierarchySVG />
          </span>
          <label>Choose hierarchy</label>
        </NavLink>
      </li>
      <li>
        <NavLink to='/layout/onboarding'>
          <span>
            <OnboardingRequestSVG />
          </span>
          <label>Onboarding Requests</label>
        </NavLink>
      </li>
      <li>
        <NavLink to='/layout/logs' className='dashboard-link'>
          <span>
            <LogsSVG />
          </span>
          <label>Logs</label>
        </NavLink>
      </li>
      <li>
        <NavLink to='/layout/firm-profile'>
          <span>
            <FirmProfileSVG />
          </span>
          <label>Firm Profile</label>
        </NavLink>
      </li>
    </ul>
  )
}
