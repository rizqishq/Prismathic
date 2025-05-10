export const ICON = require("./images/icon.png");
export const PROFILE_PICTURE = require("./images/profile-picture.jpg");
export const HEADER_LOGIN_PAGE = require("./images/header-login-page.jpg");
export const HEADER_LOGIN_PAGE_2 = require("./images/header-login-page-2.jpg");
export const FOUNDATIONAL_MATH = require("./images/foundational-math.png");
export const COURSE_CALCULUS = require("./images/courses/advanced-math/AM-calculus.png");
export const FALLBACK_IMAGE = require("./images/icon.png");

const IMAGE_MAP = {
  "./images/icon.png": ICON,
  "./images/profile-picture.jpg": PROFILE_PICTURE,
  "./images/header-login-page.jpg": HEADER_LOGIN_PAGE,
  "./images/header-login-page-2.jpg": HEADER_LOGIN_PAGE_2,
  "./images/foundational-math.png": FOUNDATIONAL_MATH,
  "./images/courses/advanced-math/AM-calculus.png": COURSE_CALCULUS
};

export const safeRequireImage = (path) => {
  if (IMAGE_MAP[path]) {
    return IMAGE_MAP[path];
  } else {
    console.warn(`Failed to load image: ${path}`);
    return ICON;
  }
};
