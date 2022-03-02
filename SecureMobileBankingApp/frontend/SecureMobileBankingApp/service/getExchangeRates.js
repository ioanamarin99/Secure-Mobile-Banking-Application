import {EXCHANGE_RATES_URL} from '../config/config.js'
import { fetch } from 'react-native-ssl-pinning';

export async function fetchExchangeRates(){
    try{
        let exchangeRates = await fetch(EXCHANGE_RATES_URL,{
            method: 'GET',
            timeoutInterval: 10000,
            sslPinning: {
               certs: [ "sni-cloudflaressl-com-chain-exchange-rates"]
            },
            headers : {
                Accept: "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", "e_platform": "mobile"
            }
        });

        let response = await exchangeRates.json();

       return response.rates;

    } catch(e){
        throw e;
    }
}
