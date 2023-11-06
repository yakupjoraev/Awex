import React from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

export default function Loading() {
  return (
    <div>
        <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
    </div>
  )
}
