const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const {
  MAX_OPTIONAL_PROPERTIES,
  MAX_SYMBOLS_PER_OBJECT,
  MIN_PASSWORD_LENGTH
} = require("../../common/config");

const optionalScheme = Joi.object()
  .max(MAX_OPTIONAL_PROPERTIES)
  .pattern(/.*/, [Joi.string(), Joi.number(), Joi.boolean(), Joi.date(), Joi.object()])
  .custom(optionalValidator, "optional object validation")
  .error(errors => {
    errors
      .filter(err => err.code === "object.length")
      .forEach(
        err =>
          (err.message = `Optional field exceeds the limit of ${MAX_SYMBOLS_PER_OBJECT} symbols per object`)
      );
    return errors;
  });

const schemas = {
  id: Joi.object({ id: Joi.objectId() }),
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string().max(200),
      email: Joi.string().email({ tlds: { allow: false } }),
      password: Joi.string().min(MIN_PASSWORD_LENGTH)
    }),
  statistics: Joi.object().options({ abortEarly: false, allowUnknown: false }).keys({
    lessons: optionalScheme,
    katas: optionalScheme,
    games: optionalScheme
  })
};

function optionalValidator(value, helpers) {
  if (JSON.stringify(value).length > MAX_SYMBOLS_PER_OBJECT) {
    return helpers.error("object.length");
  }

  return value;
}

module.exports = schemas;

