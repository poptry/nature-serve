const Router = require('koa-router')
const albumController = require('../controller/album.controller.js')
const album = new Router()

album.get('/getAlbums',albumController.getAlbums);
album.post('/uploadAlbum',albumController.uploadAlbum);
module.exports = album;