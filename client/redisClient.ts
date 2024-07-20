import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://national-bluejay-44790.upstash.io',
  token: 'Aa72AAIncDFlNmY5MTFlZGJjMTc0NDNiYWY0ZmE0ZjM5MTBiOTJhY3AxNDQ3OTA',
})

export default redis;