import ProductItem from './ProductItem';
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function ProductList(props) {
 
  return (
    <Container>
       <Row> {props.products.map((product) => (
         <Col xs="3">
           <ProductItem
          key={product.id}
          tags={product.node.categoryTags}
          title={product.node.name}
          image={product.node.thumbnailImage.file.url}
          price = {product.node.shopifyProductEu.variants.edges[0].node.price + "$"} 
           />
         </Col>
       ))}
       </Row>
    </Container>



  );
}

export default ProductList;