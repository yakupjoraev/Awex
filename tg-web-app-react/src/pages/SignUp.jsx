import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <main>
        <div className="wrapper">
            <Link to="/">{`<< back`}</Link>
            <br />
            <br />
            <h1 className="title">Sign up to AWEX</h1>
        </div>
    </main>
  )
}
