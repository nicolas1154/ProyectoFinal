import React from "react";
import { Container, Row } from "react-bootstrap";
import "./trabajadores.css";
import { request } from "../helper/helper";
import DataGrid from "../grid/grid";

const columns = [
    {
        dataField: "_id",
        text: "ID",
        hidden: true,
    },
    {
        dataField: "nombre",
        text: "Nombre",
    },
    {
        dataField: "apellido_p",
        text: "Primer Apellido",
    },
    {
        dataField: "apellido_m",
        text: "Segundo Apellido",
    },
    {
        dataField: "telefono",
        text: "Telefono",
    },
    {
        dataField: "direccion",
        text: "Direccion",
    },

    
]
export default class TrabajadoresBuscar extends React.Component {
constructor(props) {
    super(props);
    this.state = {};
}

componentDidMount(){
    request
    .get(this.props.url)
    .then((response) => {
        this.setState({ rows: response.data });
    })
    .catch((error) => {
        console.log(error);
    });
}
render() {
    
    return (
    <Container id="trabajadores-buscar-container">
        <Row>
        <h1>Buscar Juegos</h1>
        </Row>
        <Row>
            <DataGrid url="/trabajadores" columns={ columns}/> 
        
        </Row>
    </Container>
    );
}
}