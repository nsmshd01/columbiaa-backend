const HvsbVisitor = require('../models/HvsbVisitor');

exports.incrementHvsbVisitor = async (req, res) => {
    try {
        let visitor = await HvsbVisitor.findOne();

        if (!visitor) {
            visitor = new HvsbVisitor({ count: 1 });
        } else {
            visitor.count += 1;
        }

        await visitor.save();
        res.status(200).json({ count: visitor.count });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getHvsbVisitorCount = async (req, res) => {
    try {
        const visitor = await HvsbVisitor.findOne();
        res.status(200).json({ count: visitor ? visitor.count : 0 });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
