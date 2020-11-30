import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import moment from 'moment'
import userConnector from 'lib/site/connectors/user'
import VotarButton from 'ext/lib/site/home-propuestas/topic-card/votar-button/component'

const estados = (state) => {
  switch (state) {
    case 'sistematizada':
      return 'Sistematizada'
      break
    case 'idea-proyecto':
      return 'Idea-Proyecto'
      break
    case 'pendiente':
      return 'Original'
      break
    case 'proyecto':
      return 'Proyecto'
      break
  }
}

export class TopicCard extends Component {
  handleWrapperClick = (e) => {
    // https://stackoverflow.com/questions/22119673/find-the-closest-ancestor-element-that-has-a-specific-class
    function findAncestor (el, cls) {
      while ((el = el.parentElement) && !el.classList.contains(cls));
      return el;
    }

    let targTag = e.target && e.target.tagName

    const isSeguirButton = findAncestor(e.target, 'cause-wrapper')
    const isProyectistaButton = findAncestor(e.target, 'proyectista-wrapper')
    const isVotarButton = findAncestor(e.target, 'votar-button-wrapper')

    if (!isSeguirButton && !isProyectistaButton && !isVotarButton)
      window.open(`/propuestas/topic/${this.props.topic.id}`, '_blank');
  }
  render() {
    const { topic, onVote, onProyectista, user, isFromEscuela } = this.props

    const isStaff = !user.state.rejected && user.state.value.staff

    // tipo de propuesta
    const isSistematizada = topic && topic.attrs && topic.attrs.state == 'sistematizada'
    const isIdeaProyecto = topic && topic.attrs && topic.attrs.state == 'idea-proyecto'
    const isProyecto = topic && topic.attrs && topic.attrs.state == 'proyecto'

    const isProyectista = !user.state.rejected && topic.proyectistas && topic.proyectistas.length > 0 && topic.proyectistas.includes(user.state.value.id)

    const likesCssClass = topic.voted ? 'voted' : (
      topic.privileges && topic.privileges.canVote && !isStaff ? 'not-voted' : 'cant-vote'
    )
    const likesCountDiv = (
      <div className='participants'>
        <span className='icon-like' />
        &nbsp;
        {topic.action.count}
      </div>
    )

    const subscribeCssClass = 'not-subscribed'
    const subscribesCountDiv = (
      <div className='participants'>
        <span className='icon-arrow-right' />
      </div>
    )

    function capitalizeFirstLetter(str) {
      if (!str) return ''
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
      <div className='ext-topic-card ideas-topic-card' onClick={this.handleWrapperClick}>
        <div className='topic-card-info'>
          <div className='topic-card-attrs'>
            {topic.eje &&
              <span className='badge badge-default'>{topic.eje.nombre}</span>
            }
            <span className={`estado ${topic.attrs.state}`}>{estados(topic.attrs.state)}</span>
          </div>

          {!isProyecto && (isSistematizada || isIdeaProyecto ?
            <div className='topic-creation'>
              <span>Creado por: <span className='topic-card-author'>PPUNR</span></span>
            </div>
            :
            <div className='topic-creation'>
              <span>Creado por: <span className='topic-card-author'>{topic.owner.firstName}</span></span>
            {topic.owner.claustro &&
                <span className='topic-card-claustro'>({topic.owner.claustro.nombre})</span>
              }
              <span
                className={`date ${(topic.attrs.state !== 'pendiente') && 'space'}`}>
                {moment(topic.createdAt).format('D-M-YYYY')}
              </span>
            </div>
          )}

          <h1 className={`topic-card-title ${isProyecto && 'mt-5'}`}>
            {isProyecto && topic.attrs &&
              <span className='topic-number'>#{topic.attrs.numero}</span>
            }
            {topic.mediaTitle}
          </h1>
          <p className='topic-card-description'>
            {createClauses(topic)}
          </p>

        </div>

        <div className='topic-card-footer'>
          {isProyecto && topic.attrs &&
            <div className='topic-card-presupuesto'>
              Presupuesto: ${topic.attrs.presupuesto.toLocaleString()}
            </div>
          }
          { topic.tags && topic.tags.length > 0 && (
              <div className='topic-card-tags'>
                <span className="glyphicon glyphicon-tag"></span>
                {topic.tags.slice(0, 12).map((tag, i) => (
                  <span
                    key={`${tag}-${i}`}
                    className='tag-wrapper' >
                    {capitalizeFirstLetter(tag)}
                  </span>
                ))}
              </div>
          ) }

          <div className='buttons-wrapper'>
            {/* antes en className estaba tmb ${likesCssClass} */}
            {/*!isSistematizada && !isIdeaProyecto &&
              <div className={`cause-wrapper`}>
                <div className='btn btn-primary btn-empty'>
                  Seguidores
                  {likesCountDiv}
                </div>
                {!isFromEscuela && (
                  <button disabled className='btn btn-primary btn-filled'>
                    Seguir
                    {likesCountDiv}
                  </button>
                )}
                {isFromEscuela && topic.voted && (
                  <button
                    onClick={() => onVote(topic.id, topic.voted)}
                    className='btn btn-primary btn-filled'>
                    Ya seguís
                    {likesCountDiv}
                  </button>
                )}
                {isFromEscuela && !topic.voted && (
                  <button
                    disabled={!topic.privileges.canVote || isStaff}
                    onClick={() => onVote(topic.id, topic.voted)}
                    className='btn btn-primary btn-empty'>
                    Seguir
                    {likesCountDiv}
                  </button>
                )}
              </div>
            */}
            {/*!isSistematizada && !isIdeaProyecto &&
              <div
                className={`subscribe-wrapperr ${subscribeCssClass}`}
                onClick={this.handleWrapperClick}>
                <div
                  className='btn btn-primary btn-empty'>
                  Comentarios
                  {subscribesCountDiv}
                </div>
              </div>
            */}
            {/*isFromEscuela && isSistematizada &&
              <div
                className='proyectista-wrapper'>
                <button
                  className={`btn btn-primary btn-${isProyectista ? 'empty' : 'filled'}`}
                  onClick={() => onProyectista(topic.id, !isProyectista)}
                  disabled={isProyectista}>
                  {isProyectista ? '¡Ya sos proyectista!' : '¡Quiero ser proyectista!'}
                </button>
              </div>
            */}
            {isFromEscuela && isProyecto &&
              <VotarButton topic={topic} onVote={onVote} />
            }
          </div>

        </div>
      </div>
    )
  }
}

function createClauses({ attrs, clauses }) {
  let div = document.createElement('div')
  let content
  if (!attrs) {
    content = clauses
      .sort(function (a, b) {
        return a.position > b.position ? 1 : -1
      })
      .map(function (clause) {
        return clause.markup
      })
      .join('')
  } else {
    const { problema } = attrs
    content = `${problema}`
  }
  div.innerHTML = content
  let returnText = div.textContent.replace(/\r?\n|\r/g, '')
  return returnText.length > 340 ? returnText.slice(0, 340) + '...' : returnText
}

export default userConnector(TopicCard)
