const Value = require('./schema').Value;

module.exports = async (res, id, temperature) => {
    try {
        await Value.findByIdAndUpdate(id, {temperature})
        res.redirect("/")
    } catch (err) {
        console.log(err)
        res.render('error', { err })
    }
}
