import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PropTypes from 'prop-types'

const Progress = ({course}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.instructor}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{course?.lessons.length}</p>
      </CardContent>
      <CardFooter>
        <p>{course?.reviews.length}</p>
      </CardFooter>
    </Card>
  )
}

export default Progress

Progress.propTypes = {
  course: PropTypes.object.isRequired,
}