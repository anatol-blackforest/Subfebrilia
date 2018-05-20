const Value = require('../config').Value;

module.exports = async res => {
    try {
        const temperatures = await Value.find();
        res.render('index', { title: 'Все показатели за сегодня', temperatures } )
    } catch (err) {
        console.log(err)
        res.render('error', { err })
    }
}
