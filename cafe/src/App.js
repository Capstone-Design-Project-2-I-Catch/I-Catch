import { useState } from 'react';
import logo from './logo_1.png'; 
import data from './data.js';
import { Navbar, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function App() {

  let [shoes] = useState(data);
  let [ids] = useState([0, 1, 2, 3, 4, 5]);
  let [제품수, 제품수변경] = useState([0, 0, 0, 0, 0, 0]);
  let [장바구니상품, set장바구니상품] = useState([]);

  const handleAddToCart = (index) => {
    const alreadyInCart = 장바구니상품.findIndex(item => item.id === shoes[index].id);
    if (alreadyInCart !== -1) {
      // 이미 장바구니에 있는 경우 해당 상품의 수만 증가
      const new장바구니상품 = [...장바구니상품];
      new장바구니상품[alreadyInCart].count++;
      set장바구니상품(new장바구니상품);
    }
    else {
      // 장바구니에 없는 경우 새로 추가
      set장바구니상품([...장바구니상품, { ...shoes[index], count: 1 }]);
    }
    
    // 해당 제품 수를 1 증가시킴
    let new제품수 = [...제품수];
    new제품수[index]++;
    제품수변경(new제품수);
  };

  const handleIncreaseQuantity = (index) => {
    const new장바구니상품 = [...장바구니상품];
    new장바구니상품[index].count++;
    set장바구니상품(new장바구니상품);
  };

  const handleDecreaseQuantity = (index) => {
    const new장바구니상품 = [...장바구니상품];
    new장바구니상품[index].count--;
    if (new장바구니상품[index].count === 0) {
      // 수량이 0이 되면 해당 상품을 장바구니에서 제거
      new장바구니상품.splice(index, 1);
    }
    set장바구니상품(new장바구니상품);
  };

  return (
    <div className="app">
    <Navbar className='bar'>
      <Container>
        <Navbar.Brand className='nav ibm-plex-sans-kr-bold' href="#home">
          <img className='d-inline-block'
              alt=""
              src={logo}
              width="40"
              height="40"
            />
            I-Catch
          </Navbar.Brand>
        <Navbar.Brand className='nav ibm-plex-sans-kr-bold' href="#home">
          장바구니
        </Navbar.Brand>
      </Container>
    </Navbar>

      <div className="content">
        <div className="menu">
          <Container>
            <Row Row md={3}>
                {shoes.slice(0, 3).map((shoe, i) => (
                  <Card key={ids[i]} shoes={shoe} index={i} onAddToCart={handleAddToCart} count={제품수[i]} />
                ))} 
            </Row>
          </Container>
          <Container>
            <Row Row md={3} className='row2'>
                {shoes.slice(3, 6).map((shoe, i) => (
                  <Card key={ids[i + 2]} shoes={shoe} index={i + 3} onAddToCart={handleAddToCart} count={제품수[i + 3]} />
                ))} 
            </Row>
          </Container>
        </div>
        <div className="cart">
          {장바구니상품.map((product, index) => (
            <div className='list' key={index}>
              <div>
                <p className='title ibm-plex-sans-kr-bold'>{product.title}</p>
                <p className='price ibm-plex-sans-kr-regular '>{product.price}</p>
              </div>
              <div>
                <p className='total ibm-plex-sans-kr-semibold'>
                  <button onClick={() => handleDecreaseQuantity(index)}>
                    <FontAwesomeIcon icon={faMinus} size="3x" style={{color: "#003731"}} />
                  </button>
                  <h className='cnt ibm-plex-sans-kr-bold'>
                    { product.count }
                  </h>
                  <button onClick={() => handleIncreaseQuantity(index)}>
                    <FontAwesomeIcon icon={faPlus} size="3x" style={{color: "#003731"}} />
                  </button>
                </p>
              </div>
            </div>
           ))}
          </div>
      </div>
      <button className="pay ibm-plex-sans-kr-bold">결제하기</button>  
    </div>
  );
}

export default App;

function Card({ shoes, index, onAddToCart }) {
  // 담기 버튼 클릭 시 제품 수 증가 함수 호출
  const handleClick = () => {
    onAddToCart(index);
  };

  return (
    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
      <img src="https://codingapple1.github.io/shop/shoes1.jpg" alt={shoes.title}  style={{ width: '240px' }} />
      <div style={{ textAlign: 'left', width: '200px' }}> 
        <h4 className='title ibm-plex-sans-kr-bold' style={{ marginTop: '10px' }}>{shoes.title}</h4> {/* 왼쪽 여백을 제거하여 왼쪽 끝에서 시작 */}
        <p className='price ibm-plex-sans-kr-semibold'>{shoes.price}</p> 
      </div>
      <button className="btn ibm-plex-sans-kr-bold" style={{ width: '240px', alignItems: 'center', padding: '10px' }} onClick={handleClick}> 담기 </button>
    </div>
  );
}
