import styles from './BoxWhiskerChart.module.css'
import { CORNER_RADIUS } from './BoxWhiskerChart.constants'

const Frame = ({ x, y, width, height }) => {
  return (
    <rect className={ styles.frame } rx={ CORNER_RADIUS } x={ x } y={ y } width={ width } height={ height } />
  )
}

export default Frame
