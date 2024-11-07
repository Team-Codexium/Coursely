import PropTypes from 'prop-types';


const Profile = ({ user }) => {
  // console.log(user);
  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.role}</h1>
      <h1>{user.bio}</h1>
    </div>
  )
}

export default Profile;

Profile.propTypes = {
  user: PropTypes.object, 
};