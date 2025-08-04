const product_data = [
  {
    category: "상의",
    brand: "Supreme",
    product: "슈프림 박스로고 후드티",
    price: "390,000",
  },
  {
    category: "하의",
    brand: "DIESEL",
    product: "디젤 트랙 팬츠",
    price: "188,000",
  },
  {
    category: "신발",
    brand: "Nike",
    product: "에어포스 1",
    price: "137,000",
  },
  {
    category: "패션잡화",
    brand: "Music&Goods",
    product: "빵빵이 키링",
    price: "29,000",
  },
];

const product_data_Table = document.getElementById("product_data_Table");
const categorySelect = document.getElementById("inlineFormSelectPref");
const productSearchInput = document.getElementById("productSearchInput");
const searchButton = document.getElementById("searchButton");
const darkModeToggle = document.getElementById("darkModeToggle");
const currentDateTimeEl = document.getElementById("currentDateTime");

// 현재 날짜와 시간
function updateDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const dateString = `${year}년 ${month}월 ${day}일 ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  currentDateTimeEl.innerHTML = dateString;
}

updateDateTime();
setInterval(updateDateTime, 1000);

// 다크 모드 버튼 클릭 시
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// 테이블에
function renderTable(dataToRender) {
  product_data_Table.innerHTML = "";
  if (dataToRender.length === 0) {
    const row = product_data_Table.insertRow();
    const cell = row.insertCell(0);
    cell.colSpan = 4;
    cell.textContent = "검색 결과가 없습니다.";
    cell.style.textAlign = "center";
  } else {
    dataToRender.forEach((item) => {
      const row = product_data_Table.insertRow();
      row.insertCell(0).innerHTML = item.category;
      row.insertCell(1).innerHTML = item.brand;
      row.insertCell(2).innerHTML = item.product;
      row.insertCell(3).innerHTML = item.price;
    });
  }
}

function applyFiltersAndRender() {
  const selectedCategory = categorySelect.value;
  const searchTerm = productSearchInput.value.toLowerCase().trim();

  const filteredData = product_data.filter((item) => {
    const matchesCategory = selectedCategory === "카테고리" || item.category === selectedCategory;
    const matchesSearchTerm = item.product.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearchTerm;
  });
  renderTable(filteredData);
}

searchButton.addEventListener("click", (event) => {
  event.preventDefault(); 
  applyFiltersAndRender();
});

categorySelect.addEventListener("change", () => {
  applyFiltersAndRender();
});

productSearchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); 
    applyFiltersAndRender();
  }
});

applyFiltersAndRender();