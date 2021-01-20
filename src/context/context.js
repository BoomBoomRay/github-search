import React, { useState, useEffect, createContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  const searchUser = async (user) => {
    toggleError();
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) => {
      console.log(err);
    });
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url, repos_url } = response.data;
      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((result) => {
          const [repos, followers] = result;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toggleError(true, 'User does not exist');
    }
    getRequest();
    setLoading(false);
  };

  // Check rate requests from API
  const getRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'Sorry, you have exeeded you hourly rate limit!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }
  useEffect(getRequest, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
