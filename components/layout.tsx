import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { AppBar, fade, Tab, Tabs } from '@material-ui/core'
import React from 'react'
import Home from '../pages'
import Livemap from '../pages/livemap'
//import { TabContext, TabList, TabPanel } from '@material-ui/lab'

export const siteTitle = 'Starlinkradar'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {

  function a11yProps(index: any) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const pages = {
    0: children,
    1: <Livemap/>
  }

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:site_name" content="Starlinkradar"/>
        <title>Starlinkradar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Track every Starlink satellites in realtime."
        />
        <meta
          name="keywords"
          content="space, satellites, starlink, starlinkradar, starlinktracker, spacex, findstarlink, satellitetracker, starlinkfinder, starlinksatellites, trackstarlink"
        />
        <meta name="author" content="Larko" />
        <meta name="theme-color" content="#000000" />
        <meta content="https://i.imgur.com/siKmS8a.png" property="og:image" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Starlinkradar" />
        <meta
          name="twitter:description"
          content="Track every Starlink satellites in realtime."
        />
        <meta name="twitter:image" content="https://i.imgur.com/siKmS8a.png" />
        <meta content="https://i.imgur.com/siKmS8a.png" property="og:image" />
      </Head>
      <header className={styles.header}>
      <AppBar position="static" style={{backgroundColor: fade('#363636', 0.1), borderRadius: 20, width:"auto", maxWidth: 800}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{borderRadius: 20}}
        >
          <Tab label="Home" {...a11yProps(0)} value={0}/>
          <Tab label="Livemap"  {...a11yProps(1)} value={1}/>
          <Tab label="Starlinks" {...a11yProps(2)} value={2}/>
          <Tab label="Contact"  {...a11yProps(3)} value={3}/>
        </Tabs>
      </AppBar>
      </header>
      <br/>
      <main>{pages[value]}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
