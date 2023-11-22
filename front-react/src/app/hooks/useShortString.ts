import { useEffect, useState } from "react"

const useShortString = (initialValue: string, maxLength = 10) => {
    const [string, setString] = useState(initialValue)
    const [shortingString, setShortingString] = useState(shortString(initialValue))

    useEffect(() => {
        setShortingString(shortString(string))
    },[string])

    function shortString(newString: any) {
        if(!newString) return ''
        if(newString.length <= maxLength) return newString
        return newString.slice(0, maxLength).trim() + '...'
    }

    return [shortingString, setString]
}

export { useShortString }