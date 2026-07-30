import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { journal, rank } = req.body;
        if (!journal || !rank) return res.status(400).json({ error: 'Journal and rank are required' });

        await redis.hset('global_ranks', { [journal]: rank });
        res.status(200).json({ success: true, message: 'Rank contributed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save rank' });
    }
}
