import '../App.css';

import Carousel from 'react-bootstrap/Carousel';


function Carousels(){
  return(
    <div className='MyCarousel'>
      <Carousel >
        <Carousel.Item>
          <img
            className="d-flex w-100"
            src="/images/local/CaroWomen.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-inline w-100"
            src="/images/local/CaroMen.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-inline w-100"
            src="/images/local/CaroKids.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
      
  )
}
export default Carousels;
