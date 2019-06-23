import fetch from 'utils/fetch';

export function fetchLeaseList(query) {
  return fetch({
    url: '/park/findLeaseParkList',
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

export function deleteLease(leaseParkId) {
  const data = {
    leaseParkId
  };
  return fetch({
    url: '/park/deleteLease',
    method: 'post',
    data
  });
}

export function recoverLease(leaseParkId) {
  const data = {
    leaseParkId
  };
  return fetch({
    url: '/park/recoverLease',
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
