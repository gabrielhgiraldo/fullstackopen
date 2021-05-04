import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]}></Part>
      <Part part={props.parts[1]}></Part>
      <Part part={props.parts[2]}></Part>
    </>
  )
}

const Total = (props) => {
  return (
    <p>number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name:'Fundamentals of React',
      exercises:10
    },
    {
      name:'Using props to pass data',
      exercises: 7
    },
    {
      name:'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts} ></Content>
      <Total parts={parts}></Total>
    </div>
  )
}

export default App;
