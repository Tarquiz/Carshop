import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { PropertyKeys } from "ag-grid-community";

function AddCar(props){
    const [open, setOpen] = React.useState(false);
    const  [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    })

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }

    const inputChanged = e => {
        setCar({...car, [e.target.name]: e.target.value})
    }
  
    return(
        <div>
    <Button variant="outlined" onClick={handleClickOpen}>
        Add new car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Lisää auto</DialogTitle>
        <DialogContent>
        
            <TextField
            margin="dense"
            name="brand"
            value={car.brand}
            onChange={inputChanged}
            label="brand"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="model"
            value={car.model}
            onChange={inputChanged}
            label="model"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="color"
            value={car.color}
            onChange={inputChanged}
            label="color"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="fuel"
            value={car.fuel}
            onChange={inputChanged}
            label="fuel"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="year"
            value={car.year}
            onChange={inputChanged}
            label="year"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="price"
            value={car.price}
            onChange={inputChanged}
            label="price"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

        </div>
    );
}
export default AddCar;