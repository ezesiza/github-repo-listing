import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';
const endPointURL = "http://localhost:9000/graphql";

const client = new ApolloClient({
    link: new HttpLink({ uri: endPointURL }),
    cache: new InMemoryCache()
});

const GetRepoListQuery =
    gql `query getRepoQuery( $username: String! ) {
   getIssues(username: $username) {
    get_repo_list {
      id
      node_id
      name
      url
        owner{
        login
      }
      stargazers_count
      created_at
      full_name
      closed_issues
      pulls_url
      open_issues_url
      description
    }
  }
  }`;


export async function getRepoList(username) {
    try {
        const { data } = await client.query({
            query: GetRepoListQuery,
            variables: { username },
            fetchPolicy: "cache-first"
        });
        return data.getIssues.get_repo_list;
    } catch (e) {
        alert('Invalid username!: or append space after the last letter and refresh');
        return new Array(0);
    }
}