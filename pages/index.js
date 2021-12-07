import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from 'react';
import { useAppContext } from '../context/app.context';


export default function Home() {

  const { login, isAuth, logout, account } = useAppContext()


  return (
    <div className={styles.container}>
      {
        !isAuth ?
          <button onClick={login}>LOGIN</button> : <button onClick={logout}>LOGOUT </button>}
    </div>
  )
}
