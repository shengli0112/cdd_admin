import fetch from 'utils/fetch';

export function fetchEntrustList(query) {
  return fetch({
    url: '/entrust/findAdminEntrustList',
    method: 'get',
    params: query
  });
}


export function updateEntrust(data) {
  return fetch({
    url: '/entrust/updateEntrust',
    method: 'post',
    data
  });
}

export function deleteEntrust(entrustId) {
  const data = {
    entrustId
  };
  return fetch({
    url: '/entrust/deleteEntrust',
    method: 'post',
    data
  });
}

export function recoverEntrust(entrustId) {
  const data = {
    entrustId
  };
  return fetch({
    url: '/entrust/recoverEntrust',
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
