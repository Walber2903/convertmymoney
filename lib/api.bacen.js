const axios = require('axios')
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getDate = () => {
    const today = new Date()
    return (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()
}
const getCotacao = ({ getDate, getUrl, getCotacaoAPI, extractCotacao}) => async() => {
    try{
        const today = getDate()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url) //'04-22-2019'
        const cotacao = extractCotacao(res)
        console.log(cotacao)
        return cotacao
    }catch(err) {
        return ''
    }
}

module.exports = {
    getCotacaoAPI,
    extractCotacao,
    getCotacao : getCotacao({ getUrl, getCotacaoAPI, extractCotacao, getDate }),
    pure: { getCotacao },
    getDate,
    getUrl
}