import mongoConnect from './connect'

/**
 * Connect to MongoDB
 * @return {mongoConnect} Function
 */
export default async function dbConnect(): Promise<void> {
  await mongoConnect()
}
