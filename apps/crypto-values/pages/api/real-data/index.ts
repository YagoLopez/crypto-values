import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const urlEndpoint =
    'https://coin360.com/api/coins?currency=USD&updates_from=1629894793&period=24h&no_charts=true'
  try {
    const { data } = await axios.get(urlEndpoint)
    res.status(200).json(data)
  } catch (e) {
    res.status(500).json(e)
  }
}
