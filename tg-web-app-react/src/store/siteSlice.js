import { useState } from 'react'

export const siteContext = {
    token: '',
    setToken: () => {},
    settings: {},
    setSettings: () => {},
}

export const siteContextValue = () => {
    const [token, setToken] = useState()
    const [settings, setSettings] = useState()

    return {
        token,
        setToken,
        settings,
        setSettings,
    }
}
