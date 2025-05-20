enum CookieKeys {
  IS_AUTHENTICATED = "isAuthenticated",
  USER_NAME = "username",
  TOKEN = "token"
}

enum FormLabelPosition {
  TOP = "top",
  LEFT = "left",
  RIGHT = "right",
}

enum MediaScreen {
  LARGE_DESKTOP = "1200px",
  DESKTOP = "1200px",
  TABLET = "992px",
  MOBILE = "768px",
}

enum ErrorStatus {
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    BAD_REQUEST = 400,
    SERVICE_UNAVAILABLE = 503,
    TIMEOUT = 408,
}

enum ErrorAxios {
    ECONNABORTED = "ECONNABORTED",
    ERR_NETWORK = "ERR_NETWORK"
}

export { CookieKeys, FormLabelPosition, MediaScreen, ErrorStatus, ErrorAxios }