import fetch from 'utils/fetch';


export function findAdminServiceList(query) {
  return fetch({
    url: '/service/findAdminServiceList',
    method: 'get',
    params: query
  });
}


export function updateServiceInfo(data) {
  return fetch({
    url: '/service/updateServiceInfo',
    method: 'post',
    data
  });
}

export function deleteServiceInfo(serviceId) {
  const data = {
    serviceId
  };
  return fetch({
    url: '/entrust/deleteServiceInfo',
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
