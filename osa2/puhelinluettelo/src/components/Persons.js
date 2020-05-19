import React from 'react'

const Persons = ({persons, filter}) => {
    const allContent = persons.map(person =>
      <div key = {person.name}>{person.name} {person.number}</div>
    )
    const filteredContent = persons.filter(person => person.name.includes(filter)).map(person =>
      <div key = {person.name}>{person.name} {person.number}</div>)
    console.log(allContent)
    if (filter === '') {
      return(allContent)
    } else {
      return(filteredContent)
    }
  }

export default Persons