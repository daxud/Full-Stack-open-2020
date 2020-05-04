import React from 'react'

const Header = (props) => {
    return(
    <h1>
      {props.course}
    </h1>
    )
  }
  
  const Content = ({ parts }) => {
    console.log(parts)
    return(
      <div>
        {parts.map(part =>
          <Part key = {part.id} part = {part.name} exercise = {part.exercises} />
        )}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <p>{props.part} {props.exercise}</p>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.map(part => part.exercises).reduce((sum, current) => sum + current);
    return(
      <p>total of {total} exercises</p>
    )
    }
  
  
  const Course = ({course}) => {
    return(
      <>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
      </>
    )
  }

  export default Course
