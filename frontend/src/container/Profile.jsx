import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Profile = ({ user }) => {
  console.log(user);
  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.role}</h1>
      <h1>{user.bio}</h1>
      <img src={user.pfp} alt="" />

      <Link to="/profile/edit-profile"><Button>Edit Profile</Button></Link>
    </div>
  )
}

export default Profile;

Profile.propTypes = {
  user: PropTypes.object, 
};