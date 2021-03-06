import React from 'react'
import RepliesForm from './form/component'
import RepliesList from './list/component'

export default function CommentReplies (props) {
  if (!props.repliesVisibility) return null

  return (
    <div className='comments-replies-container'>
      <RepliesList
        onDeleteReply={props.onDeleteReply}
        commentId={props.commentId}
        replies={props.replies}
        onReplyEdit={props.onReplyEdit}
        forum={props.forum}
        user={props.user}
        enabled={props.enabled} />
      {props.isFromEscuela && props.enabled &&
        <RepliesForm
          commentId={props.commentId}
          onSubmit={props.onReply}
          commentsReplying={props.commentsReplying}
          topic={props.topic} />
      }
    </div>
  )
}
