import React from 'react'

const AppWrap = (Component) => () => {
  return (
    <div className='p-0 flex-col flex flex-col justify-start items-center'>
      <Component />
    </div>
  ) 
}

export default AppWrap