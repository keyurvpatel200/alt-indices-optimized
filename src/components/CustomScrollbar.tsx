import { ReactNode } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

interface CustomScrollbarProps {
  children: ReactNode
  height?: string | number
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ children, height = '400px' }) => {
  return (
    <Scrollbars
      style={ { height } }
      autoHide
      autoHideTimeout={ 1000 }
      autoHideDuration={ 200 }
      renderThumbVertical={ (props: React.HTMLAttributes<HTMLDivElement>) => (
        <div
          { ...props }
          style={ {
            backgroundColor: '#a0a0a0',
            borderRadius: '4px',
            width: '5px',
            ...props.style
          } }
        />
      ) }
    >
      {children}
    </Scrollbars>
  )
}

export default CustomScrollbar
