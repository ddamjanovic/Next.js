import Card from '../ui/Card';
import classes from './ProductItem.module.css';
import { Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductItem(props) {
  return (
      <div className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <Row className={classes.content}>
          <Col xs="6" className={classes.name}>{props.title}</Col>
          <Col className={classes.price}>{props.price}</Col>
        </Row>
      </Card>
      </div>
 
  );
}

export default ProductItem;