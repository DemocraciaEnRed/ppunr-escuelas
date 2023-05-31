import React, { Component } from 'react'
import t from 't-component'
import userConnector from 'lib/site/connectors/user'
import CommentsForm from './form/component'
import CommentsList from './list/component'
import CommentsOrderBy from './order-by/component'
import commentsConnector from './connector'
import config from 'lib/config'

export class Comments extends Component {
  constructor (props) {
    super(props)

    this.state = {
      comments: props.commentsFetch.value,
      pagination: props.commentsFetch.meta.pagination,
      isFromEscuelaReactive: props.isFromEscuela,
      commentsEnabled: props.forum.config.ideacion
    }
  }

  componentWillReceiveProps ({ commentsFetch }) {
    if (!commentsFetch.pending) {
      this.setState({
        comments: commentsFetch.value,
        pagination: commentsFetch.meta.pagination
      })
    }
  }

  render () {
    const { commentsFetch, topic, user, isFromEscuela } = this.props
    const { commentsEnabled } = this.state
    
    const enabled = commentsEnabled

    return (
      <div className='topic-comments'>
        <div className='topic-article-content'>
          <h2 className='topic-comments-title'>
            {/* {t('comments.arguments')} */}
            Comentarios
            {/* <CommentsOrderBy onSort={this.props.handleSort} /> */}
          </h2>
          {this.state.isFromEscuelaReactive ? (
            enabled ?
              <CommentsForm
                topic={this.props.topic}
                onSubmit={this.props.handleCreate}
                commentsCreating={this.props.commentsCreating} />
            :
              <p className='alert alert-warning'>¡Gracias por haber comentado! Finalizó el período para hacer comentarios.</p>
          ) : ( enabled ? 
              <p className='alert alert-warning'>No podés hacer comentarios en ideas de esta escuela</p>
              : <p className='alert alert-warning text-center'>¡Gracias por haber comentado! Finalizó el período para hacer comentarios.</p>
            )
          }
          {!commentsFetch.rejected && (
            <CommentsList
              forum={this.props.forum}
              topic={this.props.topic}
              loading={commentsFetch.pending}
              comments={this.state.comments}
              onReply={enabled && this.props.handleReply}
              commentsReplying={enabled && this.props.commentsReplying}
              onDelete={this.props.handleDelete}
              onDeleteReply={this.props.handleDeleteReply}
              commentDeleting={this.props.commentDeleting}
              onUnvote={enabled && this.props.handleUnvote}
              onUpvote={enabled && this.props.handleUpvote}
              onDownvote={enabled && this.props.handleDownvote}
              onFlag={this.props.handleFlag}
              onUnflag={this.props.handleUnflag}
              onReplyEdit={enabled && this.props.handleReplyEdit}
              onEdit={enabled && this.props.handleEdit}
              isFromEscuela={isFromEscuela}
              enabled={enabled} />
          )}
          {
            this.state.pagination &&
            this.state.pagination.page < this.state.pagination.pageCount &&
            (
              <div className='load-more'>
                <button
                  type='button'
                  className='btn btn-primary btn-block'
                  disabled={commentsFetch.pending}
                  onClick={this.props.handleNextPage}>
                  {t('comments.load-more')}
                </button>
              </div>
            )
          }
          {commentsFetch.rejected && (
            <div className='alert alert-danger' role='alert'>
              {t('modals.error.default')}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default commentsConnector(userConnector(Comments))
