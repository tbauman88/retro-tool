import { canUpdateBoard } from './ColumnsRouter';
import { ApiRequest } from '../types/ApiRequest';
import { Response } from 'express';

describe('canUpdateBoard', () => {
  it('will throw an error if no board id is supplied', () => {
    const next = jest.fn();

    const request = { params: {} } as unknown as ApiRequest;
    const response = {} as Response;

    expect(() => canUpdateBoard(request, response, next)).rejects.toThrow(
      Error,
    );
    expect(next).not.toHaveBeenCalled();
  });
});
