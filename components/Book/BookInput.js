import { useState } from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { GET_MY_BOOKS } from "./BookCollection"
import { FormInput } from "semantic-ui-react"

const ADD_BOOK = gql`
    mutation ($title: String!, $isPublic: Boolean!, $image: String!, 
        $description: String!, $author: String!) {
            insert_books(objects: {title: $title, is_public: $isPublic,
            image: $image, description: $description, author: $author}) {
                afftected_rows
                returing {
                    id 
                    title
                    image
                    description 
                    author
                    created_at
                }
            }
    }`

const bookInput = ({ isPublic = false }) => {
    let input

    const [bookInput, setBookInput] = useState({})
    
    const updateCache = (cache, { data }) => {
        // If this is for the public feed, do nothing
        if (isPublic) {
            return null
        }

        // Fetch books from cache
        const existingBooks = cahce.readQuery({
            query: GET_MY_BOOKS
        })

        // Add new book to cache
        const newBook = data.insert_books.returning[0]
        cache.writeQuery({
            query: GET_MY_BOOKS,
            data: {books: [newBook, ...existingBooks.books]}
        })
    }

    const resetInput = () => {
        setBookInput("")
    }

    const [addBook] = useMutation(ADD_BOOK, {
        update: updateCache,
        onCompleted: resetInput
    })

    return (
        <form 
            className="formInput"
            onSubmit={event => {
                event.preventDefault()
                addBook({variables: {title: titleInput, author: authorInput, description: descriptionInput}})
            }}
        >
            <input
                className="input"
                placeholder="Book title"
                value={titleInput}
                onChange={e => (setBookInput({ title: e.target.value }))}
            />
            <input
                className="input"
                placeholder="Author"
                value={authorInput}
                onChange={e => (setBookInput({ author: e.target.value }))}
            />
            <input
                className="input"
                placeholder="Description"
                value={descriptionInput}
                onChange={e => (setBookInput({ description: e.target.value }))}
            />
        </form>
    )
}

export default bookInput