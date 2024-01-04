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

export const GET_USERS =  gql`
query Users {
  users {
    data {
      id
      name
      phone
      username
      website
      email
    }
  }
}
`

export const CREATE_USERS = gql`
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    phone
    username
    website
    email
  }
}
`

export const DELETE_USERS = gql`
mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId)
}
`

export const UPDATE_USERS = gql`
mutation UpdateUser($updateUserId: ID!, $updateUserInput2: UpdateUserInput!) {
  updateUser(id: $updateUserId, input: $updateUserInput2) {
    id
    name
    phone
    email
    website
    username
  }
}
`

export const GET_USER_BY_ID = gql`
query User($userId: ID!) {
  user(id: $userId) {
    id
    name
    phone
    website
    username
    email
  }
}
`
export { GET_POSTS, CREATE_COMMENTS };
