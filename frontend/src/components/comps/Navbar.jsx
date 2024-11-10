import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlignJustify, CircleUser, LogOut, Search, ShoppingCart, User } from 'lucide-react'
import PropTypes from "prop-types"
import { useState } from "react"
import { Link } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"

const Navbar = ({ logout, isAuthenticated, user }) => {
  // console.log(user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const avatar = (name) => {
    return name.slice(0, 1).toUpperCase();
  }
  // console.log(avatar("abhuishej"));

  return (
    <div className='flex h-20 justify-between'>
      <div className='logo flex-[0.4] '>
        <Link className="flex flex-1 justify-center items-center h-full font-jma text-2xl font-normal " to="/">COURSELY</Link>
      </div>
      <div className='search hidden lg:flex justify-center items-center space-x-2 flex-[0.8] bg-ble-700 px-6'>

        <Input className="rounded-full h-12" type="text" placeholder="Search..." />
        <Button className="h-12 bg-darkBrown" type="submit"><Search className='h-24 w-24' /></Button>

      </div>

      <div className='buttons flex flex-[0.3] lg:flex-[0.7]'>
        <div className='lg:hidden flex flex-1 items-center justify-center space-x-1'>
          <Button className="h-12 mr-2" type="button">{<ShoppingCart />}</Button>
          <div className="flex flex-col  items-center justify-center">

            <DropdownMenu>
              <DropdownMenuTrigger><AlignJustify className="h-12 w-12 cursor-pointer" onClick={toggleMenu} /></DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 mr-4">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAuthenticated ? <>
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full flex items-center justify-between px-2">
                      <span>Account</span> <span><User /> </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full flex items-center justify-between px-4" onClick={logout}>
                    <span>Logout</span> <span><LogOut /> </span>
                  </DropdownMenuItem>
                </> : <>
                  <DropdownMenuItem>
                    <Link to="/register" className="w-full flex items-center justify-between px-2">
                      <span>Signup</span> <span><CircleUser /> </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="w-full flex items-center justify-between px-2" >
                    <Link to="/login" className="w-full flex items-center justify-between px-2">
                      <span>Login</span>
                    </Link>
                  </DropdownMenuItem>
                </>}
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
        <div className='hidden lg:flex justify-center flex-1 items-center space-x-4'>

          {isAuthenticated && user.role === "student" ? <>
            <Link to="my-learnings" className="text-lg hover:text-darkBrown font-semibold">My Learning</Link>
          </> : <>
            <Link to="/my-courses">My Courses</Link>
          </>}

          {isAuthenticated ? <>
            <Link to={`/profile`} className="h-12 w-12 bg-cover text-2xl rounded-full p-1 uppercase text-lightBrown flex justify-center items-center">
              <Avatar>
                <AvatarImage className="bg-cover rounded-full" src={user.pfp} />
                <AvatarFallback>{avatar(user.name)}</AvatarFallback>
              </Avatar>
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="h-12 w-12 border-2 border-darkBrown  flex items-center justify-center rounded-full " onClick={logout}><LogOut className="w-full w-full" /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </> : <>
            <Link to="/register"><Button variant="outline" className="h-12 ">Register</Button></Link>
            <Link to="/login"><Button className="h-12 bg-darkBrown" type="button">Login</Button></Link></>}
        </div>
      </div>
    </div>
  )
}

export default Navbar

Navbar.propTypes = {
  logout: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};