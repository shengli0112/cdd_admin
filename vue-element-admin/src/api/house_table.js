import fetch from 'utils/fetch';

export function fetchHouseList(query) {
  return fetch({
    url: '/house/findHouseList',
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

export function deleteHouse(houseId) {
  // const data = {
  //   id
  // };
  return fetch({
    url: '/house/deleteHouse',
    method: 'post',
    params:houseId
  });
}
