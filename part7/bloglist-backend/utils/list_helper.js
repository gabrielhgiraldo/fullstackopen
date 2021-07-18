const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((likesSum, blog) => likesSum += blog.likes, 0)
}

const favoriteBlog = blogs => {
    if (blogs.length === 1){
        return blogs[0]
    }
    return blogs.reduce((currentFavorite, blog) => {
        return blog.likes > currentFavorite.likes ? blog : currentFavorite
    }, blogs.shift())
}

const mostBlogs = blogs => {
    if (blogs.length === 0) {
        return undefined
    }
    if (blogs.length === 1) {
        return {
            author: blogs[0].author,
            blogs: 1
        }
    }
    const authorBlogCounts = {}
    return blogs.reduce((mostBlogsAuthor, blog) => {
        authorBlogCounts[blog.author] = authorBlogCounts[blog.author]
            ? authorBlogCounts[blog.author] + 1
            : 1
        if (authorBlogCounts[blog.author] > mostBlogsAuthor.blogs) {
            return {
                author: blog.author,
                blogs: authorBlogCounts[blog.author]
            }
        }
        else {
            return mostBlogsAuthor
        }
    }, { author: '', blogs: 0 })
}

const mostLikes = blogs => {
    if (blogs.length === 0) {
        return undefined
    }
    if (blogs.length === 1) {
        return {
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    }
    const authorLikes = {}

    return blogs.reduce((mostLikedAuthor, blog) => {
        authorLikes[blog.author] = authorLikes[blog.author]
        ? authorLikes[blog.author] + blog.likes
        : blog.likes

        if (authorLikes[blog.author] > mostLikedAuthor.likes) {
            return {
                author: blog.author,
                likes: authorLikes[blog.author]
            }
        }
        else {
            return mostLikedAuthor
        }
    }, { author: '', likes: 0})
}

module.exports = {
    dummy,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    totalLikes
}

