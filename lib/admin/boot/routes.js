const urlBuilder = require('lib/url-builder')

module.exports = function adminRoutes (multiForum) {
  const forum = multiForum ? '/:forum' : ''

  urlBuilder.register('admin', forum + '/admin')
  urlBuilder.register('admin.wild', forum + '/admin/*')
  urlBuilder.register('admin.section', forum + '/admin/:section')
  urlBuilder.register('admin.section.wild', forum + '/admin/:section/*')
  urlBuilder.register('admin.topics', forum + '/admin/topics')
  urlBuilder.register('admin.topics.create', forum + '/admin/topics/create')
  urlBuilder.register('admin.topics.id', forum + '/admin/topics/:id')
  urlBuilder.register('admin.tags', forum + '/admin/tags')
  urlBuilder.register('admin.tags.create', forum + '/admin/tags/create')
  urlBuilder.register('admin.tags.id', forum + '/admin/tags/:id')
  urlBuilder.register('admin.users', forum + '/admin/users')
  urlBuilder.register('admin.users.create', forum + '/admin/users/create')
  urlBuilder.register('admin.users.id', forum + '/admin/users/:id')
  urlBuilder.register('admin.permissions', forum + '/admin/permissions')
  urlBuilder.register('admin.comments', forum + '/admin/comments')
  urlBuilder.register('admin.comments.csv', '/api/v2/comments.csv?forum=:forum')
  urlBuilder.register('admin.topics.csv', '/api/v2/topics.csv?forum=:forum')
  urlBuilder.register('admin.tags-moderation', forum + '/admin/tags-moderation')
  urlBuilder.register('admin.contenido-portada', forum + '/admin/contenido-portada')
  urlBuilder.register('admin.proyectistas', forum + '/admin/proyectistas')
  urlBuilder.register('admin.oficiales', forum + '/admin/oficiales')
  urlBuilder.register('admin.agenda', forum + '/admin/agenda')
  urlBuilder.register('admin.padron', forum + '/admin/padron')
  urlBuilder.register('admin.stats', forum + '/admin/stats')
  urlBuilder.register('admin.escuelas', forum + '/admin/escuelas')
  urlBuilder.register('admin.settings-stage', forum + '/admin/settings-stage')
  urlBuilder.register('admin.about-us', forum + '/admin/about-us')

}
