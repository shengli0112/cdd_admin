import fetch from 'utils/fetch';

export function fetchSellList(query) {
  return fetch({
    url: '/park/findSellParkList',
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

export function deleteSell(sellParkId) {
  const data = {
    sellParkId
  };
  return fetch({
    url: '/park/deleteSell',
    method: 'post',
    data
  });
}

export function recoverSell(sellParkId) {
  const data = {
    sellParkId
  };
  return fetch({
    url: '/park/recoverSell',
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
