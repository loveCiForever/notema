// Danh sách các màu có thể sử dụng
const COLORS = ["yellow", "blue", "green", "pink", "purple", "orange", "teal", "indigo"];

// Hàm lấy màu ngẫu nhiên
export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};

// Hàm lấy màu dựa trên id (để đảm bảo cùng một note luôn có cùng màu) Hàm này đỉnh vcb =))
export const getColorById = (id) => {
  // Tính tổng mã ASCII của các ký tự trong id
  const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // Lấy màu dựa trên phần dư khi chia cho số lượng màu
  return COLORS[sum % COLORS.length];
};

export default {
  getRandomColor,
  getColorById
};