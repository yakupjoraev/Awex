import Api from './Api'

const signIn = data => Api().post('/account/auth/sign-in', data)
const signUp = data => Api().post('/account/auth/register', data)
const getProfile = () => Api().get('/account/profile')
const getStatistics = () => Api().get('/statistics')

export {
    signIn,
    signUp,
    getProfile,
    getStatistics,
}
