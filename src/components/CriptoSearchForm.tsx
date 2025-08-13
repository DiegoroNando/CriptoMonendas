
import { currencies } from "../data/indext" 
import { useCryptoStore } from "../store"
import { useState, type ChangeEvent, } from "react"
import type { Pair } from "../types"
import  ErrorMessage from "./ErrorMessage"


export default function CriptoSearchForm() {

    const criptoCurrencies = useCryptoStore((state)=>state.criptoCurrencies)
    const fetchData= useCryptoStore((store)=> store.fetchData)

    const [pair, SetPair] = useState<Pair>({
        currency:'',
        criptoCurrency:''
    })

    const [error, setError]= useState('')

    const handleChange = (e: ChangeEvent<HTMLSelectElement>)=>{
        SetPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(Object.values(pair).includes('')){
            setError('Todos los campos son obligatorios ') 
            return
        }
            setError('')
            fetchData(pair)
    }

  return (
            <form 
            className="form" 
            onSubmit={handleSubmit}
            >
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                <div className="field">
                    <label htmlFor="currency">Moneda:</label>
                    <select 
                    name="currency" 
                    id="currency"
                    onChange={handleChange}
                    value={pair.currency}
                    >
                        <option value="">-- Seleccione --</option>
                        {currencies.map(currency => (
                            <option 
                            key={currency.code} 
                            value={currency.code}
                            >
                                {currency.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field">
                    <label htmlFor="criptoCurrency">CriptoMoneda:</label>
                    <select 
                    name="criptoCurrency" 
                    id="criptoCurrency"
                    onChange={handleChange}
                    value={pair.criptoCurrency}
                    >
                        <option value="">-- Seleccione --</option>
                        {criptoCurrencies.map(cryptos =>(
                            <option
                                key={cryptos.CoinInfo.FullName}
                                value={cryptos.CoinInfo.Name}
                            >
                                {cryptos.CoinInfo.FullName}
                            </option>
                        ))}
                    </select>
                </div>
                <input type="submit" value='Cotizar' />
            </form>
  )
}
