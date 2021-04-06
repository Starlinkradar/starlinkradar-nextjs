import * as TLE from 'tle-modified';
import axios, { AxiosResponse } from 'axios';
import * as GeoJSON from 'geojson';
import * as http from 'http';

export default function getStarlinks(req, res) {
    const CELESTRAK:string = "http://celestrak.com/NORAD/elements/starlink.txt";
    let data;

    http.get(CELESTRAK, (response) => {
        const start = Date.now();
        let count = 0;
    
        let tles = [];
    
        response
          .pipe(new TLE.Parser())
          .on("data", (tle) => {
            count++;
            tles.push(tle);
          })
          .once("finish", () => {
            data = GeoJSON.parse(tles, {Point: ['info.lat', 'info.lng'], include: ['name', 'number', 'class', 'id', 'info', 'perigee', 'inclination', 'revolution']});
            return res.send(data);
          });
        }
    );
};
