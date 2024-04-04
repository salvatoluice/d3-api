const Discount = require('../models/Discount');
const Store = require('../models/Store');

const search = async (query) => {
  try {
    const discounts = await Discount.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, 
        { category: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { slug: { $regex: query, $options: 'i' } } 
      ]
    });

    const stores = await Store.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { storeType: { $regex: query, $options: 'i' } }
      ]
    });

    return { discounts, stores };
  } catch (error) {
    throw new Error('Error searching discounts and stores');
  }
};

exports.searchEndpoint = async (req, res) => {
  try {
    const query = req.query.q;
    const result = await search(query);
    res.json(result);
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
