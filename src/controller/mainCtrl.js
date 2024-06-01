

const mainCtrl = {
  home: async (req, res) => {
    const locals = {
      title: "Notion App with Nodejs and MongoDb"
    }

    res.render('index', {locals, layout: '../views/layouts/front-page'})
  },

  about: async (req, res) => {
    const locals = {
      title: "About Page Notion App"
    }

    res.render('index', {locals})
  }
}

module.exports = mainCtrl;