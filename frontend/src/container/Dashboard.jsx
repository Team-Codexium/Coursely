// import { Navbar } from '@/components/comps'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import AppWrap from '@/wrapper/AppWrap'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {hero} from '../assets'

const Dashboard = ({ logout, user }) => {
  // const [data, setData] = useState([]);
  console.log(user);
  // const handleSubmit = async () => {
  //   const response = await axios.get('http://localhost:3000/auth/google');
  //   setData(response.data);
  // }

  return (
    <div className=' max-w-[80rem]  flex flex-col items-start justify-center overflow-hidden '>
      <h1 className='font-season text-3xl font-bold my-4 px-2 uppercase'>Welcome ABhishek</h1>
      <div style={{ backgroundImage: `url(${hero})`, overflow:"hidden"}}  className='bg-cover bg-center h-80 w-screen mt-6 flex flex-row justify-start items-center lg:w-fll overflow-hidden'>
        <Card className="w-96 ml-5 hidden lg:flex flex-col">
          <CardHeader>
            <CardTitle className="font-season text-2xl">Welcome to Coursely</CardTitle>
            <CardDescription className="font-poppins">Learning that makes you better</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Explore</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className='flex flex-col justify-start -center  w-full p-4 mt-4 md:mt-7 lg:hidden'>
        <h1 className='font-season text-xl md:text-4xl font-semibold'>
          Learning that makes you better
        </h1>
        <p className='font-poppins text-sm mt-3 text-gray-700'>Skills for your present (and future). Get started with us.</p>
        <Button className="mt-7 md:text-lg md:h-12">Explore</Button>
      </div>


    </div>
  )
}

export default AppWrap(Dashboard)

Dashboard.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object
}