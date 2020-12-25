import React, { Fragment } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) =>
	createStyles({
		modal: {
			display: 'flex',
			flexDirection: 'column',
			'& > *': {
				margin: theme.spacing(1)
			}
		},
		recipeImage: {
			margin: '0px auto',
			maxWidth: 210,
			borderRadius: 5
		},
		dialogTitle: {
			textAlign: 'center'
		}
	})
);

const EmployeeForm = (props) => {
	const {
		onCreateNewEmployee,
		isFormOpen,
		onFormClose,
		onChangeName,
		onChangeDepartment,
		onChangeActive,
		name,
		department,
		checked
	} = props;

	const classes = useStyles();
	
	return (
		<Fragment>
			<Dialog
				open={isFormOpen}
				onClose={onFormClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
					{'Employee'}
				</DialogTitle>
				<DialogContent>
					<form className={classes.modal} noValidate autoComplete="off">
						<Input
							value={name}
							onChange={(e) => onChangeName(e)}
							placeholder="Name"
							inputProps={{ 'aria-label': 'name' }}
						/>
						<Select onChange={(e) => onChangeDepartment(e)}
							native
							value={department}
							label="status"
							inputProps={{
								name: 'department',
								id: 'department',
							}}
							>
							<option value={''}></option>
							<option value={'HR'}>HR</option>
							<option value={'Tech'}>Tech</option>
							<option value={'Finance'}>Finance</option>
                    	</Select>
						<FormControlLabel
							checked={checked}
							control={<Checkbox color="primary" />}
							label="active"
							onChange={onChangeActive}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={onFormClose} color="primary">
						Cancel
					</Button>
					<Button onClick={() => onCreateNewEmployee(name, department, checked)} color="primary" autoFocus>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

export default EmployeeForm;
