import escuelaStore from '../../stores/escuela-store'
import React, { Component } from 'react'

export default class AdminEscuelas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      escuelas: null,
      escuelaEdit: null,
      itemsToEdit: {},
      responseFail: null,
      responseSuccess: null,
    }

  }

  componentDidMount() {
    escuelaStore.findAll().then(escuelas => this.setState({ escuelas }))
  }


  showPanel = (event) => {
    document.querySelectorAll('.showHiden').forEach((el) => {
      if (el !== event.nextSibling) {
        if (!el.classList.contains('hiden')) {
          el.classList.add('hiden')
          el.parentNode.children[0].children[0].classList.remove('activeAngle')
          el.parentNode.children[0].classList.remove('active')
          el.parentNode.classList.remove('active')
        }
      }

    })

    event.target.children[0].classList.toggle('activeAngle');
    event.target.nextSibling.classList.toggle('hiden')
    event.target.classList.toggle('active')
    event.target.parentElement.classList.toggle('active')
  }

  toggleEditSchool = (escuela) => {

    this.setState({
      escuelaEdit: escuela ? escuela._id : null,
      itemsToEdit: escuela ? {
        tituloForo: escuela.tituloForo,
        nombrePestaña: escuela.nombrePestaña,
        titulo: escuela.titulo
      } : {}
    })

  }
  handleChangeInput = (event) => {
    const name = event.target.name
    const newValue = event.target.value
    this.setState(prevState => {
      const updatedItemsToEdit = Object.assign({}, prevState.itemsToEdit, { [name]: newValue });
      return { itemsToEdit: updatedItemsToEdit };
    });
  }

  submitForm = (event) => {
    const id = event.target.querySelector('input[name="id"]').value
    const newValues = this.state.itemsToEdit
    window.fetch(`/api/escuela/${id}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(newValues),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(resp => {
        const oldEscuelas = this.state.escuelas
        const index = oldEscuelas.findIndex(escuela => escuela._id === resp._id)
        oldEscuelas[index] = resp
        this.setState({ escuelas: oldEscuelas })
        this.toggleEditSchool()
        this.setState({
          responseSuccess: 'Los cambios se han guardado exitósamente',
        })
      }
      ).catch(err => this.setState({
        responseFail: 'Hubo un error al guardar los cambios',
      }))
    event.preventDefault();
  }

  render() {
    const { escuelas, escuelaEdit, responseFail, responseSuccess } = this.state
    return (
      <div>
        <div className='school-seetings'>
          <div className='heading'>
            <h2>Escuelas</h2>
            {
              responseSuccess && (
                <div className="alert alert-success" role="alert">
                  <b>Exito!</b> {responseSuccess}
                </div>
              )
            }
            {
              responseFail && (
                <div className="alert alert-danger" role="alert">
                  <b>Error!</b> {responseFail}
                </div>
              )
            }
            <div className='escuelas'>
              {escuelas && escuelas.map(escuela =>
                <div key={escuela._id} className='panelExpandible'>

                  <h3 className='titleShow' onClick={this.showPanel}> {escuela.nombre}  <span className='glyphicon glyphicon-menu-down pull-right'></span></h3>
                  <div className='showHiden hiden'>
                    <div className='contentHiden'>
                      {escuelaEdit !== escuela._id ? <div>
                        <div className='info'>
                          <strong>Subtitulo del foro: </strong>{escuela.tituloForo}
                        </div>
                        <div className='info'>
                          <strong>Nombre de la pestaña: </strong>{escuela.nombrePestaña}
                        </div>
                        <div className='info'>
                          <strong>Titulo del foro: </strong>{escuela.titulo}
                        </div>

                      </div> :
                        <div>
                          <form onSubmit={this.submitForm}>
                            <input type="text" value={escuela._id} name='id' hidden disabled />
                            <div className='info'>
                              <strong>Subtitulo del foro: </strong><input className='form-control' type='text' name="tituloForo" defaultValue={this.state.itemsToEdit.tituloForo} onChange={this.handleChangeInput} />
                            </div>
                            <div className='info'>
                              <strong>Nombre de la pestaña: </strong><input className='form-control' type="text" name="nombrePestaña" defaultValue={this.state.itemsToEdit.nombrePestaña} onChange={this.handleChangeInput} />
                            </div>
                            <div className='info'>
                              <strong>Titulo del foro: </strong><input className='form-control' type="text" name="titulo" defaultValue={this.state.itemsToEdit.titulo} onChange={this.handleChangeInput} />
                            </div>

                            {escuelaEdit && escuelaEdit === escuela._id && <div className='actions'>
                              <span className='glyphicon glyphicon-remove-circle' onClick={(e) => this.toggleEditSchool()} />
                              <button type='submit' className='glyphicon glyphicon-floppy-disk' />
                            </div>
                            }
                          </form>

                        </div>
                      }

                      {!escuelaEdit && <div className='actions'>
                        <span className='glyphicon glyphicon-pencil' onClick={(e) => this.toggleEditSchool(escuela)} />

                      </div>
                      }

                    </div>
                  </div>
                </div>)
              }
            </div>




          </div>

        </div>

      </div>
    )
  }

}
