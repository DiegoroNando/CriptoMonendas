import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import type { CryptoCurrency, CryptoPrice, Pair } from './types'
import { getCryptos, fetchCurrencyPrice } from './services/CryptoServices'

 type CryptoStore ={
    criptoCurrencies: CryptoCurrency []
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
 }


export const useCryptoStore = create<CryptoStore>()(devtools((set)=>({
    criptoCurrencies: [],
    result :{
            IMAGEURL:'',
            PRICE:'',
            HIGHDAY:'',
            LOWDAY:'',
            CHANGEPCT24HOUR:'',
            LASTUPDATE:''
    },
    loading: false,
    fetchCryptos: async ()=>{
       const criptoCurrencies = await getCryptos()
           set(()=> ({
            criptoCurrencies
           })) 
    },
    fetchData: async(pair) =>{
        set(()=> ({
            loading:true
        }))
     const result = await fetchCurrencyPrice(pair)
       set(()=> ({
            result,
            loading: false
       }))
    }


})))