export default defineEventHandler(async (event) => {
  try {
    const { server } = getRouterParams(event)

    const invites = await fetch(
        `https://${server}/api/invitation/v1/status`,
    )
      .then(response => response.json())
      .then(response => response.data)

    return invites
  }
  catch (err) {
    console.warn(err)
    return []
  }
})
