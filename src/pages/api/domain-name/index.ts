import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Read API
    const { data, error } = await supabase
      .from('DomainName')
      .select('*')

    if (error) return res.status(400).json({ error: error.message })
    return res.status(200).json(data)

  } else if (req.method === 'POST') {
    // Write API
    const { domainName, tld, length, processedByAgent, agentModel } = req.body

    const { data, error } = await supabase
      .from('DomainName')
      .insert({ domainName, tld, length, processedByAgent, agentModel })

    if (error) return res.status(400).json({ error: error.message })
    return res.status(201).json(data)

  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
