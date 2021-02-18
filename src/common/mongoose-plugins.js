const moment = require('moment');
/* eslint-disable no-param-reassign */

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v
 *  - removes password
 *  - replaces _id with id
 *  - formats the timestamps
 */

const deleteAtPath = (obj, path, index) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

const toJSON = (schema) => {
  let transform;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      ret.id = ret._id.toString();
      ret.createdAt = moment(ret.createdAt).format('MMMM Do YYYY, h:mm');
      ret.updatedAt = moment(ret.updatedAt).format('MMMM Do YYYY, h:mm');
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};

module.exports = { toJSON };
