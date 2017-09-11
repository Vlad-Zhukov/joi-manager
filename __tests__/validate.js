/* eslint-disable no-underscore-dangle */

import Joi from 'joi';
import JoiManager from '../src/index';

const NUMBER__ = 12345;
const STRING__ = 'boo!';
const NULL__ = null;
const SYMBOL__ = Symbol(STRING__);

const schemaName = 'schema-name/number';
const schema = Joi.number()
    .min(0)
    .max(1);
const validValue = 0.5;

describe('JoiManager#validate()', () => {
    it('should return a promise', async () => {
        const joiManager = new JoiManager();
        joiManager.add(schemaName, schema);

        const value = await joiManager.validate(validValue, schemaName);
        expect(value).toBe(validValue);
    });

    it('should reject a promise if validation failed', async () => {
        const joiManager = new JoiManager();
        joiManager.add(schemaName, schema);

        try {
            await joiManager.validate(STRING__, schemaName);
        }
        catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });

    it('should throw if a schema with provided name was not added to the list', () => {
        const joiManager = new JoiManager();

        expect(() => joiManager.validate(NUMBER__, schemaName)).toThrow(Error);
    });

    it('should throw if "defaultOptions" is not an object', () => {
        const joiManager = new JoiManager();
        joiManager.add(schemaName, schema);

        expect(() => joiManager.validate(NUMBER__, schemaName, NULL__)).toThrow(TypeError);
        expect(() => joiManager.validate(NUMBER__, schemaName, NUMBER__)).toThrow(TypeError);
        expect(() => joiManager.validate(NUMBER__, schemaName, STRING__)).toThrow(TypeError);
        expect(() => joiManager.validate(NUMBER__, schemaName, SYMBOL__)).toThrow(TypeError);
    });
});
