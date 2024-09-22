import { Redis } from '@upstash/redis'

const REDIS_URL = process.env.REDIS_URL!
const REDIS_TOKEN = process.env.REDIS_TOKEN!

export const client = new Redis({
	url: REDIS_URL,
	token: REDIS_TOKEN,
})
