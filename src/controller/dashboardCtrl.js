const mongoose = require('mongoose')

const Notion = require('../model/notionModel')

const dashCtrl = {
  dashboard: async (req, res) => {
    const locals = {
      title: "Dashboard"
    }

    let perPage = 6;
    let page = (req.query.page * 1) || 1;

    try {
      const notions = await Notion.aggregate([
        {$sort: {updatedAt: -1}},
        {$match: {user: new mongoose.Types.ObjectId(req.user.id)}}
      ]).skip(perPage * page - perPage).limit(perPage).exec() 

      let count = await Notion.find({user: req.user.id})

      count = count.length

      res.render('dashboard/index', {userName: req.user.firstName, locals, notions, current: page, pages: Math.ceil(count/perPage), layout: '../views/layouts/dashboard'})
    } catch (error) {
      console.log(error);
    }
  },

  // get create notion page
  addPage: async (req, res) => {
    res.render('dashboard/add', {layout: '../views/layouts/dashboard'})
  },

  // add a new notion
  createNotion: async (req, res) => {
    try {
      req.body.user = req.user.id
      await Notion.create(req.body)
      res.redirect('/dashboard')

    } catch (error) {
      console.log(error);
    }
  },

  // view notion item
  viewNotion: async (req, res) => {
    const {id} = req.params
    try {
      const notion = await Notion.findById(id)
      if(notion) {
        res.render('dashboard/viewNotion', {notionId: id, notion, layout: '../views/layouts/dashboard'})
      } else {
        res.send('Something went wrong!')
      }
    } catch (error) {
      console.log(error);
    }
  },

  // update Notion
  updateNotion: async (req, res) => {
    const {id} = req.params
    const {title, body} = req.body
    try {
      await Notion.findByIdAndUpdate(id, {title, body})
      res.redirect('/dashboard')
    } catch (error) {
      console.log(error);
    }
  },

  // Search page
  searchPage: async (req, res) => {
    try {
      res.render('dashboard/search', {searchResult: [], layout: '../views/layouts/dashboard'})
    } catch (error) {
      console.log(error);
    }
  },

  searchResultPage: async (req, res) => {
    try {
      const {searchTermin} = req.body
      const key = new RegExp(searchTermin, 'i')

      const searchResult = await Notion.find({$or: [{title: {$regex: key}}, {body: {$regex: key}}]})
      res.render('dashboard/search', {searchResult, layout: '../views/layouts/dashboard'})
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = dashCtrl;