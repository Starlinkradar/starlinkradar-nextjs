import { Accordion, AccordionDetails, AccordionSummary, fade, Paper, Typography } from "@material-ui/core";
import React from "react";
import SimpleBar from "simplebar-react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

export default function LatestUpdates(props) {
    return (
        <Paper elevation={24} style={{backgroundColor: fade('#363636', 0.1)}}> 
        <Typography variant="h4" align="center" >Latest updates</Typography>
        <SimpleBar style={{maxHeight: 365, marginBottom: 10, marginTop: 10}}>
          {
            props.allPosts.map(prop => 
              // first accordion is expanded
            props.allPosts.indexOf(prop) == 0 ? 
            <Accordion key={prop.slug} expanded={true}>
              <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
            <Typography>{prop.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
              {prop.excerpt}
            </Typography>
          </AccordionDetails>
          </Accordion> 
          : 
            <Accordion key={prop.slug}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>{prop.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {prop.excerpt}
                </Typography>
              </AccordionDetails>
            </Accordion>)
          }
          </SimpleBar>
        <Accordion disabled>
        <AccordionSummary
          //expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Starlinkradar V2 @aym_dm</Typography>
        </AccordionSummary>
      </Accordion>
      </Paper>
    )
}