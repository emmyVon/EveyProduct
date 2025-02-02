import { productdetails } from "../utils/type";
import { Product } from "../components/Product";

interface GalleryProps {
  loading: boolean;
  isError: boolean;
  error: Error | null;
  ProductItems: productdetails[] | undefined;
  setProduct: (items: productdetails[]) => void;
  data: productdetails[] | undefined;
}
export const Gallery = ({
  loading,
  isError,
  error,
  ProductItems,
}: GalleryProps) => {
  if (loading)
    return (
      <p className="h-[90vh] text-white opacity-80 grid place-items-center w-screen font-bold text-2xl">
        Loading...
      </p>
    );

  if (isError)
    return (
      <div className="h-[90vh] grid text-white place-items-center w-screen">
        <div>
          <h3 className="font-bold text-2xl ">Error fetching data</h3>
          <p className="opacity-80 ">
            {error?.message} <span>check your connection and try again</span>
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-800 min-h-screen w-screen">
      <div className="container flex flex-col gap-3 w-full">
        <h2 className="h-10 text-center font-semibold text-xl text-white bg-gray-500">
          Product Inventory
        </h2>
        {/* <Filter arr={ProductItems} setproduct={setProduct} origin={data} /> */}
        <div className=" grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] w-full justify-center gap-4">
          {ProductItems?.map((product) => (
            <Product {...product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
