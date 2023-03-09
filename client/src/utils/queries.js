import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      teams {
        title
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    users(userId: $userId) {
      _id
      username
      teams
    }
  }
`;

export const SEARCH_USER = gql`
query User {
  users {
    _id
    username
    email
    personality
    compatibility {
      type
      rating
    }
    teams {
      _id
      title
    }
  }
}
`;