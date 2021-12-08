import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import AddCar from "./AddCar";
import EditCar from "./Editcar";
import Snackbar from "@mui/material/Snackbar";

function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    fetch("https://carrestapi.herokuapp.com/cars")
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

  const deleteCar = (url) => {
    if (window.confirm("are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchCars();
            setOpen(true);
          } else alert("poisto ei onnistunut");
        })
        .catch((err) => console.error(err));
    }
  };

  const addCar = (car) => {
    fetch("https://carrestapi.herokuapp.com/cars", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(car),
    })
      .then((_) => fetchCars())
      .catch((err) => console.error(err));
  };

  const editCar = (url, updatedCar) => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(updatedCar),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) fetchCars();
        else alert("Something is wrong");
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    { field: "brand", sortable: true, filter: true },
    { field: "model", sortable: true, filter: true },
    { field: "color", sortable: true, filter: true },
    { field: "fuel", sortable: true, filter: true, width: 120 },
    { field: "year", sortable: true, filter: true, width: 120 },
    { field: "price", sortable: true, filter: true, width: 120 },
    {
      headerName: "",
      width: 120,
      field: "_links.self.href",
      cellRendererFramework: (params) => (
        <EditCar editCar={editCar} link={params.value} car={params.data} />
      ),
    },
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 120,
      field: "_links.self.href",
      cellRendererFramework: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteCar(params.value)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <AddCar addCar={addCar} />
      <div
        className="ag-theme-material"
        style={{ marginTop: 20, height: 600, width: "80%", margin: "auto" }}
      >
        <AgGridReact
          rowData={cars}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={9}
          suppressCellSelection={true}
        />
      </div>
      <Snackbar
        open={open}
        message="Car deleted"
        autoHideDuration={3000}
        onClose={handleClose}
      />
    </div>
  );
}

export default Carlist;
