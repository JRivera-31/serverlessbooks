import { useState, Fragment } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Dimmer, Loader } from "semantic-ui-react"

import CollectionItem from "./CollectionItem"

const GET_MY_BOOKS = gql`
    query getMyBooks {
        books(where: {is_public: {_eq: false} }, orber_by: {created_at: desc}) {
            id
            title
            image
            created_at
            description
            author
        }
    }`

// const DELETE_BOOK = gql`
//     mutation deleteBook {
//         delete_books(where: {is_public: {_eq: false}}, )
//     }`

const BookCollection = props => {
    const [books, setBooks] = useState()

    const { books } = props

    const bookCollection = []
    books.forEach((book, index) => bookCollection.push(<CollectionItem key={index} index={index} book={book} />))
}

const BookCollectionQuery = () => {
    const { loading, error, data } = useQuery(GET_MY_BOOKS)

    if (loading) {
        return (
            <Dimmer active>
                <Loader>Loading...</Loader>
            </Dimmer>
        )
    }

    if (error) {
        console.log(error)
        return <div>Error</div>
    }
    
    return <BookCollection books={data.books} />
}

export default BookCollectionQuery
export {GET_MY_BOOKS}