import { describe, it, expect } from 'vitest';
import { loader } from '../routes/_index';

describe('loader', () => {
  it('fetch people', async () => {
    const request = new Request('https://swapi.dev/api/people/');

    try {
      await loader({ request, context: {}, params: {} });
    } catch (error) {
      expect((error as Response).status).toEqual(400);
    }
  });

  it('fails with an invalid id', async () => {
    const request = new Request('https://swapi.dev/api/people/?details=62');

    try {
      await loader({ request, context: {}, params: {} });
    } catch (error) {
      expect((error as Response).status).toEqual(400);
    }
  });

  it('returns people when it is found', async () => {
    const request = new Request('https://swapi.dev/api/people/');

    const result = await loader({
      request,
      context: {},
      params: {},
    });

    expect(result).toBeDefined();
  });

  it('returns people when it is found', async () => {
    const request = new Request('https://swapi.dev/api/people/62');

    const result = await loader({
      request,
      context: {},
      params: {},
    });

    expect(result).toBeDefined();
  });
});
