const NodeMediaServer = require('node-media-server');
const config = require('../config/default').rtmp_server;
const helpers = require('../src/helpers/helper');
 
nms = new NodeMediaServer(config);
 
nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    helpers.generateStreamThumbnail(stream_key);
});
 
const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
 
module.exports = nms;