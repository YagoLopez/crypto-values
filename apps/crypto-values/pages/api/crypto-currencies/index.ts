import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import parseurl from 'parseurl'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result, url
  const baseUrl = 'https://coin360.com/api/coins'
  const queryString = parseurl(req).query
  try {
    if (req.query.period === 'custom') {
      url = `${baseUrl}/custom?${queryString}`
    } else {
      url = `${baseUrl}?${queryString}`
    }
    result = await axios.get(url)
    res.setHeader('Content-Type',  'text/html; charset=UTF-8')
    res.status(200).json(result.data)
  } catch (e) {
    res.status(500).json(e)
  }
}
