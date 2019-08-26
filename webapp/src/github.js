import Octokit from '@octokit/rest';

const octokit = Octokit({baseUrl: 'https://api.github.com'});

export default octokit;