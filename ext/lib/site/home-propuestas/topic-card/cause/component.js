import React, { Component } from 'react'
import t from 't-component'
import { Link, browserHistory } from 'react-router'
import topicStore from 'lib/stores/topic-store/topic-store'
import userConnector from 'lib/site/connectors/user'
import config from 'lib/config'

export class Cause extends Component {
  state = {
    topicClosed: false,
    showLoginMessage: false,
    results: null,
    forceProyectista: false,
    supported: null
    // isFromEscuelaReactive: false
  }

  componentWillMount () {
    this.setStateFromProps(this.props)
  }

  componentWillReceiveProps (props) {
    this.setStateFromProps(props)
  }

  setStateFromProps (props) {
    const { topic } = props

    return this.setState({
      showLoginMessage: false,
      topicClosed: topic.closed,
      supported: !!topic.voted
    })
  }

  handleSupport = (e) => {
    if (this.state.topicClosed) return

    if (!this.props.user.state.fulfilled) {
      return browserHistory.push({
        pathname: '/signin',
        query: { ref: window.location.pathname }
      })
    }

    topicStore.vote(this.props.topic.id, !this.state.supported ? 'apoyo-idea' : 'no-apoyo-idea')
      .catch((err) => { throw err })
  }

  handleProyectista = (id, hacerProyectista) => {
    const { user } = this.props

    if (user.state.rejected) {
      return browserHistory.push({
        pathname: '/signin',
        query: { ref: window.location.pathname }
      })
    }

    topicStore.updateProyectista(id, hacerProyectista).then((topic) =>
      this.setState({ forceProyectista: true })
    ).catch((err) => { throw err })
  }

  render () {
    const { user, topic, isFromEscuela } = this.props
    const isSistematizada = topic && topic.attrs && topic.attrs.state == 'sistematizada'
    const isIdeaProyecto = topic && topic.attrs && topic.attrs.state == 'idea-proyecto'
    const isProyectista = !user.state.rejected && user.state.value && (this.state.forceProyectista || (topic.proyectistas && topic.proyectistas.length > 0 && topic.proyectistas.includes(user.state.value.id)))

    if (user.state.pending) return null

    const { supported, topicClosed } = this.state
    if (user.state.fulfilled && topic.privileges && !topic.privileges.canVote) return null
    if (user.state.fulfilled && topic.privileges && !topic.privileges.canVote) return null
    if (!isFromEscuela) return null

    return (
      <div className='topics-cause-propuesta'>
        <button
          className={`btn-like btn-like-${isProyectista ? 'filled' : 'empty'}`}
          onClick={isFromEscuela && (() => this.handleProyectista(topic.id, !isProyectista))}
          disabled={isProyectista}>
          {isProyectista ? '¡Te gusta!' : 'Me gusta'}&nbsp;{isProyectista && `( ${topic.proyectistas.length + (this.state.forceProyectista ? 1 : 0)} )`}&nbsp;<span className='icon-like' />
        </button>
      </div>
    )
  }
}

export default userConnector(Cause)
