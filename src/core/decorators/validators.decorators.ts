import { Request, Response } from 'express';
import Joi from '@hapi/joi';
import { BadRequestError } from '../errors/bad-request.error';

function requestDecorator(schema: Joi.Schema, options: Joi.ValidationOptions, attribute: string): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    const decorated = descriptor.value;
    descriptor.value = function (req: Request, res: Response): any {
      const o = {
        context: {
          [attribute]: req[attribute],
        },
      };
      Object.assign(o, options ? options : {});
      const validationResult = schema.validate(req[attribute], o);
      if (validationResult.error) {
        throw new BadRequestError(`Bad ${attribute}`);
      }
      req[attribute] = validationResult.value;
      return decorated.apply(this, [req, res]);
    };
    return descriptor;
  };
}

/**
 * Validation avec un schema Joi les query
 * @param schema Le schema Joi object
 * @param options Les options de validation de Joi
 */
export function QueryParamsValidator(schema: Joi.Schema, options?: Joi.ValidationOptions): MethodDecorator {
  return requestDecorator(schema, options, 'query');
}

/**
 * Validation avec un schema Joi le body
 * @param schema Le schema Joi object
 * @param options Les options de validation de Joi
 */
export function PayloadValidator(schema: Joi.Schema, options?: Joi.ValidationOptions): MethodDecorator {
  return requestDecorator(schema, options, 'body');
}

/**
 * Validation avec un schema Joi les params
 * @param schema Le schema Joi object
 * @param options Les options de validation de Joi
 */
export function ParamsValidator(schema: Joi.Schema, options?: Joi.ValidationOptions): MethodDecorator {
  return requestDecorator(schema, options, 'params');
}
