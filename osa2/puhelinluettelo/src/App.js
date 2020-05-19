import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        const persons = response.data
        console.log(persons)
        setPersons(persons)
      })
  }, [])

  console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
      event.preventDefault()
      const person = {name: newName, number: newNumber}
      const isNewPerson = persons.filter(person =>
        person.name === newName).length === 0

      if (isNewPerson) {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      } else {
        handleError()
      }
  }

  const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleError = () => {
    const msg = `${newName} is already added to phonebook`
    window.alert(msg)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter = {filter} changeHandler = {handleFilterChange}/>
      
      <h3>Add a new</h3>

      <PersonForm
      name = {newName}
      number = {newNumber}
      submitHandler = {addPerson}
      nameChangeHandler = {handleNameChange}
      numberChangeHandler = {handleNumberChange}/>

      <h3>Numbers</h3>

      <Persons persons = {persons} filter = {filter} />
    </div>
  )

}

export default App