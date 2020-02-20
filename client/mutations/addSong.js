import gql from 'graphql-tag'

export default gql`
mutation AddSong($title:String, $author:String){
    addSong(title: $title, author: $author) {
            title, author
        }
    }
`