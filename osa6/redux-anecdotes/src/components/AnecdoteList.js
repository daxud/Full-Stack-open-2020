import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote.id)}>vote</button>
          </div>
        </div>
    )
}
// function for sorting the anecdotes
const compareVotes = (a,b) => {
  if (a.votes < b.votes) {
    return 1
  }
  if (a.votes > b.votes) {
    return -1
  }
  return 0
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const sortedAnecdotes = anecdotes.sort(compareVotes)
    return(
    <div>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.map(anecdote =>
        <Anecdote
            key = {anecdote.id}
            anecdote= {anecdote}
            handleClick= { () => {
                dispatch(likeAnecdote(anecdote.id))
                dispatch(notificationChange('you voted: "' + anecdote.content + '"'))
                setTimeout( () => dispatch(notificationChange('')), 5000)
              }
            }
        />
        )}
    </div>
    )
}

export default AnecdoteList