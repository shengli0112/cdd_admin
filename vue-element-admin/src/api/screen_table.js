import fetch from 'utils/fetch';

export function createOpenScreen(data) {
  return fetch({
    url: '/slide/addOpenScreen',
    method: 'post',
    data
  });
}

export function updateOpenScreen(data) {
  return fetch({
    url: '/slide/updateOpenScreen',
    method: 'post',
    data
  });
}

export function fetchOpenScreenList(query) {
  return fetch({
    url: '/slide/openScreenList',
    method: 'get',
    params: query
  });
}


export function deleteOpenScreen(openScreenId) {
  const data = {
    openScreenId
  };
  return fetch({
    url: '/slide/deleteOpenScreen',
    method: 'post',
    data
  });
}

export function recoverOpenScreen(openScreenId) {
  const data = {
    openScreenId
  };
  return fetch({
    url: '/slide/recoverOpenScreen',
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
