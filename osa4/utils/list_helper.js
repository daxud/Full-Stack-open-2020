const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    const likes = blogs.reduce(reducer, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    var i;
    var favblog = blogs[0]
    // Käy läpi kaikki blogit ja löytää sen millä eniten likejä
    for (i = 0; i < blogs.length; i++) {
        currentLikes = blogs[i].likes
        favBlogLikes = favblog.likes
        if (currentLikes > favBlogLikes) {
            favblog = blogs[i]
        }
    }
    return {
        title: favblog.title,
        author: favblog.author,
        likes: favblog.likes
    }
}

const mostBlogs = (blogs) => {
    dict = {}
    // adds all the authors to dictionary and sets the value "of blogs" to 0
    for (i= 0; i < blogs.length; i++) {
        dict[blogs[i].author] = 0
    }
    // goes thorugh blogs, finds the author of that blog and increments the nof blogs by 1
    for (i=0; i < blogs.length; i++) {
        author = blogs[i].author
        dict[author] = dict[author] + 1
    }
    // finds the author with most blogs from the dictionary we created
    const mostBlogs = Object.entries(dict).reduce((a, b) => a[1] > b[1] ? a : b)
    return {
        author: mostBlogs[0],
        blogs: mostBlogs[1]
    }
}

const mostLikes = (blogs) => {
    dict = {}
    // adds all the authors to dictionary and sets the value of "total likes" to 0
    for (i= 0; i < blogs.length; i++) {
        dict[blogs[i].author] = 0
    }
    // goes thorugh blogs, finds the author of that blog and increments the nof likes
    for (i=0; i < blogs.length; i++) {
        author = blogs[i].author
        dict[author] = dict[author] + blogs[i].likes
    }
    // finds the author with most blogs from the dictionary we created
    const most_likes = Object.entries(dict).reduce((a, b) => a[1] > b[1] ? a : b)
    return {
        author: most_likes[0],
        likes: most_likes[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}