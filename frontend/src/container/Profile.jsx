import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Profile = ({ user }) => {
  return (
    <div className='flex flex-col space-y-5 justify-center items-center'>
      <img src={user.pfp} alt="profile picture" className='h-full w-60  rounded-full ' />
      <h1>Name: <span className='ml-3'>{user.name}</span></h1>
      <h1>Email: <span className='ml-3'>{user.email}</span></h1>
      <h1>Interests: <span className='ml-3'>{user.interests}</span></h1>
      <h1>Bio: <span className='ml-3'>{user.bio}</span></h1>

      <Link to="/profile/edit-profile"><Button>Edit Profile</Button></Link>
    </div>
  )
}

export default Profile;

Profile.propTypes = {
  user: PropTypes.object, 
};