import { Navbar } from '@/components/comps'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { LogOut } from 'lucide-react'

const Dashboard = ({logout}) => {
  const [data, setData] = useState([]);
  
  const handleSubmit = async () => {
    const response = await axios.get('http://localhost:3000/auth/google');
    setData(response.data);
  }
 
  return (
    <div>
      <Link to="/profile">
      <Button varient="outline">Profile</Button> 
      </Link>

      <Button onCLick={logout}>Logout</Button>

    </div>
  )
}

export default Dashboard

Dashboard.propTypes = {
  logout: PropTypes.func,
}