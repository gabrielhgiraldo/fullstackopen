import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((total, part) => total + part.exercises, 0)
    return(
      <b>total of exercises {sum}</b>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
          <Part part={part}></Part>
        )}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course}></Header>
        <Content course={course}></Content>
        <Total course={course}></Total>
      </div>
    )
  }

export default Course
  