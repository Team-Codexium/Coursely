import PropTypes from 'prop-types';
import React from 'react'
import { Progress } from '.';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const MyCourses = ({ user }) => {
  const student = user.role === 'Student';
  const courses = student ? user.enrolledCourses: user.courseCreated

  return (
    <div>
      <div>
        <h1>
          My {student ? "Learnings" : "Courses"}
        </h1>
      </div>

    <div className='courses'>
      {courses.map((course, index) => {
        <Progress key={index} course={course} />
      })}
    </div>
    <div className="buttons">
      <Link to="/explore"><Button variant="outline"className="h-12 text-lg mx-2" >Explore</Button></Link>
      <Link to="/my-courses/create" className={`${student && "hidden"}`}><Button className="h-12 text-lg mx-2">Create</Button></Link>

    </div>
    </div>
  )
}

export default MyCourses

MyCourses.propTypes = {
  user: PropTypes.object
};