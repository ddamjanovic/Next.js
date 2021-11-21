import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Products = async() => {
  const res = await axios.get(
    "https://dl.dropboxusercontent.com/s/iebly5coc7dg8pe/miista-export.json",
    fetcher
  );

  if (!res) return <div>loading...</div>;

  const allProducts = res.data.data.allContentfulProductPage.edges;
  const productsWithId = allProducts.map((product) => ({...product, "id": uuidv4()}));
 
  return productsWithId;
};

export default Products;
