import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  // true if failed, false is succeed
  const [operationFailed, setFail] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const person = { name: newName, number: newNumber }
    const isNewPerson = persons.filter(person =>
      person.name === newName).length === 0

    if (isNewPerson) {
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setFail(false)
          setNotification("Added " + person.name)
          setTimeout(() => setNotification(null), 3000)
        })
        .catch(error => {
          setFail(true)
          setNotification(error.response.data.error)
          setTimeout(() => setNotification(null), 5000)
        })
    } else {
      if (window.confirm(person.name + " is already in the phonebook. Replace the old number?")) {
        const id = persons.find(p => p.name.toLowerCase() === person.name.toLowerCase()).id
        updatePerson(id, person)
      }
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

  const deletePerson = (event) => {
    const person = persons.find(p => p.id === event.target.id)
    if (window.confirm("Delete " + person.name + "?")) {
      personService
        .remove(person.id)
        .then(removedId => {
          setPersons(persons.filter(p => p.id !== person.id))
          setFail(false)
          setNotification("Deleted " + person.name)
          setTimeout(() => setNotification(null), 3000)
        })
    }
  }

  const updatePerson = (id, person) => {
    personService
      .update(id, person)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        setFail(false)
        setNotification("Updated " + person.name)
        setTimeout(() => setNotification(null), 3000)
      })
      .catch(error => {
        setFail(true)
        setNotification("Information of " + person.name + " has already been removed from the server.")
        setTimeout(() => setNotification(null), 3000)
      })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} fail={operationFailed} />
      <Filter filter={filter} changeHandler={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        name={newName}
        number={newNumber}
        submitHandler={addPerson}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )

}

export default App