import API from './'

export const getExistUser = async ({ id, page }) =>
  API({
    method: 'GET',
    url: '/api/v1/user/other',
    params: {
      id,
      page,
    },
  })

export const getSelf = async ({ id }) =>
  API({
    method: 'GET',
    url: '/api/v1/user/self',
    params: {
      id,
    },
  })

export const getUserByToken = async ({ token }) =>
  API({
    method: 'GET',
    url: '/api/v1/user/get-by-token',
    headers: {
      Authorization: token,
    },
  })
