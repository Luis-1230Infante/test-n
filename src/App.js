import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'


const data = [
  {id:1, nombre:"plato llano", color:"azul", precio: "10",  fecha:"03-06-2020", oferta:"si"},
  {id:2, nombre:"plato ondo", color:"rojo", precio: "12", fecha:"16-02-2021", oferta:"si"},
  {id:3, nombre:"plato ondulado", color:"verde", precio: "15",  fecha:"03-06-2022", oferta:"no"},
  {id:4, nombre:"plato te", color:"blanco", precio: "9",  fecha:"03-11-2022", oferta:"si"},

];

class App extends React.Component {

  state={
    data: data,
    form:{
      id:'',
      nombre:'',
      color:'',
      precio:'',
      fecha:'',
      oferta:'',
    },

    modalInsertar: false,
    modalEditar: false,
  };

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }

  cerrarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }






  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }

  cerrarModalEditar=()=>{
    this.setState({modalEditar: false});
  }




  insertar=()=>{
    var platonuevo={...this.state.form};
    platonuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(platonuevo);
    this.setState({data: lista, modalInsertar: false});
  }




  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{

      if(dato.id==registro.id){
        lista[contador].nombre=dato.nombre;
        lista[contador].color=dato.color;
        lista[contador].precio=dato.precio;
        lista[contador].fecha=dato.fecha;
        lista[contador].oferta=dato.oferta;
        
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false});
  }


  eliminar=(dato)=>{
    var opcion=window.confirm("Realmente desea eliminar el registro " +dato.id)
    if(opcion){
      var contador= 0;
      var lista= this.state.data;
      lista.map((registro)=>{
        if(registro.id==dato.id){
          lista.splice(contador, 1);

        }

        contador++;
      });
      this.setState({data: lista});
    }
  }

  render(){
    return (
      <>
      <Container>
        <br/>
      <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar plato</Button>
        <br/>



      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Fecha</th>
            <th>Oferta Si/No</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {this.state.data.map((elemento)=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.color}</td>
              <td>{elemento.precio}</td>
              <td>{elemento.fecha}</td>
              <td>{elemento.oferta}</td>
              <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
              <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
              </td>
            </tr>
          ))}

        </tbody>



      </Table>

      </Container>


      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>


        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type="text" value={this.state.data.length+1}></input>
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input className='form-control' name='nombre' type="text" onChange={this.handleChange}></input>
          </FormGroup>

          <FormGroup>
            <label>Color:</label>
            <input className='form-control' name='color' type="text" onChange={this.handleChange}></input>
          </FormGroup>

          <FormGroup>
            <label>Precio:</label>
            <input className='form-control' name='precio' type="text" onChange={this.handleChange}></input>
          </FormGroup>


          <FormGroup>
            <label>Fecha:</label>
            <input className='form-control' name='fecha' type="text" onChange={this.handleChange}></input>
          </FormGroup>

          <FormGroup>
            <label>Oferta:</label>
            <input className='form-control' name='oferta' type="text" onChange={this.handleChange}></input>
          </FormGroup>

          
        </ModalBody>

        <ModalFooter>
          <Button color='primary' onClick={()=>this.insertar()}>Insertar</Button>
          <Button color='danger' onClick={()=>this.cerrarModalInsertar()}>Cancelar</Button>
        </ModalFooter>
      </Modal>










      <Modal isOpen={this.state.modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>


        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type="text" value={this.state.form.id}></input>
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input className='form-control' name='nombre' type="text" onChange={this.handleChange} value={this.state.form.nombre}></input>
          </FormGroup>

          <FormGroup>
            <label>Color:</label>
            <input className='form-control' name='color' type="text" onChange={this.handleChange} value={this.state.form.color}></input>
          </FormGroup>

          <FormGroup>
            <label>Precio:</label>
            <input className='form-control' name='precio' type="text" onChange={this.handleChange} value={this.state.form.precio}></input>
          </FormGroup>


          <FormGroup>
            <label>Fecha:</label>
            <input className='form-control' name='fecha' type="text" onChange={this.handleChange} value={this.state.form.fecha}></input>
          </FormGroup>

          <FormGroup>
            <label>Oferta:</label>
            <input className='form-control' name='oferta' type="text" onChange={this.handleChange} value={this.state.form.oferta}></input>
          </FormGroup>

          
        </ModalBody>

        <ModalFooter>
          <Button color='primary' onClick={()=>this.editar(this.state.form)}>Editar</Button>
          <Button color='danger' onClick={()=>this.cerrarModalEditar()}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      
      </>
     
    );

  }

}

export default App;
