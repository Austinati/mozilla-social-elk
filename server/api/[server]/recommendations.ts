export default defineEventHandler(async (event) => {
  try {
    const { locale } = getQuery(event)

    const recommendations = await fetch(
      `https://mozilla.social/content-feed/moso/v1/discover?locale=${locale}&image_sizes=268x`,
    )
      .then(response => response.json())
      .then(response => response.data)

    return recommendations
  }
  catch (err) {
    console.warn(err)
    return []
  }
})
