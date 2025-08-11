import {z} from 'zod'
import {CurrencySchema} from '../schema/crypto_schema'


export type Currency =z.infer<typeof CurrencySchema>
