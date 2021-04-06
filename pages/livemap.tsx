import GoogleMapReact from 'google-map-react';
import mapStyle from '../_private/_mapStyle.json';
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import getStarlinks from './api/starlinks';
import { Backdrop, Button, Card, CardActions, CardContent, CircularProgress, IconButton, Snackbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Livemap() {

    //interface GeoJSON {
    //    type: string,
    //    features: []
    //}

    interface Starlink {
        type: string,
        geometry: {
            type: string,
            coordinates: [number, number]
        },
        properties: {
            name:string,
            number:number,
            class:string,
            id:string,
            info:{
               lng:number,
               lat:number,
               elevation:number,
               azimuth:number,
               range:number,
               height:number,
               velocity:number
            },
            perigee:number,
            inclination:number,
            revolution:number
         }
    }

    interface StarlinkMarker {
        marker: any
        starlink: Starlink
    }

    const [loading, setLoading] = React.useState(true);
    const [selectedStarlink, setSelectedStarlink] = React.useState({} as StarlinkMarker);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    //const [starlinks, setStarlinks] = React.useState({});

    interface position {
        lat: number,
        lng: number
    }
    const center:position = {
        lat: 59.95,
        lng: 30.33
    };
    const zoom:number = 2

    let markers = [];
    let firstLoad:boolean = true;

    const handleSnackbarClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') return;

        setSnackbarOpen(false);
    }

    const renderMarkers = (map:any, maps:any) => {
        const markerIcon = {
            url: "https://i.imgur.com/uZvs0KZ.png", // url
            scaledSize: new maps.Size(25, 25), // scaled size
            origin: new maps.Point(0,0), // origin
            anchor: new maps.Point(0, 0) // anchor
        };

        const getStarlinkMarkers = async () => {
            const res = await axios.get('/api/starlinks');
            setLoading(false);
            if (firstLoad) {
                firstLoad = false
                for (let i = 0; i < res.data['features'].length; i++) {
                    const starlink:Starlink = res.data['features'][i];
                    if (!starlink.geometry) return;
                    const marker = new maps.Marker({
                        position: {
                            lat: starlink.geometry.coordinates[1],
                            lng: starlink.geometry.coordinates[0]
                        },
                        map,
                        title: starlink.properties.name,
                        icon: markerIcon
                    });
                    markers.push(marker); 
                    marker.addListener("click", () => {
                        setSelectedStarlink({marker: markers[i], starlink: starlink});
                        setSnackbarOpen(true)
                    });
                }
            } else {
                for (let i = 0; i < res.data['features'].length; i++) {
                    const starlink:Starlink = res.data['features'][i];
                    if (!starlink.geometry) return;
                    markers[i].setPosition({lat: starlink.geometry.coordinates[1], lng: starlink.geometry.coordinates[0]})
                    markers[i].addListener("click", () => {
                        setSelectedStarlink({marker: markers[i], starlink: starlink});
                        setSnackbarOpen(true)
                    });
                }
            }  
        }

        getStarlinkMarkers();

        setInterval(async () => await getStarlinkMarkers()
        , 30000); 
        return;
    }

    return (
        <div>
        <Backdrop className="loading" open={loading} style={{zIndex: 1}}>
            <CircularProgress color="secondary" />
            &nbsp;
            &nbsp;
            <Typography variant="h6" color="secondary">Fetching Starlinks</Typography>
        </Backdrop>
        <GoogleMapReact
          //@ts-ignore
          style={{zIndex: -1}}
          bootstrapURLKeys={{ key: "AIzaSyCFl-il9k-4dUU20uFrJ6MSpYmN3jGdcvA" }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={{styles: mapStyle, minZoom: 3}}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        >
        </GoogleMapReact>
        
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={`Selected ${selectedStarlink.starlink != undefined ? selectedStarlink.starlink.properties.name : null}`}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
        {/*<Card style={{position: "absolute"}}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            meow
          </Typography>
          <Typography color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
    </Card>*/}
    </div>
    )
}

const Marker = props => {
    return <img src="https://i.imgur.com/uZvs0KZ.png" height="20vh" width="20vh" />
  }
  