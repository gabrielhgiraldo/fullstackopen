const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((likesSum, blog) => likesSum += blog.likes, 0)
}

const favoriteBlog = blogs => {
    if (blogs.length == 1){
        return blogs[0]
    }
    return blogs.reduce((currentFavorite, blog) => {
        return blog.likes > currentFavorite.likes ? blog : currentFavorite
    }, blogs.shift())
}

module.exports = {
    dummy,
    favoriteBlog,
    totalLikes
}

