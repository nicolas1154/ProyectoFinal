import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompts from "../../prompts/message";
import ConfirmationPrompts from "../../prompts/confirmation";

export default class TrabajadoresEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idTrabajador: this.props.getIdTrabajador(),
      rediret: false,
      message: {
        text: "",
        show: false,
      },
      confirmation:{
        title:'Modificar trabajador',
        text:'¿Desea modificar el trabajador?',
        show:'false',
      },
      loading: false,
      trabajador: {
        nombre: "",
        apellido_p: "",
        apellido_m: "",
        telefono: "",
        mail: "",
        direccion: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getTrabajador();
  }

  getTrabajador() {
    this.setState({ loading: true });
    request
      .get(`/trabajadores/${this.state.idTrabajador}`)
      .then((response) => {
        this.setState({
          trabajador: response.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  setValue(iniciot, value) {
    this.setState({
      trabajador: {
        ...this.state.trabajador,
        [iniciot]: value,
      },
    });
  }
  guardarTrabajadores() {
    this.setState({ loading: true });
    request
      .put(`/trabajadores/${this.state.idTrabajador}`, this.state.trabajador)
      .then((response) => {
        if (response.data.exito) {
          this.props.changeTab('buscar');
          this.setState({
            rediret: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: true });
      });
  }
  onExitedMessage() {
    if (this.state.rediret) this.props.changeTab("buscar");
  }

  onCancel(){
    this.setState({
      confirmation: { ...this.state.confirmation, show: false, },
    })
  }

  onConfirm(){
    this.setState({
      confirmation: { ...this.state.confirmation, show: false, },},
      this.guardarTrabajadores())
  }

  render() {
    return (
      <Container id="trabajadores-crear-container">
        <MessagePrompts
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />
        <ConfirmationPrompts
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
        <Loading show={this.state.loading} />
        <Row>
          <h1>Editar trabajadores</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={this.state.trabajador.nombre}
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Apellido Paterno</Form.Label>
              <Form.Control
                value={this.state.trabajador.apellido_p}
                onChange={(e) => this.setValue("apellido_p", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Apellido Materno</Form.Label>
              <Form.Control
                value={this.state.trabajador.apellido_m}
                onChange={(e) => this.setValue("apellido_m", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                value={this.state.trabajador.telefono}
                onChange={(e) => this.setValue("telefono", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                value={this.state.trabajador.mail}
                onChange={(e) => this.setValue("mail", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                value={this.state.trabajador.direccion}
                type="email"
                onChange={(e) => this.setValue("direccion", e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => 
                this.setState({
                  confirmation: { ...this.state.confirmation, show: true },
                })
              }
            >
              Guardar Editar Trabajador
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
