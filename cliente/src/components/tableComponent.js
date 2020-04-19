import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  caption: {
    color: "green",
    padding: 8,
    border: "1px dashed grey",
    fontSize: "0.6rem"
  },
  root: {
    "& > p:nth-of-type(2)": {
      fontSize: "1.25rem",
      color: "red",
      fontWeight: 300
    }
  }
  
});

function createData(id, dst, cid, inicio, fin, answer, dura, bill, disp, audio) {
    return {id, dst, cid, inicio, fin, answer, dura, bill, disp, audio };
  }
const rows = [];

export default function Llamadas(props) {
  const {data} = props;
  const classes = useStyles();
  data.map((item) => { 
      rows.push(createData(item.id, item.dst,item.cid,item.inicio,item.fin,item.answer,item.dura,item.bill,item.disp,item.audio));
    });
  
  return (

     <TableContainer component={Paper}>
      <Table className={classes.table}  width="auto" id="datos">
        <TableHead>
          <TableRow >
            <TableCell align="right">Id</TableCell>
            <TableCell align="right" >Destination</TableCell>
            <TableCell align="right" >CallerId</TableCell>
            <TableCell align="right" >Inicio</TableCell>
            <TableCell align="right" >Fin</TableCell>
            <TableCell align="right" >Answer</TableCell>
            <TableCell align="right" >Duración</TableCell>
            <TableCell align="right" >Billing</TableCell>
            <TableCell align="right" >Disposición</TableCell>
            <TableCell align="right" >Audio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Typography> {row.id} </Typography>
              </TableCell>
              <TableCell align="right">{row.dst}</TableCell>
              <TableCell align="right">{row.cid}</TableCell>
              <TableCell align="right">{row.inicio}</TableCell>
              <TableCell align="right">{row.fin}</TableCell>
              <TableCell align="right">{row.answer}</TableCell>
              <TableCell align="right">{row.dura}</TableCell>
              <TableCell align="right">{row.bill}</TableCell>
              <TableCell align="right">{row.disp}</TableCell>
              <TableCell align="right">{row.audio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
};