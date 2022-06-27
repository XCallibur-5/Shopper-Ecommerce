import '../App.css';
import {Link} from "react-router-dom";

function Cards(item){
  //console.log(item);
  return (
    <div className='ProductCard'>
    <Link to={"/product/"+item.item._id} className='CardLink'>
    <img src={item.item.img} alt={item.item.img} className='ProductCardImg' />
      <div className='ProductDescription'>
        <h5>{item.item.title}</h5>
      </div>
      <div className='ProductPrice'>
        <p>₹ {item.item.price} <span></span></p>
      </div>
    </Link>
    
    </div>  
)
}
export default Cards;