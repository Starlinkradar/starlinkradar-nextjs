import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, fade, Grid, List, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import {getAllUpdates} from './api/updates';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import LatestUpdates from '../components/latestupdates'

export default function Home(props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <img src="images/logo.png" className="logoMain" draggable={false} />
      <br/>
      <LatestUpdates allPosts={props.allPosts}/>
      <video autoPlay muted loop id="backgroundVideo">
      <source src="starlink.mp4" type="video/mp4" />
    </video>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPosts = getAllUpdates([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}