import fetch from 'utils/fetch';

export function fetchList() {
  return fetch({
    url: '/article/list',
    method: 'get'
  });
}

export function getList() {
  return fetch({
    url: '/article/list',
    method: 'get'
  });
}

export function getArticle(id) {
  return fetch({
    url: '/article/detail',
    method: 'get',
    params:{id}
  });
}

