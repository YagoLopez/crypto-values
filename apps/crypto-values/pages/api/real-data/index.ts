import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({ text: 'real data' })
  } catch (e) {
    res.status(500).json(e)
  }
}
