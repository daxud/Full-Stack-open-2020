import React from 'react'

const Persons = ({persons, filter, deletePerson}) => {
    const allContent = persons.map(person =>
      <div key = {person.name}>
        {person.name} {person.number}
        <button id={person.id} onClick={deletePerson}>delete</button>
      </div>)

    const filteredContent = persons.filter(person => (person.name.toLowerCase()).includes(filter.toLowerCase())).map(person =>
      <div key = {person.name}>
        {person.name} {person.number}
        <button id={person.id} onClick={deletePerson}>delete</button>
      </div>)

    if (filter === '') {
      return(allContent)
    } else {
      return(filteredContent)
    }
  }

export default Persons