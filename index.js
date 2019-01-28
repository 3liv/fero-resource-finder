const { basename, extname, resolve, relative } = require('path')
    , autolink = 'resources/components/**/!(*test).{css,js}'
    , log = require('utilise/log')('[fero-resource-finder]')
    , name = path => basename(path)
        .replace('.js', '')
    , glob = require('glob').sync
    , rel = (dir, path) => 
        './' + relative(dir, path)
        .replace(/\\/g, '/')

module.exports = function(dir = __dirname){
  log(`FINDING RESOURCES in ${dir}`)

  return Promise.all(
    glob(autolink, { root: dir })
    .map(p => ({ name: name(p), path: rel(dir, p) }))
    .map(({ name, path }) => {
      log(`FOUND: ${name} at ${path}`)
      return { name, path }
    })
  )
}
