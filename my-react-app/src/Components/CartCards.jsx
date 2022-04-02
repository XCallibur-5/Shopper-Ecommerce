import '../App.css';
function CartCards(props){
  //console.log(props.Item);
  return (
    <div className='CartCard'>
      <img src='/images/socials/facebook.png' alt='ProductImage' className='CartImg'/>
      <div className='CartDescription'>
        <h4>{props.Item}  </h4>
        <p>Size </p>
      </div>

      <div className='CartInput'>
        <p> </p>
        <p>Total $ 55 <span>St</span></p>
        <a href='/'>Remove</a>
      </div>
      <hr />
    </div>
      
)
}


export default CartCards;