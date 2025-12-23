import { useState } from 'react'
import { Link, NavLink as RRNavLink } from 'react-router-dom'
import {
  Collapse,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap'

import ALTSVG from 'icons/Add copy.svg'

export default function Header () {
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="navigation-header">
      <div className="container">
        <Navbar light expand="md">
          <NavbarBrand href="/"><ALTSVG/></NavbarBrand>
          <NavbarToggler onClick={ toggle }/>
          <Collapse isOpen={ isOpen } navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link className="_df_button nav-link bg-transparent" 
                  data-source="/pdf/whitepaper.pdf">Whitepaper</Link>
              </NavItem>
              <NavItem>
                <Link to="#what-we-do" className="nav-link">What we do</Link>
              </NavItem>
              <NavItem>
                <Link to="#why-alt" className="nav-link">Why Alt?</Link>
              </NavItem>
              <NavItem>
                <NavLink href="https://altindices.com/about-us/">
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  Contact
                </NavLink>
              </NavItem>
              <Dropdown className="specific-dropdown"
                nav
                inNavbar
                isOpen={ show }
                onMouseEnter={ () => setShow(true) }
                onMouseLeave={ () => setShow(false) }>
                <DropdownToggle nav caret>
                  HHI Benchmarks
                </DropdownToggle>
                <DropdownMenu end>
                  <NavLink onClick={ () => setIsOpen(false) }
                    href="https://altindices.com/hhi/banking/">Banking</NavLink>
                  <NavLink onClick={ () => setIsOpen(false) }
                    href="https://altindices.com/hhi/telecom/">Telecom</NavLink>
                  <NavLink onClick={ () => setIsOpen(false) }
                    href="https://altindices.com/hhi/insurance/">Insurance</NavLink>
                </DropdownMenu>
              </Dropdown>
            </Nav>
            <NavLink to="/register" tag={ RRNavLink } className="sign-up-btn">
              Sign Up
            </NavLink>
          </Collapse>
        </Navbar>
      </div>
    </div>
  )
}