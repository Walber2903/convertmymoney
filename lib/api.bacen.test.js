const api = require('./api.bacen')
const axios = require('axios')

jest.mock('axios')

test('getCotacaoAPI', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    }

    axios.get.mockResolvedValue(res)

    api.getCotacaoAPI('url').then( resp => {
        expect(resp).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
})

test('extractCotacao', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    }    
    const cotacao = api.extractCotacao(res)
    expect(cotacao).toBe(3.90)
})

describe('getToday', () => {
    const RealDate = Date

    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor() {
                return new RealDate(date)
            }
        }
    }

    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2019-01-01T12:00:00z')
        const today = api.getDate()
        expect(today).toBe('1-1-2019')
    })
})

test('getUrl', () => {
    const url = api.getUrl('1-1-2019')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%271-1-2019%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getCotacao', () => {

    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    }

    const getDate = jest.fn()
    getDate.mockReturnValue('01-01-2019')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockReturnValue(Promise.reject('err'))
    
    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue('')
    
    api.pure.getCotacao({ getDate, getUrl, getCotacaoAPI, extractCotacao })().then( res => {
        console.log('res', res)
    })

})

test('getCotacao', () => {

    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    }

    const getDate = jest.fn()
    getDate.mockReturnValue('01-01-2019')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockResolvedValue(res)
    
    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.90)
    
    api.pure.getCotacao({ getDate, getUrl, getCotacaoAPI, extractCotacao })().then( res => {
        console.log('res', res)
    })

})