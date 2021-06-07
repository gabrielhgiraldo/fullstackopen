import React from 'react'

const CreateBlogForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
            <div>
                title:
                <input
                type='text'
                name='title'
                value={title}
                onChange={handleTitleChange}/>
            </div>
            <div>
                author:
                <input
                type='text'
                name='author'
                value={author}
                onChange={handleAuthorChange}/>
            </div>
            <div>
                url:
                <input
                type='text'
                name='url'
                value={url}
                onChange={handleUrlChange}/>
            </div>
            <button>create</button>
            </form>
        </div>  
    )
}

export default CreateBlogForm