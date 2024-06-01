const express = require('express');

const router = express.Router()

const isLogin = require('../middleware/checkAuth');
const dashCtrl = require('../controller/dashboardCtrl');

router.get('/dashboard', isLogin, dashCtrl.dashboard)
router.get('/dashboard/item/:id', isLogin, dashCtrl.viewNotion)
router.post('/dashboard/update/:id', isLogin, dashCtrl.updateNotion)
router.get('/dashboard/add', isLogin, dashCtrl.addPage)
router.get('/dashboard/search', isLogin, dashCtrl.searchPage)
router.post('/dashboard/search', isLogin, dashCtrl.searchResultPage)
router.post('/dashboard/add', isLogin, dashCtrl.createNotion)

module.exports = router