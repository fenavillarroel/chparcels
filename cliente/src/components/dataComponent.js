import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Llamadas from './tableComponent';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      fontSize:8
    },
    table: {
      fontSize: 80,
      minWidth: 100,
    },
  }));

export default function DataComponent() {

    const classes = useStyles();
    const now = new Date();
    const inicio = moment(now).format('YYYY-MM-DD 00:00:00');
    const fin = moment(now).format('YYYY-MM-DD 23:59:59');
    const [fechaStart,setfechaStart] = useState(inicio);
    const [fechaEnd,setfechaEnd] = useState(fin);
    const [data, Setdatos] = useState([]);
   
    const url = '/api/v1/allcalls';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        inicio: fechaStart,
        fin: fechaEnd
      })
    };
    async function getData() {
      let response = await fetch(url,options);
      let data = await response.json();
      return data;
    };
    useEffect(() => {
        getData().then(data => Setdatos(data.data));
      }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        let data = await getData();
        Setdatos(data.data);
    };

    return (
        <Container>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <NavBar />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper}>
                          <Card className={classes.root} variant="outlined">
                            <CardContent>
                              <form className={classes.container} onSubmit={handleSubmit} >                                
                                  <Typography className={classes.title} gutterBottom>
                                    Rango Fecha Llamadas
                                  </Typography>
                                  <Typography variant="body2" component="h2">
                                    <TextField
                                      id="desde"
                                      label="Fecha Desde"
                                      type="date"
                                      defaultValue={now}
                                      onInput= {(e) => setfechaStart(moment(e.target.value).format('YYYY-MM-DD 00:00:00'))}
                                      className={classes.textField}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />
                                  </Typography>
                                  <Typography component={'div'}>
                                    <TextField
                                      id="hasta"
                                      label="Fecha Hasta"
                                      type="date"
                                      defaultValue={now}
                                      onInput= {(e) => setfechaEnd(moment(e.target.value).format('YYYY-MM-DD 23:59:59'))}
                                      className={classes.textField}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />
                                  </Typography>
                                  <Typography component={'div'}>
                                    <CardActions>
                                      <Button variant="contained" color="primary" type="submit" fullWidth>
                                        Enviar
                                      </Button>
                                    </CardActions>
                                  </Typography>
                              </form>
                            </CardContent>
                          </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Paper className={classes.paper}>
                          <Llamadas data={data} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
};