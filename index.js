const express = require('express');

// gán lại hàm cho một biến mới
const app = express();
// cho phép server backend đọc được chuỗi json
// middleware
app.use(express.json());

//cấp phép cho front end truy cập server API BE
const cors = require('cors');
app.use(cors());

// khởi tạo server bằng Express
// port: địa chỉ định danh server
app.listen(8080);

const rootRoute = require('./src/routes/rootRoute');
app.use("/api",rootRoute)
