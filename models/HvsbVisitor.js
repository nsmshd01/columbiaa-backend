const mongoose = require('mongoose');

const hvsbVisitorSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
});

const HvsbVisitor = mongoose.model('HvsbVisitor', hvsbVisitorSchema);

module.exports = HvsbVisitor;
