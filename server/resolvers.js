// @ts-nocheck
/* eslint-disable no-undef */

const axios = require( "axios" );

const accessToken = '9a879915e7b9e21269739537647d1c75e0b66941';

const axiosRequest = async(url) => {
    return await axios({
            method: 'GET',
            url,
            headers: {
                'Authorization': `Bearer ${ accessToken }`,
                'Content-Type': 'application/json',
                'X-RateLimit-Limit': 5000
            }
        })
        .then( ( response ) => {
            return response.data;
        } );
};

const resolvers = {
    GetIssue: {

        get_repo_list: (parent) => {
            const promises = parent.map(async(item) => {
                const repo_Type = {
                    id: item.id,
                    node_id: item.node_id,
                    full_name: item.full_name,
                    description: item.description,
                };

                return {...item, ...repo_Type, };
            });
            return Promise.all(promises);
        },

    },

    Query: {
        githubLoginUrl: () => `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`
        ,

        getIssues: async(_, { username }) => {
            const issues_url = `https://api.github.com/users/${ username }/repos`;
            const response = await axiosRequest( issues_url );
            return response;
        },
    },
};

module.exports = resolvers;
