import fetch from 'utils/fetch';

export function fetchSlideList(query) {
  return fetch({
    url: '/slide/slideList',
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

export function deleteSlide(slideId) {
  const data = {
    slideId
  };
  return fetch({
    url: '/slide/deleteSlide',
    method: 'post',
    data
  });
}

export function recoverSlide(slideId) {
  const data = {
    slideId
  };
  return fetch({
    url: '/slide/recoverSlide',
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
