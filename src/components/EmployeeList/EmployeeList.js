import React from 'react';
import { 
    makeStyles,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Button,
    TableFooter,
    TablePagination
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from './Pagination';
import EmployeeForm from './EmployeeForm';

const useStyles = makeStyles({
    searchField: {
        margin: "10px 0 20px",
    },
    btn: {
        margin: "15px 0",
    }
});

const EmployeeList = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [isFormEdit, setIsFormEdit] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [id, setId] = React.useState('');
    const [name, setName] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [employees, setEmployees] = React.useState([
        {
            id:1608897933142,
            name:'Taras',
            department: 'Finance',
            active: true
        }
    ]);
    const [filteredEmoloyees, setFilteredEmoloyees] = React.useState([
        {
            id:1608897933142,
            name:'Taras',
            department: 'Finance',
            active: true
        }
    ]);

    const handleChangeName = (e) =>{
		setName(e.target.value)
    }
    const handleChangeDepartment = (e) =>{
		setDepartment(e.target.value)
    }

    const handleChangeActive = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
	const handleResetFields = () => {
        setId('')
        setName('')
        setDepartment('')
        setChecked(false)
    };
    
    const deleteEmployee = (id) =>{
        const newListEmployees = employees.filter((el) => el.id !== id);
        setEmployees(newListEmployees)
        setFilteredEmoloyees(newListEmployees)
    }

    const handleFormEdit = (id) => {
        const editEmployee = employees.filter((el) => el.id === id);
        setId(editEmployee[0].id)
        setName(editEmployee[0].name)
        setDepartment(editEmployee[0].department)
        setChecked(editEmployee[0].active)
        setIsFormOpen(true)
        setIsFormEdit(true)
    }

    const searchEmployees = (e) => {
        let searchEmployees;
        searchEmployees = filteredEmoloyees.filter(
            (el) => el.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        );
        setEmployees([...searchEmployees]);
    };

    const handleFormOpen = () => {
        setIsFormOpen(true)
    }

    const handleFormClose = () => {
        setIsFormOpen(false)
        setIsFormEdit(false)
        handleResetFields()
    }
    
	const handleCreateNewEmployee = (name, department, checked) => {
        if(isFormEdit === false){
            const newEmoloyees = {
                id: Date.now(),
                name: name,
                department: department,
                active: checked
            };
            const newList = [newEmoloyees,...filteredEmoloyees];
            setEmployees(newList)
            setFilteredEmoloyees(newList)
        }else{
            const newListEmployees = employees.filter((el) => el.id !== id);
            const newEmoloyees = {
                id: id,
                name: name,
                department: department,
                active: checked
            };
            const newList = [newEmoloyees,...newListEmployees];
            setEmployees(newList)
            setFilteredEmoloyees(newList)
        }
        handleResetFields()
        setIsFormOpen(false)
        setIsFormEdit(false)
	};
  
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, employees.length - page * rowsPerPage);

    const handleDeleteEmployee = employeeId => deleteEmployee(employeeId);

    return (
        <Container fixed>
            <EmployeeForm 
                isFormOpen = {isFormOpen}
                onCreateNewEmployee = {handleCreateNewEmployee}
                onFormClose = {handleFormClose}
                onChangeName = {handleChangeName}
                onChangeDepartment = {handleChangeDepartment}
                onChangeActive = {handleChangeActive}
                name = {name}
                department = {department}
                checked = {checked}
            />
            <div style={{ display: "flex", justifyContent: "space-between"}}>
                <TextField onChange={e => searchEmployees(e)} className={classes.searchField} id="outlined-basic" label="Search" variant="outlined" />
                <Button className={classes.btn} onClick={() => handleFormOpen()}>Create employee</Button>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="employee table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Department</TableCell>
                            <TableCell align="center">Active</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : employees
                        ).map(employee => (
                            <TableRow key={`${employee.id}.${employee.name}`}>
                                <TableCell component="th" scope="row" align="center">{employee.id}</TableCell>
                                <TableCell align="center">{employee.name}</TableCell>
                                <TableCell align="center">{employee.department}</TableCell>
                                <TableCell align="center">{`${employee.active}`}</TableCell>
                                <TableCell align="center">
                                    <>
                                        <IconButton aria-label="edit" onClick={() => handleFormEdit(employee.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => handleDeleteEmployee(employee.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={employees.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={Pagination}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default EmployeeList;