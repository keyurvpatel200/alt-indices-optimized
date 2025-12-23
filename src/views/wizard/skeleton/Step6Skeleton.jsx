import Skeleton from 'react-loading-skeleton'

const Step6Skeleton = () => {
  return (
    <ul className="sub-strategy row-sub-strategy-list">
      {['Monthly', 'Quaterly', 'Annually'].map(strategy => {
        return <Skeleton width={ 170 } height={ 50 } key={ strategy } />
      })}
    </ul>
  )
}

export default Step6Skeleton
