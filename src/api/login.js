import fetch from 'utils/fetch';

export function loginByEmail(user_email, user_pwd) {
  const data = {
    user_email,
    user_pwd,
    app_key:"eW91bGlueW91a2UzLjA",
    nonce:parseInt(Date.parse( new Date())/1000),
    timestamp:parseInt(Date.parse( new Date())/1000)
  };
  console.log(data);
  return fetch({
    url: '/token/mobile',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo(token,id) {
  const params = {
    app_key:"eW91bGlueW91a2UzLjA",
    access_token:token
  }
  // console.log(params);
  return fetch({
    url: '/user/'+id,
    method: 'get',
    params
  });
}
