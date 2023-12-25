import { gql } from 'apollo-angular';

const GET_POSTS = gql`
 query Query {
  country(code: "BR") {
    name
    emoji
    currency
    languages {
      code
      name
    }
  }
}
`

export { GET_POSTS };
