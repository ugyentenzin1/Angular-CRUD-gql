import { gql } from 'apollo-angular';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
    }
  }
`

export { GET_POSTS };