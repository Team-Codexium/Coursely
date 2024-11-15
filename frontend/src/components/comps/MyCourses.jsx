import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useUserContext } from '@/context/UserContext';

const MyCourses = () => {

  const { user } = useUserContext();

  const student = user.role === 'student';
  // const courses = student ? user.enrolledCourses: user.courseCreated
  return (
    <div>
      <div>
        <h1>
          My {student ? "Learnings" : "Courses"}
        </h1>
      </div>

    {/* <div className='courses'>
      {courses.map((course, index) => {
        <Progress key={index} course={course} />
      })}
    </div> */}
    <div className="buttons">
      <Link to="/explore"><Button variant="outline"className="h-12 text-lg mx-2" >Explore</Button></Link> 
      {!student && <Link to="/my-courses/create" className={`${student && "hidden"}`}><Button className="h-12 text-lg mx-2">Create</Button></Link>}

    </div>
    </div>
  )
}

export default MyCourses
