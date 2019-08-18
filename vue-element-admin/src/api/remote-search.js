import fetch from 'utils/fetch';

export function searchUser(name) {
  return fetch({
    url: '/article/list',
    method: 'get',
    params: {name}
  });
}

export function transactionList(query) {
  return fetch({
    url: '/article/detail',
    method: 'get',
    params: query
  });
}



