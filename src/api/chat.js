import API from '.'

export const getChat = async ({
  token,
  senderId,
  recipientId,
  offset, // total chat displayed in client
}) =>
  API({
    method: 'GET',
    url: `/api/v1/chat`,
    headers: {
      Authorization: token,
    },
    params: {
      senderId,
      recipientId,
      offset, // total chat displayed in client
    },
  })
