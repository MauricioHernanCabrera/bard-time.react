const routes = require('next-routes')

module.exports = routes()
  .add({ name: 'multimer', pattern: '/', page: '/multimer/index' })
  .add({ pattern: '/multimer', page: '/multimer/index' })
  .add({ name: 'multimer-new', pattern: '/multimer/new', page: '/multimer/new' })
  .add({ name: 'multimer-edit', pattern: '/multimer/:id/edit', page: '/multimer/edit' })
  .add({ name: 'config', pattern: '/config', page: 'config' })
  
// const routes = require('next-routes')

// module.exports = routes()
//   .add({ name: 'index', pattern: '/', page: 'index' })
//   .add({ name: 'other', pattern: '/other', page: 'other' })
  