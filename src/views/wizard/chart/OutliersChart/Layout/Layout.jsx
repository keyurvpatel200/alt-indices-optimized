import styles from './Layout.module.css'

const Layout = function Layout ({ children }) {
  return <div className={ styles.wrapper }>{ children }</div>
}

Layout.LeftSide = function LeftSide ({ children }) {
  return <div>{ children }</div>
}

Layout.RightSide = function RigtSide ({ children }) {
  return <div className={ styles.stack }>{ children }</div>
}

export default Layout