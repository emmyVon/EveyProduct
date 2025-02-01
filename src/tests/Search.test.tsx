import { Search } from "../components/Search";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const mockProducts = [
  {
    category: "men's clothing",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    rating: { rate: 3.9, count: 120 },
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  },
  {
    category: "men's clothing",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    rating: { rate: 3.9, count: 120 },
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  },
];
const mockstateUpadate = jest.fn();
describe("Search component", () => {
  //   test("Get all Products if no Match", () => {

  //     render(
  //       <Search delay={2000} arr={mockProducts} setproduct={mockstateUpadate} />
  //     );

  test("calls setproduct with filtered results when typing in search input", async () => {
    render(<Search arr={mockProducts} setproduct={mockstateUpadate} />);

    // Simulate typing into the search input
    fireEvent.change(screen.getByPlaceholderText("Search Anything"), {
      target: { value: "Fjallraven" },
    });

    // Wait for debounce delay (500ms by default)

    await waitFor(() => {
      expect(mockstateUpadate).toHaveBeenCalledWith(mockProducts); // Correct assertion
    });
  });
});
