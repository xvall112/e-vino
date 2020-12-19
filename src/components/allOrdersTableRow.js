import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Card from "@material-ui/core/Card";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

const AllOrdersTableRow = ({ order }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  console.log(order);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
        {order.user.displayName}
        </TableCell>
        <TableCell component="th" scope="row">
          {order.date.toDate().toDateString()}
        </TableCell>
        <TableCell>{order.celkem}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Položky objednávky
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Produkt Id</TableCell>
                    <TableCell>Produkt</TableCell>
                    <TableCell>ks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map(item => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Adresa
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Jméno</TableCell>
                    <TableCell>Příjmení</TableCell>
                    <TableCell>Ulice</TableCell>
                    <TableCell>Město</TableCell>
                    <TableCell>PSČ</TableCell>
                    <TableCell>Stát</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Jméno</TableCell>
                    <TableCell>Příjmení</TableCell>
                    <TableCell>Ulice</TableCell>
                    <TableCell>Město</TableCell>
                    <TableCell>PSČ</TableCell>
                    <TableCell>Stát</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Uživatel
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Jmeno</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>tel.</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{order.user.id}</TableCell>
                    <TableCell>{order.user.displayName}</TableCell>
                    <TableCell>{order.user.email}</TableCell>
                    <TableCell>tel.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
export default AllOrdersTableRow;
