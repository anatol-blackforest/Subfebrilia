const Value = require('../config').Value;

module.exports = async (res, temperature) => {
    try {
        let value = new Value({
            time: (new Date()).toLocaleString(),
            temperature
        });
        await value.save();
        res.redirect("/")
    } catch (err) {
        console.log(err)
        res.render('error', { err })
    }
}
