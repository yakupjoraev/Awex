import Api from './Api'

const signIn = data => Api().post('/account/auth/sign-in', data)
const getBalance = () => Api().get('/account/balance')
const getStatistics = () => Api().get('/statistics')
const getProject = () => Api().get('/project')
const getCurrencies = () => Api().get('/project/currencies')
const orderInvoice = data => Api().post('/order/invoice', data)

export {
    signIn,
    getBalance,
    getStatistics,
    getProject,
    getCurrencies,
    orderInvoice,
}
