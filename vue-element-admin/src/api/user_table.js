import fetch from 'utils/fetch';

export function fetchUserList(query) {
  return fetch({
    url: '/account/userList',
    method: 'get',
    params: query
  });
}

export function fetchExportUser(query) {
  return fetch({
    url: '/account/exportUser',
    method: 'get',
    params: query
  });
}

export function fetchPv1(pv) {
  return fetch({
    url: '/article_table/pv',
    method: 'get',
    params: { pv }
  });
}

export function deleteUser(userId) {
  const data = {
    userId
  };
  return fetch({
    url: '/account/deleteUser',
    method: 'post',
    data
  });
}

export function recoverUser(userId) {
  const data = {
    userId
  };
  return fetch({
    url: '/account/recoverUser',
    method: 'post',
    data
  });
}
