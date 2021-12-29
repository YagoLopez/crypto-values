import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const urlEndpoint = 'https://coin360.com/api/coins'
  try {
    const { data } = await axios.get(urlEndpoint)
    res.status(200).json(data)
  } catch (e) {
    res.status(500).json(e)
  }
}
