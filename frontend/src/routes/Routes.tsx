import { BrowserRouter, Routes as ParentRoute, Route } from "react-router-dom";

import { PublicLayout } from "layout";
import { HomePage, NotFoundPage } from "routes/components";

type Props = {};

const Routes = (props: Props) => {
  return (
    <BrowserRouter>
      <ParentRoute>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </ParentRoute>
    </BrowserRouter>
  );
};

export default Routes;
