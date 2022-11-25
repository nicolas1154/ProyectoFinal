import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompts from "../../prompts/message";

export default class TrabajadoresCrear extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        rediret: false,
        message:{
            text: '',
            show: false,
        },
        loading: false,
            trabajador: {
            nombre: '',
            apellido_p: '',
            apellido_m: '',
            telefono: '',
            mail: '',
            direccion: ''
        },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);

}

setValue(iniciot, value){
    this.setState({
        trabajador: {
            ...this.state.trabajador,
            [iniciot]: value,
        },
    });
}
guardarTrabajadores(){
    this.setState({ loading: true });
    request
    .post('/trabajadores', this.state.trabajador)
    .then((response) => {
        if (response.data.exito){
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
onExitedMessage (){
    if (this.state.rediret) this.props.changeTab( 'buscar' );
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
        <Loading show={this.state.loading} />
        <Row>
        <h1>Crear trabajadores</h1>
        </Row>
        <Row>
        <Form>
            <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
            onChange={(e) => this.setValue('nombre', e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Apellido Paterno</Form.Label>
            <Form.Control
            onChange={(e) => this.setValue('apellido_p', e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Apellido Materno</Form.Label>
            <Form.Control
            onChange={(e) => this.setValue('apellido_m', e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
            onChange={(e) => this.setValue('telefono', e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control
            onChange={(e) => this.setValue('mail', e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="email"
            onChange={(e) => this.setValue('direccion', e.target.value)}/>
            </Form.Group>

            <Button variant="primary" 
            onClick={() => console.log(this.guardarTrabajadores())}>
            Guardar Trabajador
            </Button>
        </Form>
        </Row>
    </Container>
    );
}
}
