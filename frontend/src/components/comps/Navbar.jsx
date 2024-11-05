import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlignJustify, Search, ShoppingCart } from 'lucide-react'
import { useState } from "react"
import { Link } from 'react-router-dom'


const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className='flex h-20 justify-between'>
      <div className='logo flex-[0.4] '>
        <Link className="flex flex-1 justify-center items-center h-full font-jma text-2xl font-normal " to="/">COURSELY</Link>
      </div>
      <div className='search hidden lg:flex justify-center items-center space-x-2 flex-[0.8] bg-ble-700 px-6'>
      
          <Input className="rounded-full h-12" type="text" placeholder="Search..." />
          <Button className="h-12 bg-darkBrown"  type="submit"><Search className='h-24 w-24' /></Button>

      </div>
      
      <div className='buttons flex flex-[0.3] lg:flex-[0.7]'>
        <div className='lg:hidden flex flex-1 items-center justify-center space-x-1'>
          <Button className="h-12 mr-2" type="button">{<ShoppingCart/>}</Button>
          <div className="flex flex-col  items-center justify-center">
          <AlignJustify className="h-12 w-12 cursor-pointer" onClick={toggleMenu} />
            
          </div>
        </div>
        <div className='hidden lg:flex justify-center flex-1 items-center space-x-2'>
        <Link to="/register"><Button variant="outline" className="h-12 ">Register</Button></Link> 
          <Link to="/login"><Button className="h-12 bg-darkBrown" type="button">Login</Button></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar