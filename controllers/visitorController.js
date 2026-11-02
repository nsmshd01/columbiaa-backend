const Visitor = require('../models/Visitor');

exports.incrementVisitor = async (req, res) => {
    try {
        let visitor = await Visitor.findOne();

        if (!visitor) {
            visitor = new Visitor({ count: 1 });
        } else {
            visitor.count += 1;
        }

        await visitor.save();
        res.status(200).json({ count: visitor.count });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getVisitorCount = async (req, res) => {
    try {
        const visitor = await Visitor.findOne();
        res.status(200).json({ count: visitor ? visitor.count : 0 });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
