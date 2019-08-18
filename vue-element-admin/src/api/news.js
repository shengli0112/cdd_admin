import fetch from 'utils/fetch';

export function fetchNewsList(query) {
  return fetch({
    url: '/news/findNewsList',
    method: 'get',
    params: query
  });
}

export function createNews(data) {
  return fetch({
    url: '/news/createNews',
    method: 'post',
    data
  });
}

export function deleteNews(newsId) {
  const data = {
    newsId
  };
  return fetch({
    url: '/news/deleteNews',
    method: 'post',
    data
  });
}

export function recoverNews(newsId) {
  const data = {
    newsId
  };
  return fetch({
    url: '/news/recoverNews',
    method: 'post',
    data
  });
}


