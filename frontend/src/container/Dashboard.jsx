import { Navbar } from '@/components/comps'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [data, setData] = useState([]);
  
  const handleSubmit = async () => {
    const response = await axios.get('http://localhost:3000/auth/google');
    setData(response.data);
  }
 
  return (
    <div>
      <Navbar />
      <Button varient="outline" onCLick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default Dashboard