import fetch from 'utils/fetch';

export function fetchList(query) {
  return fetch({
    url: '/broker/brokerList',
    method: 'get',
    params: query
  });
}

export function fetchPv(pv) {
  return fetch({
    url: '/article_table/pv',
    method: 'get',
    params: { pv }
  });
}

export function passAudit(id, userId, applyType) {
  const data = {
    id,
    userId,
    applyType
  };
  return fetch({
    url: '/broker/passAudit',
    method: 'post',
    data
  });
}
