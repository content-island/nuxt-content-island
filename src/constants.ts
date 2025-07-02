const BASE_API_ROUTE = '/api/__content_island';

export const SERVER_API_ROUTES = {
  CONTENT: `${BASE_API_ROUTE}/content`,
  RAW_CONTENT: `${BASE_API_ROUTE}/raw-content`,
  CONTENT_LIST: `${BASE_API_ROUTE}/content-list`,
  RAW_CONTENT_LIST: `${BASE_API_ROUTE}/raw-content-list`,
  PROJECT: `${BASE_API_ROUTE}/project`,
};

const BASE_API_PATH = './runtime/server/api';

export const SERVER_API_PATHS = {
  CONTENT: `${BASE_API_PATH}/content.get`,
  RAW_CONTENT: `${BASE_API_PATH}/raw-content.get`,
  CONTENT_LIST: `${BASE_API_PATH}/content-list.get`,
  RAW_CONTENT_LIST: `${BASE_API_PATH}/raw-content-list.get`,
  PROJECT: `${BASE_API_PATH}/project.get`,
};
