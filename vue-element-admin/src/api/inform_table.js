import fetch from 'utils/fetch';

export function fetchInformList(query) {
  return fetch({
    url: '/house/findInformList',
    method: 'get',
    params: query
  });
}

export function updateHouse(data) {
  return fetch({
    url: '/house/updateHouse',
    method: 'post',
    data
  });
}

export function deleteHouse(houseId) {
  const data = {
    houseId
  };
  return fetch({
    url: '/house/deleteHouse',
    method: 'post',
    data
  });
}

export function recoverHouse(houseId) {
  const data = {
    houseId
  };
  return fetch({
    url: '/house/recoverHouse',
    method: 'post',
    data
  });
}

export function topHouse(houseId) {
  const data = {
    houseId
  };
  return fetch({
    url: '/house/topHouse',
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
