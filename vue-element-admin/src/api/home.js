import fetch from 'utils/fetch';

export function fetchHouseCount() {
  return fetch({
    url: '/house/houseCount',
    method: 'get'
  });
}

