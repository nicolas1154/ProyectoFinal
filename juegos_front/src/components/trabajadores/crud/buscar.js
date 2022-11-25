import React from "react";
import { Container, Row } from "react-bootstrap";
import "../trabajadores.css";
import { request } from "../../helper/helper";
import DataGrid from "../../grid/grid";
import Loading from "../../loading/loading";

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
        dataField: "mail",
        text: "Email",
    },
    {
        dataField: "direccion",
        text: "Direccion",
    },

    
]
export default class TrabajadoresBuscar extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        loading: false,
        idTrabajador: null,
    };
    this.onClickEditButton = this.onClickEditButton.bind(this);
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
onClickEditButton(row){
    this.props.setIdTrabajador(row._id);
    this.props.changeTab('editar');

}
render() {
    
    return (
    <Container id="trabajadores-buscar-container">
        <Loading show={this.state.Loading}/>
        <Row>
        <h1>Buscar Trabajadores</h1>
        </Row>
        <Row>
            <DataGrid url="/trabajadores" columns={ columns } 
            showEditButton={true}
            onClickEditButton={this.onClickEditButton}
            />
        </Row>
    </Container>
    );
}
}