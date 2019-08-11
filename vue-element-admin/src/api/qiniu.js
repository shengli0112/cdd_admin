import fetch from 'utils/fetch';

export function getToken() {
  return fetch({
    url: '/account/getQiniuToken',
    method: 'get'
  });
}
