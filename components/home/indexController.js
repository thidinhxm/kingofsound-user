const controller = {}

controller.index = (req, res, next) => {
    res.render('../components/home/homeViews/index');
}

module.exports = controller;