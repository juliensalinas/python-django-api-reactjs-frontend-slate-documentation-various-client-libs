/* @flow */

import {
  camelCaseEveryProps,
  errorForResponse,
} from '../utils';
import {
  BadParametersError,
  BadRequestError,
  InvalidVersionError,
  MethodNotAllowedError,
  NoResultError,
  NotAcceptableError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  VersionRequiredError,
} from '../errors';
import company from './fixtures/company';

describe('utils', (): void => {
  describe('#camelCaseEveryProps', (): void => {
    it('should exist', (): void => {
      expect(camelCaseEveryProps).toBeDefined();
    });

    it('should convert an object to camel case', (): void => {
      let result = camelCaseEveryProps(company.data);
      expect(result).toEqual(company.result);
    });
  });

  describe('#errorForResponse', (): void => {
    it('should exist', (): void => {
      expect(errorForResponse).toBeDefined();
    });

    it('should return generic error for invalid arguments', (): void => {
      // $FlowFixMe
      let result = errorForResponse();
      expect(result).toBeInstanceOf(Error);
    });

    it('should return generic error for unknown status', (): void => {
      // $FlowFixMe
      let result = errorForResponse(700);
      expect(result).toBeInstanceOf(Error);
    });

    it('should return generic error for unkown error code', (): void => {
      // $FlowFixMe
      let result = errorForResponse(404, '150');
      expect(result).toBeInstanceOf(NotFoundError);
    });

    it('should return BadRequestError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(400);
      expect(result).toBeInstanceOf(BadRequestError);
    });

    it('should return UnauthorizedError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(401);
      expect(result).toBeInstanceOf(UnauthorizedError);
    });

    it('should return NotFoundError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(404);
      expect(result).toBeInstanceOf(NotFoundError);
    });

    it('should return MethodNotAllowedError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(405);
      expect(result).toBeInstanceOf(MethodNotAllowedError);
    });

    it('should return NotAcceptableError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(406);
      expect(result).toBeInstanceOf(NotAcceptableError);
    });

    it('should return TooManyRequestsError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(429);
      expect(result).toBeInstanceOf(TooManyRequestsError);
    });

    it('should return VersionRequiredError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(404, '1');
      expect(result).toBeInstanceOf(VersionRequiredError);
    });

    it('should return NoResultError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(404, '2');
      expect(result).toBeInstanceOf(NoResultError);
    });

    it('should return BadParametersError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(404, '3');
      expect(result).toBeInstanceOf(BadParametersError);
    });

    it('should return InvalidVersionError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(404, '4');
      expect(result).toBeInstanceOf(InvalidVersionError);
    });

    it('should return InternalServerError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(500);
      expect(result).toBeInstanceOf(Error);
    });

    it('should return InternalServerError', (): void => {
      // $FlowFixMe
      let result = errorForResponse(550);
      expect(result).toBeInstanceOf(Error);
    });
  });
});
