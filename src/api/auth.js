import API from './'

export const login = async ({ email, password }) =>
  API({
    method: 'POST',
    url: '/api/v1/user/login',
    data: { email, password },
  })

export const register = async ({ name, email, password }) =>
  API({
    method: 'POST',
    url: '/api/v1/user/create-user',
    data: {
      name,
      email,
      password,
    },
  })

export const verify = async (token) =>
  API({
    method: 'GET',
    url: `/api/v1/user/verify?token=${token}`,
  })
