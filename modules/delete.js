const Value = require('../config').Value;

module.exports = async (res, id) => {
    try {
        await Value.findByIdAndRemove(id)
        res.redirect("/")
    } catch (err) {
        console.log(err)
        res.render('error', { err })    
    }
}
