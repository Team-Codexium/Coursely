import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Navbar = () => {
  return (
    <div className='flex'>
      <div className='logo flex-[0.4] bg-green-600'></div>
      <div className='search flex flex-1 bg-blue-700'>
      
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">Subscribe</Button>
      </div>

      </div>
      <div className='buttons flex flex-1 bg-red-400'></div>
    </div>
  )
}

export default Navbar