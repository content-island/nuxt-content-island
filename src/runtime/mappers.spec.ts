import type { ContentQueryParams } from '@content-island/api-client';
import { mapQueryParamsToString, mapStringToQueryParams } from './mappers';

interface Post {
  id: string;
  language: 'en';
  slug: string;
}

describe('mapQueryParamsToString', () => {
  it.each<{ queryParams: any }>([
    {
      queryParams: undefined,
    },
    {
      queryParams: null,
    },
    {
      queryParams: {},
    },
  ])('should return an empty string when it feeds queryParams=$queryParams', ({ queryParams }) => {
    // Arrange

    // Act
    const result = mapQueryParamsToString(queryParams);

    // Assert
    const expectedResult = '';
    expect(result).toEqual(expectedResult);
  });

  it.each<{ queryParams: ContentQueryParams<Post>; expectedResult: string }>([
    {
      queryParams: {
        contentType: 'post',
      },
      expectedResult: '%7B%22contentType%22%3A%22post%22%7D',
    },
    {
      queryParams: {
        contentType: 'post',
        'fields.slug': 'my-post',
      },
      expectedResult: '%7B%22contentType%22%3A%22post%22%2C%22fields.slug%22%3A%22my-post%22%7D',
    },
    {
      queryParams: {
        contentType: 'post',
        'fields.slug': {
          in: ['my-post', 'another-post'],
        },
      },
      expectedResult:
        '%7B%22contentType%22%3A%22post%22%2C%22fields.slug%22%3A%7B%22in%22%3A%5B%22my-post%22%2C%22another-post%22%5D%7D%7D',
    },
    {
      queryParams: {
        contentType: 'post',
        'fields.slug': {
          in: ['my-post', 'another-post'],
        },
        id: '12345',
        language: 'en',
      },
      expectedResult:
        '%7B%22contentType%22%3A%22post%22%2C%22fields.slug%22%3A%7B%22in%22%3A%5B%22my-post%22%2C%22another-post%22%5D%7D%2C%22id%22%3A%2212345%22%2C%22language%22%3A%22en%22%7D',
    },
  ])(
    'should return a stringified queryParams when it feeds queryParams=$queryParams',
    ({ queryParams, expectedResult }) => {
      // Arrange

      // Act
      const result = mapQueryParamsToString(queryParams);

      // Assert
      expect(result).toEqual(expectedResult);
    }
  );
});

describe('mapStringToQueryParams', () => {
  it.each<{ queryString: string | undefined | null }>([
    {
      queryString: undefined,
    },
    {
      queryString: null,
    },
    {
      queryString: '',
    },
    {
      queryString: 'invalid-query-string',
    },
  ])('should return undefined when it feeds queryString=$queryString', ({ queryString }) => {
    // Arrange

    // Act
    const result = mapStringToQueryParams(queryString);

    // Assert
    expect(result).toEqual({});
  });

  it.each<{ queryString: string; expectedResult: ContentQueryParams<Post> }>([
    {
      queryString: '%7B%22contentType%22%3A%22post%22%7D',
      expectedResult: { contentType: 'post' },
    },
    {
      queryString: '%7B%22contentType%22%3A%22post%22%2C%22fields.slug%22%3A%22my-post%22%7D',
      expectedResult: { contentType: 'post', 'fields.slug': 'my-post' },
    },
    {
      queryString:
        '%7B%22contentType%22%3A%22post%22%2C%22fields.slug%22%3A%7B%22in%22%3A%5B%22my-post%22%2C%22another-post%22%5D%7D%7D',
      expectedResult: {
        contentType: 'post',
        'fields.slug': { in: ['my-post', 'another-post'] },
      },
    },
    {
      queryString:
        '%7B%22contentType%22%3A%22post%22%2C%22fields.slug%22%3A%7B%22in%22%3A%5B%22my-post%22%2C%22another-post%22%5D%7D%2C%22id%22%3A%2212345%22%2C%22language%22%3A%22en%22%7D',
      expectedResult: {
        contentType: 'post',
        'fields.slug': { in: ['my-post', 'another-post'] },
        id: '12345',
        language: 'en',
      },
    },
  ])('should return a parsed QueryParams when it feeds queryString=$queryString', ({ queryString, expectedResult }) => {
    // Arrange

    // Act
    const result = mapStringToQueryParams(queryString);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
