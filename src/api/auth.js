import API from './'

export const login = async ({ email, password }) =>
  API({
    method: 'POST',
    url: '/api/v1/user/login',
    data: { email, password },
  })
