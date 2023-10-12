/**
 * Recommendation data
 * @see https://github.com/Pocket/firefox-api-proxy/blob/main/openapi.yml#L120
 */
export interface Recommendation {
  /** Constant identifier for Recommendation type objects. */
  __typename: string
  /** Numerical identifier for the Recommendation. This is specifically a number for Fx client and Mozilla data pipeline compatibility. */
  tileId: number
  /** The URL the Recommendation. */
  url: string
  /** The title of the Recommendation. */
  title: string
  /** An excerpt from the Recommendation. */
  excerpt: string
  /** The publisher of the Recommendation. */
  publisher: string
  /** The primary image for a Recommendation. */
  imageUrl: string
  /** Article read time in minutes */
  timeToRead: number
}
