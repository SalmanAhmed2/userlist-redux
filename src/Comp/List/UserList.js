import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import DataTable from "react-data-table-component";
import TextField from "@material-ui/core/TextField";
import SortIcon from "@material-ui/icons/ArrowDownward";
import { connect } from "react-redux";
import { fetchUsers } from "../actions/actions";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const columns = [
  {
    name: "First Name",
    selector: "first_name",
    sortable: true,
  },
  {
    name: "Last Name",
    selector: "last_name",
    sortable: true,
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
    right: true,
  },
];
const isIndeterminate = (indeterminate) => indeterminate;
const selectableRowsComponentProps = { indeterminate: isIndeterminate };
function UserList(props) {
  const classes = useStyles();
  let tableData = props.users;
  let [filtered, setFiltered] = useState([]);
  const [inputval, setInputVal] = useState();
  const handleSearch = (e) => {
    const inputvals = e.target.value;
    setInputVal(e.target.value);
    const filterData = tableData.filter((data) => {
      if (inputvals === "") return data;
      else if (
        data.first_name.toLowerCase().includes(inputvals.toLowerCase()) ||
        data.last_name.toLowerCase().includes(inputvals.toLowerCase()) ||
        data.email.toLowerCase().includes(inputvals.toLowerCase())
      )
        return data;
    });
    setFiltered(filterData);
  };
  const handlePagination = (event, value) => {
    props.dispatch(fetchUsers(value))
  }

  return (
    <div>
      <h1>Users List</h1>
      {props.loading ? (
        <ReactBootStrap.Spinner animation="border" />
      ) : (
        <>
          <TextField
            label="Search"
            variant="outlined"
            onChange={handleSearch}
          />
          <DataTable
            columns={columns}
            data={inputval === undefined ? tableData : filtered}
            defaultSortField="first_name"
            sortIcon={<SortIcon />}
            selectableRowsComponentProps={selectableRowsComponentProps}
          />
        </>
      )}
      <div className={classes.root}>
        <Pagination
          count={2}
          size="large"
          onChange={handlePagination}
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  users: state.userReducer.users,
  loading: state.userReducer.loading,
  error: state.userReducer.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);