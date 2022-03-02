import {ARTICLES_URL, COUNTRY, API_KEY_NEWS, CATEGORY} from '../config/config.js';
import {fetch} from 'react-native-ssl-pinning';

export async function fetchArticles(){
    try{
     let articles =  await fetch(`${ARTICLES_URL}?country=${COUNTRY}&category=${CATEGORY}`, {
            method: 'GET',
            timeoutInterval: 10000,
            sslPinning: {
               certs: [ "sni-cloudflaressl-com-chain-news"]
            },
            headers : {
                Accept: "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", "e_platform": "mobile",
                'X-API-KEY' : API_KEY_NEWS
            }
        });
        let response  = await articles.json();
    
        articles = null;
        return response.articles;


    }catch(e){
        throw e;
    }
}
