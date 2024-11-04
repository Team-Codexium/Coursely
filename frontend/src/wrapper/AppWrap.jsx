import React from 'react'

const AppWrap = (Component) => () => {
  return (
    <div className='p-0 flex-col flex itmes-center  max-w-[90rem]'>
      <Component />
    </div>
  )
}

export default AppWrap