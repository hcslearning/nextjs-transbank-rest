import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <h1>Ejemplos de Integración con Transbank</h1>
      <ul>
        <li>
          <a href="/api/tbk/redirect">Redirect</a>
        </li>
      </ul>
    </div>
  )
}
