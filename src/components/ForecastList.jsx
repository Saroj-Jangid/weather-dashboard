import React from 'react'
import ForecastItem from './ForecastItem'

const ForecastList = ({weather}) => {
     const date_time = weather.daily.time;

  return (
    <>
    <div className='flex gap-3 mt-10' >
    {
date_time.slice(1, 6).map((date , i) => <ForecastItem date={date} key={date}  temperature_max={weather.daily.temperature_2m_max[i]}  temperature_min={weather.daily.temperature_2m_min[i]}  />
    )
    }
</div>
    </>
  )
}

export default ForecastList
