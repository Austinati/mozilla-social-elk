export default defineEventHandler(async (event) => {
  try {
    const { server } = getRouterParams(event)

    const auth: string = getHeader(event, 'Authorization') as string

    const invites = await fetch(
      `https://${server}/api/invitation/v1/status`,
      { headers: { authorization: auth } },
    )
      .then(response => response.json())
    return invites
  }
  catch (err) {
    console.warn(err)
    return []
  }
})
