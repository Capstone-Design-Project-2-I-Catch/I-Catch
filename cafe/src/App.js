import { useState } from 'react';
import logo from './logo_1.png';
import data from './data.js';
import { Navbar, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function App() {
  let [shoes] = useState(data);
  let [ids] = useState([0, 1, 2, 3, 4, 5]);
  let [제품수, 제품수변경] = useState([0, 0, 0, 0, 0, 0]);
  let [장바구니상품, set장바구니상품] = useState([]);
  let [showPopup, setShowPopup] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [Img] = useState(["/assets/1.png", "/assets/2.png", "/assets/3.png", "/assets/4.png", "/assets/5.png", "/assets/6.png"])

  const handleAddToCart = (index) => {
    const alreadyInCart = 장바구니상품.findIndex(item => item.id === shoes[index].id);
    if (alreadyInCart !== -1) {
      // 이미 장바구니에 있는 경우 해당 상품의 수만 증가
      const new장바구니상품 = [...장바구니상품];
      new장바구니상품[alreadyInCart].count++;
      new장바구니상품[alreadyInCart].totalPrice += shoes[index].price;
      set장바구니상품(new장바구니상품);
    }
    else {
      // 장바구니에 없는 경우 새로 추가
      set장바구니상품([...장바구니상품, { ...shoes[index], count: 1, totalPrice: shoes[index].price }]);
    }
    
    // 해당 제품 수를 1 증가시킴
    let new제품수 = [...제품수];
    new제품수[index]++;
    제품수변경(new제품수);
  };

  const handleIncreaseQuantity = (index) => {
    const new장바구니상품 = [...장바구니상품];
    new장바구니상품[index].count++;
    new장바구니상품[index].totalPrice += new장바구니상품[index].price;
    set장바구니상품(new장바구니상품);
  };

  const handleDecreaseQuantity = (index) => {
    const new장바구니상품 = [...장바구니상품];
    new장바구니상품[index].count--;
    new장바구니상품[index].totalPrice -= new장바구니상품[index].price;
    if (new장바구니상품[index].count === 0) {
      // 수량이 0이 되면 해당 상품을 장바구니에서 제거
      new장바구니상품.splice(index, 1);
    }
    set장바구니상품(new장바구니상품);
  };

  let handleButtonClick = () => {
    setShowPopup(true);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    set장바구니상품([]);
  }

  let 총수량 = 장바구니상품.reduce((acc, cur) => acc + cur.count, 0);
  let 총가격 = 장바구니상품.reduce((acc, cur) => acc + cur.totalPrice, 0);

  return (
    <div className="app">
      <Navbar className='bar'>
        <Container className='ibm-plex-sans-kr-bold'>
          <Navbar.Brand className='nav1' href="#home">
            <img className='d-inline-block'
                alt=""
                src={logo}
                width="50"
                height="50"
              />
              I-Catch
            </Navbar.Brand>
          <Navbar.Brand className='nav2' href="#home">
            장바구니
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className='area'>
        <div className="content">
          <div className="menu">
            <Container>
              <Row Row md={3}>
                  {shoes.slice(0, 3).map((shoe, i) => (
                    <Card key={ids[i]} shoes={shoe} Img={Img} index={i} onAddToCart={handleAddToCart} count={제품수[i]} />
                  ))} 
              </Row>
            </Container>
            <Container>
              <Row Row md={3} className='row2'>
                  {shoes.slice(3, 6).map((shoe, i) => (
                    <Card key={ids[i + 2]} shoes={shoe} Img={Img} index={i + 3} onAddToCart={handleAddToCart} count={제품수[i + 3]} />
                  ))} 
              </Row>
            </Container>
          </div>
          <div className="cart">
            {장바구니상품.map((product, index) => (
              <div className='list' key={index}>
                <div>
                  <p className='title ibm-plex-sans-kr-bold'>{product.title}</p>
                  <p className='price ibm-plex-sans-kr-regular '>{product.totalPrice}원</p>
                </div>
                <div>
                  <p className='item ibm-plex-sans-kr-semibold'>
                    <button className='minus' onClick={() => handleDecreaseQuantity(index)}>
                      <FontAwesomeIcon icon={faMinus} size="3x" style={{color: "#003731"}} />
                    </button>
                    <h className='cnt ibm-plex-sans-kr-bold'>
                      { product.count }
                    </h>
                    <button className='plus' onClick={() => handleIncreaseQuantity(index)}>
                      <FontAwesomeIcon icon={faPlus} size="3x" style={{color: "#003731"}} />
                    </button>
                  </p>
                </div>
              </div>
            ))}
            {총수량 > 0 && (
              <div className='total-info'>
                <p className='total-count ibm-plex-sans-kr-bold'>
                  총<span style={{ color: "#00a693", marginLeft: "5px"}}>{총수량}</span>건
                </p>
                <p className='total-price ibm-plex-sans-kr-bold'>
                  <span style={{ color: "#007B6D"}}>{총가격}</span>원
                </p>
              </div>
            )}
                    <div className='nav'>
          <button className="pay ibm-plex-sans-kr-bold" onClick={handleButtonClick}>결제하기</button>
          {showModal && (
            <Modal onClose={handleCloseModal}>
              <div className="popup">
                <div className="popup-content">
                  <h2>결제 완료</h2>
                  <button className="close ibm-plex-sans-kr-semibold" onClick={handleCloseModal}>닫기</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

function Card({ shoes, Img, index, onAddToCart }) {
  // 담기 버튼 클릭 시 제품 수 증가 함수 호출
  const handleClick = () => {
    onAddToCart(index);
  };

  return (
    <div className="col-md-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  marginTop: '10px' }}>
      <img src={Img[index]} style={{ width: '230px' }} />
      <div style={{ textAlign: 'left', width: '220px' }}> 
        <h4 className='title ibm-plex-sans-kr-bold' style={{ marginTop: '10px' }}>{shoes.title}</h4> {/* 왼쪽 여백을 제거하여 왼쪽 끝에서 시작 */}
        <p className='price ibm-plex-sans-kr-semibold'>{shoes.price}원</p> 
      </div>
      <button className="btn ibm-plex-sans-kr-bold" style={{ width: '230px', alignItems: 'center'}} onClick={handleClick}> 담기 </button>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}