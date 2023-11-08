import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <main>
            <div className="wrapper">
                <ul>
                    <li>
                        <Link to="/sign-in">Sign in</Link>
                    </li>
                    <li>
                        <Link to="/sign-up">Sign up</Link>
                    </li>
                </ul>
            </div>
        </main>
    )
}
