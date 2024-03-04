import { lazy } from "react";

const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ "pages/Home").then((module) => ({
    default: module.default,
  }))
);

const NotFoundPage = lazy(() =>
  import(/* webpackChunkName: "NotFoundPage" */ "pages/NotFound").then(
    (module) => ({
      default: module.default,
    })
  )
);

export { HomePage, NotFoundPage };
