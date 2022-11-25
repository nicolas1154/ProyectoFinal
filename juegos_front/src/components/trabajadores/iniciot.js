import React from "react";
import { Container, Row, Nav } from "react-bootstrap";
import "./trabajadores.css";
import TrabajadoresBuscar from "./crud/buscar";
import TrabajadoresCrear from "./crud/crear";
import TrabajadoresEditar from "./crud/editar";

export default class Trabajadores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentTab: 'buscar',
        _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdTrabajador = this.setIdTrabajador.bind(this);
    this.getIdTrabajador = this.getIdTrabajador.bind(this);
  }

  setIdTrabajador(id){
    this.setState({ _id:id});
  }

  getIdTrabajador(){
    return this.state._id;
  }

  changeTab(tab){
    this.setState({ currentTab: tab });
  }

  render() {
    return (
      <Container id="trabajadores-container">
        <Row>
          <Nav fill variant="tabs"
          defaultActiveKey="/buscar"
          onSelect={(eventKey => this.setState({ currentTab: eventKey }))}
          >
            <Nav.Item>
              <Nav.Link eventKey="buscar">Buscar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="crear">Crear</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
            {this.state.currentTab === 'buscar' ?(
            <TrabajadoresBuscar 
              changeTab={this.changeTab}
              setIdTrabajador={this.setIdTrabajador}
            />
            ): this.state.currentTab === 'crear' ?(
            <TrabajadoresCrear changeTab={this.changeTab} />
            ): (
            <TrabajadoresEditar
            changeTab={this.changeTab}
            getIdTrabajador={this.getIdTrabajador} 
            />
          )}
        </Row>
      </Container>
    );
  }
}
