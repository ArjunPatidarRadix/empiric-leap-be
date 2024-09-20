const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  project_name: String,
  budget: {
    orignal_estimate: {
      type: Number,
    },
    final_cost: {
      type: Number,
    },
    difference: {
      type: Number,
    },
  },
  RFIs: {
    qty: {
      type: Number,
    },
    turn_time: {
      type: Number,
    },
  },
  change_orders: {
    qty: {
      type: String,
    },
    turn_time: {
      type: String,
    },
  },
  schedule: {
    original: {
      type: Number,
    },
    actual: {
      type: Number,
    },
    difference: {
      type: Number,
    },
  },
  safety: {
    manhours: {
      type: String,
    },
    recordables: {
      type: String,
    },
    near_misses: {
      type: String,
    },
  },
  key_insights: String,
  safety: {
    star_count: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  financial_performance: Object,
  team_performance: Object,
});

module.exports = mongoose.model("Projects", projectSchema);
