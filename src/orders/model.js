const mongoose = require('mongoose');
const { toJSON } = require('../common/mongoose-plugins');

const orderSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
