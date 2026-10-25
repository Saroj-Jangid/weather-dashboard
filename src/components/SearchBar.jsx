import React from 'react'

const Searchbar = ({value , onChange}) => {
  return (
    <>
    <input  className ="mt-10 border border-white-300 text-3xl" type="text" value={value} onChange={onChange}/>
    </>
  )
}

export default Searchbar;
