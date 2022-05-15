import API from '.'

export const getChat = async ({ token, senderId, recipientId, page }) =>
  API({
    method: 'GET',
    url: `/api/v1/chat`,
    headers: {
      Authorization: token,
    },
    params: {
      senderId,
      recipientId,
      page,
    },
  })
