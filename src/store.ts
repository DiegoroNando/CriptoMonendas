import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import type { CryptoCurrency } from './types'
import { getCryptos } from './services/CryptoServices'

 type CryptoStore ={
    criptoCurrencies: CryptoCurrency []
    fetchCryptos: () => Promise<void>
 }





export const useCryptoStore = create<CryptoStore>()(devtools((set)=>({
    criptoCurrencies: [],
    fetchCryptos: async ()=>{
       const criptoCurrencies = await getCryptos()
           set(()=> ({
            criptoCurrencies
           })) 
    }
})))