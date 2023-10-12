export default defineEventHandler(async (event) => {
  try {
    const { server } = getRouterParams(event)

    const token = getCookie(event, 'accessToken')
    const invites = await fetch(
      `https://${server}/api/invitation/v1/status`,
      { headers: { authorization: `Bearer ${token}` } },
    )
      .then(response => response.json())
    return invites
  }
  catch (err) {
    console.warn(err)
    return []
  }
})
