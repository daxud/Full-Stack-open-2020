import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  //blog is a json blog object
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (updatedBlog) => {
  const url = baseUrl + '/' + updatedBlog.id
  const response = await axios.put(url, updatedBlog)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = baseUrl + '/' + blogId
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, createBlog, setToken, update, remove }