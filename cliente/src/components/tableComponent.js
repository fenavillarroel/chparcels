import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Typography from '@material-ui/core/Typography';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(id, dst, cid, inicio, fin, answer, dura, bill, disp, audio) {
  return {id, dst, cid, inicio, fin, answer, dura, bill, disp, audio };
}

const useStyles2 = makeStyles({
  table: {
      minWidth: 300,
    },
  });
  
  export default function Llamadas(props) {
    
    const {data} = props;
    const rows = [];
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
        
    data.map((item) => { 
      rows.push(createData(item.id, item.dst,item.cid,item.inicio,item.fin,item.answer,item.dura,item.bill,item.disp,item.audio));
    });

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const gunnarStyle = { height: "10px", padding: "0px"};

    return (

      <TableContainer component={Paper}>
        <Table className={classes.table}  width="auto" id="datos">
          <TableHead>
            <TableRow style={gunnarStyle}>
              <TableCell align="right" style={gunnarStyle}>Id</TableCell>
              <TableCell align="right" style={gunnarStyle}>Destination</TableCell>
              <TableCell align="right" style={gunnarStyle}>CallerId</TableCell>
              <TableCell align="right" style={gunnarStyle}>Inicio</TableCell>
              <TableCell align="right" style={gunnarStyle}>Fin</TableCell>
              <TableCell align="right" style={gunnarStyle}>Answer</TableCell>
              <TableCell align="right" style={gunnarStyle}>Duración</TableCell>
              <TableCell align="right" style={gunnarStyle}>Billing</TableCell>
              <TableCell align="right" style={gunnarStyle}>Disposición</TableCell>
              <TableCell align="right" style={gunnarStyle}>Audio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              
              <TableRow key={row.id} style={gunnarStyle}>
                <TableCell component="th" scope="row" align="right" style={gunnarStyle}>
                  <Typography> {row.id} </Typography>
                </TableCell>
                <TableCell align="right" style={gunnarStyle}>{row.dst}</TableCell>
                <TableCell align="right" style={gunnarStyle}>{row.cid}</TableCell>
                <TableCell align="right" style={gunnarStyle}>{row.inicio}</TableCell>
                <TableCell align="right" style={gunnarStyle}>{row.fin}</TableCell>
                <TableCell align="right" style={gunnarStyle}>{row.answer}</TableCell>
                <TableCell align="right" style={gunnarStyle}>{row.dura}</TableCell>
                <TableCell align="right" style={gunnarStyle}>{row.bill}</TableCell>
                <TableCell align="right" style={gunnarStyle}>{row.disp}</TableCell>
                <TableCell align="right" style={gunnarStyle}>{row.audio}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 23 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}          
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={12}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      );
  };