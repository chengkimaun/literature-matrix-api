import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    try {
        const allRanks = await kv.hgetall('global_ranks');
        res.status(200).json(allRanks || {});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch global ranks' });
    }
}
