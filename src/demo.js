import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Done from "@material-ui/icons/Done";
import Cancel from "@material-ui/icons/Cancel";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  iconCell: {
    width: "7.4em"
  },
  textField: {
    width: "8em"
  }
});

class ServiceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceData: [
        {
          domain: "Domain 1",
          name: "Get Users"
        },
        {
          domain: "Domain 2",
          name: "Get Location"
        },
        {
          domain: "Domain 3",
          name: "Get Name"
        },
        {
          domain: "Domain 4",
          name: "Get Age"
        }
      ],
      editedIndex: -1,
      editedDomain: "",
      editedName: ""
    };

    this.addRow = this.addRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateComponent = this.updateComponent.bind(this);

  }
  deleteComponent(index) {
    const serviceData = this.state.serviceData.slice();
    serviceData.splice(index, 1);
    this.setState({ serviceData });
  }

  addRow(){
    let newArray = this.state.serviceData;
    newArray.push(
      {
        domain: " ",
        name: " "
      }
    );
    this.setState({serviceData : newArray});
  }

  editComponent(index) {
    this.setState({ editedIndex: index });
  }

  cancelEdit = () => {
    this.setState({ editedIndex: -1 });
  };

  updateComponent(index){
    if(this.state.editedDomain !== "" && this.state.editedName !== ""){
      let newArray = this.state.serviceData;
      console.log('1'+this.state.editedDomain, this.state.editedName)
      newArray[index].domain = this.state.editedDomain;
      newArray[index].name = this.state.editedName;
      this.setState({
        serviceData : newArray,
        editedDomain: "",
        editedName: "",
        editedIndex: -1
      });
    }
    else{
      this.setState({
        editedIndex: -1
      })
    } 
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { editedIndex, serviceData } = this.state;
    const { classes } = this.props;
    const deleteIcon = index => (
      <IconButton onClick={() => this.deleteComponent(index)}>
        <DeleteIcon color="secondary" />
      </IconButton>
    );

    const editIcon = index => (
      <IconButton onClick={() => this.editComponent(index)}>
        <EditIcon color="primary" />
      </IconButton>
    );
    const okBtn = index => (
      <IconButton onClick={() => this.updateComponent(index)}>
        <Done color="secondary" />
      </IconButton>
    );

    const addBtn = () =>(
      <IconButton onClick={this.addRow}>
        <Add color="secondary" />
      </IconButton>
    )
    const cancelBtn = (
      <IconButton onClick={this.cancelEdit}>
        <Cancel color="primary" />
      </IconButton>
    );
    const editDomain =(n) => (
      <TextField
        id="domain"
        label="Domain"
        className={classes.textField}
        defaultValue = {
          this.state.serviceData[n].domain
        }
        margin="normal"
        onChange = {
          this.handleChange('editedDomain')
        }
      />
    );
    const editName =(n)=> (
      <TextField
        id="name"
        label="Name"
        className={classes.textField}
        defaultValue = {
          this.state.serviceData[n].name
        }
        onChange = {
          this.handleChange('editedName')
        }
        margin="normal"

      />
    );
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableBody>
            {serviceData.map(n => {
              return (
                <TableRow key={n.domain}>
                  <TableCell
                    className={classes.iconCell}
                    component="th"
                    scope="row"
                  >
                    {
                      serviceData.indexOf(n) === editedIndex || n.name === ' ' || n.domain === ' '
                      ? okBtn(serviceData.indexOf(n))
                      : deleteIcon(serviceData.indexOf(n))}
                    {serviceData.indexOf(n) === editedIndex || n.name ===' ' || n.domain ===' ' 
                      ? cancelBtn
                      : editIcon(serviceData.indexOf(n))}
                  </TableCell>
                  <TableCell>
                    {
                      serviceData.indexOf(n) === editedIndex || n.domain === ' '
                      ? editDomain(serviceData.indexOf(n))
                      : n.domain}
                  </TableCell>
                  <TableCell>
                    {
                      serviceData.indexOf(n) === editedIndex || n.name === ' ' ? editName(serviceData.indexOf(n)) : n.name
                    }
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              {
                addBtn()
              }
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default withStyles(styles)(ServiceTable);
