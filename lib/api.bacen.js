const axios = require('axios')
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = (date) => axios.get(getUrl(date))
const extractCotacao = res => res.data.value[0].cotacaoCompra
const getDate = () => {
    const today = new Date()
    return (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()
}
const getCotacao = async() => {
    try{
        const today = getDate()
        console.log(today)
        const res = await getCotacaoAPI(today) //'04-22-2019'
        const cotacao = extractCotacao(res)
        return cotacao
    }catch(err) {
        return ''
    }
}

module.exports = {
    getCotacaoAPI,
    extractCotacao,
    getCotacao
}