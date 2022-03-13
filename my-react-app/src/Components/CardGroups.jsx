import '../App.css';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import {Link} from "react-router-dom";
function CardGroups(){
    return (
<CardGroup className='CardGroups'>
  <Card>
  <Link to = {`/productlist/men`} className='CardLink' >
  <Card.Img variant="top" src="/images/local/men.jpg" />
    <Card.Body>
      <Card.Title>Men</Card.Title>
      <Card.Text>
      </Card.Text>
    </Card.Body>
  </Link>
  </Card>
  <Card>
  <Link to = {`/productlist/women`} className='CardLink'>
  <Card.Img variant="top" src="/images/local/women.jpg" />
    <Card.Body>
      <Card.Title>Women</Card.Title>
      <Card.Text>
      </Card.Text>
    </Card.Body>
  </Link>
  </Card>
  <Card>
  <Link to = {`/productlist/kids`} className='CardLink'>
  <Card.Img variant="top" src="/images/local/kids.jpg" />
    <Card.Body>
      <Card.Title>Kids</Card.Title>
      <Card.Text>
      </Card.Text>
    </Card.Body>
  </Link>
  </Card>
</CardGroup>
    )
}

export default CardGroups;