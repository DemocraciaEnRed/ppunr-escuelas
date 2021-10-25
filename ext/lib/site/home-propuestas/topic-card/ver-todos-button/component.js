import React, { Component } from 'react'
import userConnector from 'lib/site/connectors/user'

class VerTodosButton extends Component {

  render() {
    const { topic } = this.props

    const escuelaID = topic.escuela._id

    return (
        <div
          className='votar-button-wrapper'>
            <button
              className="btn btn-empty"
              onClick={() => window.location.href = `/propuestas?id=${encodeURIComponent(escuelaID)}`
              }>
                Ver todos los proyectos
              </button>
        </div>
    )
  }
}

export default userConnector(VerTodosButton)
