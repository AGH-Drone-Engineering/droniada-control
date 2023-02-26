import React from 'react'

export default function Header() {
  return (
    <header>
    <h1>
      Droniada 2023 
    </h1>
    <img src={process.env.PUBLIC_URL + '/agh-de-logo.png'} />
  </header>
  )
}
