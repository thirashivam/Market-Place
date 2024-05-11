import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import HomePage from "./HomePage";
import ProductDetailPage from "./ProductDetailPage";

const index: React.FC = () => {
  return (

      <Router>
        <HomePage path="/" />
        <ProductDetailPage path="/product/:productId" />
      </Router>

  );
};

export default index;