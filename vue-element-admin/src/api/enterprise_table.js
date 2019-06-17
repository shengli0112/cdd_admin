import fetch from 'utils/fetch';

export function fetchEnterpriseList(query) {
  return fetch({
    url: '/enterprise/findEnterpriseList',
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

export function deleteEnterprise(enterpriseId) {
  const data = {
    enterpriseId
  };
  return fetch({
    url: '/enterprise/deleteEnterprise',
    method: 'post',
    data
  });
}

export function recoverEnterprise(enterpriseId) {
  const data = {
    enterpriseId
  };
  return fetch({
    url: '/enterprise/recoverEnterprise',
    method: 'post',
    data
  });
}
