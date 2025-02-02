import { productdetails } from "./type";

export const handleFiltration = (
  arr: productdetails[] | undefined,
  origin: productdetails[] | undefined,
  selections: { category: string; min_price: number; max_price: number },
  setProduct: (items: productdetails[]) => void
) => {
  console.log("running");
  if (!arr || !origin) return;
  const copyArray = [...arr];

  if (
    selections.category &&
    selections.min_price === 0 &&
    selections.max_price === 1000
  ) {
    const product = copyArray.filter(
      (item) => item.category === selections.category
    );
    setProduct(product.length > 0 ? product : origin);
  } else if (
    !selections.category &&
    selections.min_price >= 0 &&
    selections.max_price <= 1000
  ) {
    const product = copyArray.filter(
      (item) =>
        item.price >= selections.min_price && item.price <= selections.max_price
    );
    setProduct(product.length > 0 ? product : origin);
  } else if (
    selections.category &&
    selections.min_price >= 0 &&
    selections.max_price <= 1000
  ) {
    const product = copyArray.filter(
      (item) =>
        item.category === selections.category &&
        item.price >= selections.min_price &&
        item.price <= selections.max_price
    );
    setProduct(product.length > 0 ? product : origin);
  }
};
