import { useState } from "react";
import Select from "@material-ui/core/Select";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import { Row, Col } from "reactstrap";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  inputLabel: {
    color: "#ddbc03"
  },
  rootSelect: {
    '&:before': {
      color: "#ddbc03",
      borderBottom: "2px solid #ddbc03"
    },
    '&:after': {
      color: "#ddbc03",
      borderBottom: "2px solid #ddbc03"
    },
    padding: "4px 0px",
  },
  firstBox: {
    marginLeft: "85px",
    width: "200px"
  },
  secondBox: {
    marginLeft: "30px",
    width: "200px"
  },
  thirdBox: {
    marginLeft: "10px",
    marginTop:"10px",
    width: "300px"
  },
  typography:{
    marginLeft: "90px",
    marginTop: "10px",
    color: "#ddbc03"
  },
  range: {
    color: "#3f51b5",
    marginLeft: "10px"
  },
  rail: {
    background: "black"
  },
  thumb: {
    background: "#ddbc03"
  }
}));




const ProductFilter = (props) => {

  const classes = useStyles();
  const colors = ["Yellow", "Brown", "White", "Black", "Green", "Natural", "Orange", "Blue"];
  const types = ["Bags","Mid-Heels", "Flats", "Ballerinas", "Sneackers", "Sandals", "Boots", "Ankle Boots", "Tall Boots", "Outlet"];
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [price, setSelectedPrice] =  useState([100,400]);

  const onChangeHandler = (event) => {
    const {
      target: { value, name , role},
    } = event;
    if (event.target.name == "color") {
      setSelectedColor(typeof value === "string" ? value.split(",") : value);
      props.onChangeFilter({name: name, value: value});
    } else if (event.target.name == "type") {
      setSelectedType(typeof value === "string" ? value.split(",") : value);
      props.onChangeFilter({name: name, value: value});
    }
  };
  const rangeSelector = (event, newValue) => {
    console.log(newValue);
    setSelectedPrice(newValue);
    props.onChangeFilter({name: "price", value: price});
  };
  

  return (
    <div className="product-filter">
      <Row>
          <Col xs="4"> 
          <Box className={classes.firstBox}>
              <FormControl className={classes.formControl}>
              <InputLabel className={classes.inputLabel} id="select-color">Color</InputLabel>
              <Select
            multiple
            labelId="select-color"
            id="demo-simple-select"
            value={selectedColor}
            label="Color"
            name="color"
            onChange={onChangeHandler}
            classes={{ root: classes.rootSelect }}
          >
            {colors.map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
              </Select>
             </FormControl>
            </Box></Col>
          <Col xs="4">
          <Box className={classes.secondBox}>
          <FormControl className={classes.formControl}>
          <InputLabel className={classes.inputLabel}id="select-type">Category</InputLabel>
          <Select
            multiple
            labelId="select-type"
            id="select-type"
            value={selectedType}
            label="Category"
            name="type"
            onChange={onChangeHandler}
            classes={{ root: classes.rootSelect }}
          >
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          </Box>
          </Col>
          </Row>
          <Row>
          <Col xs="2" className={classes.typography}>
            <Typography id="range-slider" gutterBottom variant='subtitle1'>
        Select Price Range:
          </Typography>
          </Col>
          <Col xs="4">
         <Box className={classes.thirdBox}>
         <Slider
        size="small"
        name="price"
        value={price}
        onChange={rangeSelector}
        min={50}
        max={600}
        step={50}
        classes={{
          thumb: classes.thumb,
          rail: classes.rail,
          track: classes.track
        }}
       
         />
         </Box>
         <span className={classes.range} > Selected: {price[0]}€ - {price[1]}€ </span>
        </Col>
        </Row>
      
    </div>
  );
};

export default ProductFilter;
