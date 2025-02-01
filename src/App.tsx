import React, { useCallback, useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";

import { productdetails } from "./utils/type";

import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductDetails } from "./pages/ProductDetails";
import { Gallery } from "./pages/Gallery";

const App = () => {
  const fetchdata = async (): Promise<productdetails[]> => {
    const request = await fetch("https://fakestoreapi.com/products");
    if (!request.ok)
      throw new Error("There was an error with your Request,Try Again!!!");
    return await request.json();
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchdata(),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
  const [ProductItems, setProductItems] = useState<
    productdetails[] | undefined
  >(undefined);
  const [originalProducts, setOriginalProducts] = useState<productdetails[]>(
    []
  );

  useEffect(() => {
    if (data) {
      setProductItems(data);
      setOriginalProducts(data);
    }
  }, [data]);

  useEffect(() => {
    console.log(ProductItems);
  }, [ProductItems]);

  const setProduct = useCallback((items: productdetails[]) => {
    setProductItems(items);
  }, []);

  return (
    <BrowserRouter>
      <NavBar arr={originalProducts} setproduct={setProduct} />
      <Routes>
        <Route
          path="/"
          element={
            <Gallery
              loading={isLoading}
              error={error}
              isError={isError}
              ProductItems={ProductItems}
              setProduct={setProduct}
              data={data}
            />
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/own" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
