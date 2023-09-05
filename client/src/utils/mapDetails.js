// 펀딩 내역 매핑 함수
const mapFundingDetails = (data) =>
  data.map((item) => ({
    fundingDate: new Date(item.fundingDate).toLocaleDateString("ko-KR"),
    title: item.title,
    quantity: item.quantity,
  }));

// 주문 내역 매핑 함수
const mapOrderDetails = (data) =>
  data.map((item) => ({
    createdAt: new Date(item.createdAt).toLocaleDateString("ko-KR"),
    title: item.orderSells.map((sell) => sell.title),
    quantity: item.orderSells.map((sell) => sell.quantity),
    price: item.orderSells.map((sell) => sell.price),
  }));

// 펀딩 등록 내역 매핑 함수
const mapUpcyclingDetails = (data) =>
  data.map((item) => ({
    createdAt: new Date(item.createdAt).toLocaleDateString("ko-KR"),
    title: item.title,
    deadline: new Date(item.deadline).toLocaleDateString("ko-KR"),
  }));

// 제품 등록 내역 매핑 함수
const mapSellsDetails = (data) =>
  data.map((item) => ({
    createdAt: new Date(item.createdAt).toLocaleDateString("ko-KR"),
    title: item.title,
    price: item.price,
  }));

export {
  mapFundingDetails,
  mapOrderDetails,
  mapUpcyclingDetails,
  mapSellsDetails,
};
