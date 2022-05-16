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

export const getSpecificUser = async ({ id, name }) =>
  API({
    method: 'GET',
    url: '/api/v1/user/self',
    params: {
      id,
      name,
    },
  })

export const getUserByToken = async () =>
  API({
    method: 'GET',
    url: '/api/v1/user/get-by-token',
  })
