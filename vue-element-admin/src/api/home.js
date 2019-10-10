import fetch from 'utils/fetch';

export function fetchHouseCount() {
  return fetch({
    url: '/house/houseCount',
    method: 'get'
  });
}

export function fetchStatistics() {
  return fetch({
    url: '/statistics/monthStatistics',
    method: 'get'
  });
}

