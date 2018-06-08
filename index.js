function hasChunkNameComment(node) {
  const { leadingComments } = node
  return (leadingComments || []).some(comment =>
    comment.value.includes('webpackChunkName'),
  )
}

module.exports = function (options) {
    const t = options.types;

    return {
        visitor: {
            CallExpression(path) {
                if (path.node.callee.type === 'Import') {
                    const node = path.node;
                    const chunkLocation = path.parentPath.parentPath;
                    const args = path.get('arguments');
                    const chunkName = chunkLocation.get('arguments')[0].get('params')[0].get('properties')[0].get('value').node.name;
                    console.log('chunkName',chunkName);


                    if (hasChunkNameComment(args[0].node)) return
                    args[0].addComment('leading', ` webpackChunkName: "${chunkName}" `)
                }
            }
        }
    }
}
;
