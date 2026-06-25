import React from 'react'

const Card = ({image}) => {
  return (
    <div className='w-17.5 h-35 lg:w-37.5 lg:h-62.5 overflow-hidden bg-[#020220] border-2 border-[#0000ff66] rounded-2xl hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white'>
      <img src={image} className='h-full object-cover'/>
    </div>
  )
}

export default Card
