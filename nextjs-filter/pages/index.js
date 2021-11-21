import ProductList from "../components/products/ProductList";
import ProductFilter from "../components/products/ProductFilter";
import {useEffect, useState} from 'react';
import Products from '../getProducts';
import Pagination from "material-ui-flat-pagination";
import Box from "@material-ui/core/Box";


function HomePage() {
    const [color, setColor] = useState([]);
    const [type, setType] = useState([]);
    const [price, setPrice] = useState(0);
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(12);
    const [pageCount, setPageCount] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    
    const getData = async() => {
        // Get all products
        const products  = await Products();
        setTotalProducts(products);
       
        const filteredProducts = [];
        for(let i=0 ; i < products.length ; i++) {
            // If filter by color is set, filter products, if not,continue
            if(color.length == 0 || (products[i].node.colorFamily && color.includes(products[i].node.colorFamily[0].name))) {
                // If filter by type is set, filter products, if not, continue
                if(type.length == 0 || products[i].node.categoryTags && i[0].node.categoryTags.some((e) => type.includes(e))){
                    // If price is set, filter products, if not, continue
                    if(price.length == 0 || (products[i].node.shopifyProductEu.variants.edges && products[i].node.shopifyProductEu.variants.edges[0].node.price > price[0] && products[i].node.shopifyProductEu.variants.edges[0].node.price < price[1]))
                    {
                           filteredProducts.push([products[i]]);
                    }
                 
            }    
        }
        console.log(filteredProducts);
        if(filteredProducts.length > 0) {
            setPagination(filteredProducts);
        } 
        else
        setPagination(products);
    }
     
        //If only filter is color
        if(color.length > 0 && type.length == 0 && price.length == 0) {
            const filterByColor = products.filter((item) => item.node.colorFamily && color.includes(item.node.colorFamily[0].name))
            setPagination(filterByColor);
        }
        //If only filter is category
        else if(type.length > 0 && color.length == 0 && price.length == 0) {
            const filterByType = products.filter((item) => item.node.categoryTags && item.node.categoryTags.some((e) => type.includes(e)))
            setPagination(filterByType);
        }
        //If only filter is price
        else if(price.length > 0 && color.length == 0 && type.length == 0){
            const filterByPrice = products.filter((item) => (item.node.shopifyProductEu.variants.edges && item.node.shopifyProductEu.variants.edges[0].node.price > price[0] && item.node.shopifyProductEu.variants.edges[0].node.price < price[1]))
            setPagination(filterByPrice);
        }
        //If filters are color and category
        else if(color.length > 0 && type.length > 0 && price.length == 0){
            const filterByBoth = products.filter((item) => (item.node.colorFamily && color.includes(item.node.colorFamily[0].name)) &&
            (item.node.categoryTags && item.node.categoryTags.some((e) => type.includes(e))))
            setPagination(filterByBoth);
        }
        //If filters are color and price
        else if(color.length > 0 && type.length == 0 && price.length > 0){
            const filterByBoth = products.filter((item) => (item.node.colorFamily && color.includes(item.node.colorFamily[0].name)) &&
            (item.node.shopifyProductEu.variants.edges && item.node.shopifyProductEu.variants.edges[0].node.price > price[0] && item.node.shopifyProductEu.variants.edges[0].node.price < price[1]))
            setPagination(filterByBoth);
        }
          //If filters are category and price
        else if(color.length == 0 && type.length > 0 && price.length > 0){
            const filterByBoth = products.filter((item) => (item.node.categoryTags && item.node.categoryTags.some((e) => type.includes(e))) &&
            (item.node.shopifyProductEu.variants.edges && item.node.shopifyProductEu.variants.edges[0].node.price > price[0] && item.node.shopifyProductEu.variants.edges[0].node.price < price[1]))
            setPagination(filterByBoth);
        }
        //If all filters are included
        else if(color.length > 0 && type.length > 0 && price.length > 0){
            const filterByAll = products.filter((item) => (item.node.colorFamily && color.includes(item.node.colorFamily[0].name)) && (item.node.categoryTags && item.node.categoryTags.some((e) => type.includes(e))) &&
            (item.node.shopifyProductEu.variants.edges && item.node.shopifyProductEu.variants.edges[0].node.price > price[0] && item.node.shopifyProductEu.variants.edges[0].node.price < price[1]))
            setPagination(filterByAll);
        }
        //If no filter
        else setPagination(products);

    }
    const filterChangeHandler = (filter) => {
        if(filter.name == 'color')
        {setColor(filter.value);}
        else if(filter.name == 'type')
        {setType(filter.value)}
        else setPrice(filter.value);
     
    }
    const setPagination = (data) => {
        // Slice products per pages
        const slice = data.slice(offset, offset + perPage);
        setData(slice);
        setPageCount(Math.floor(data.length / perPage));
        setTotalProducts(data.length);
    }

    useEffect(async() => {
       window.scrollTo({ behavior: 'smooth', top: '0px' });
       await getData();
       
    },[offset, color, type, price]);
    
  return <div> <ProductFilter color ={color} type={type} price={price} onChangeFilter={filterChangeHandler} rangeSelector={filterChangeHandler}/>
     <ProductList products={data}/>
     <div style={{justifyContent: "center",
    display: "flex"}}>
        <Pagination
          color="primary" 
          limit={totalProducts/pageCount}
          offset={offset}
          total={totalProducts}
          onClick={(e,offset) => setOffset(offset)} />
   </div>

   
    </div>
}

export default HomePage;
