import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
const parseurl = require('parseurl')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const baseUrl = 'https://coin360.com/api/coins'
  let result, url, queryString
  try {
    if (req.query.period === 'custom') {
      queryString = parseurl(req).query
      url = `${baseUrl}/custom?${queryString}`
    } else {
      queryString = parseurl(req).query
      url = `${baseUrl}?${queryString}`
    }
    result = await axios.get(url)
    res.status(200).json(result.data)
  } catch (e) {
    res.status(500).json(e)
  }
}
