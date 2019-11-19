import fetch from 'utils/fetch';

export function importUserBrokerList(query) {
  return fetch({
    url: '/userBroker/importUserBroker',
    method: 'get',
    params: query
  });
}

export function findUserBroker(query) {
  return fetch({
    url: '/userBroker/findUserBroker',
    method: 'get',
    params: query
  });
}


export function updateUserBroker(data) {
  return fetch({
    url: '/userBroker/updateUserBroker',
    method: 'post',
    data
  });
}

export function deleteUserBroker(userBrokerId) {
  const data = {
    userBrokerId
  };
  return fetch({
    url: '/userBroker/deleteUserBroker',
    method: 'post',
    data
  });
}

export function recoverUserBroker(userBrokerId) {
  const data = {
    userBrokerId
  };
  return fetch({
    url: '/userBroker/recoverUserBroker',
    method: 'post',
    data
  });
}

export function addUserBroker(data) {
  return fetch({
    url: '/userBroker/addUserBroker',
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
