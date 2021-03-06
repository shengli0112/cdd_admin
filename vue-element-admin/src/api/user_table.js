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

export function updateUser(data) {
  return fetch({
    url: '/account/updateServiceArae',
    method: 'post',
    data
  });
}

export function cityList() {
  return fetch({
    url: '/region/findAllCity',
    method: 'get'
  });
}

export function countyList(city) {
  return fetch({
    url: '/region/findCountyByCity',
    method: 'get',
    params: { city }
  });
}

export function townList(county) {
  return fetch({
    url: '/region/findTownByCounty',
    method: 'get',
    params: { county }
  });
}
