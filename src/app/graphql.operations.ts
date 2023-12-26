import { gql } from 'apollo-angular';

const GET_POSTS = gql`
query GetComment($commentId: ID!) {
  comment(id: $commentId) {
    body
    email
    id
    name
    post {
      body
    }
  }
}
`
const CREATE_COMMENTS = gql`
mutation createComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    name
    email
    body
  }
}
`

export { GET_POSTS, CREATE_COMMENTS };
