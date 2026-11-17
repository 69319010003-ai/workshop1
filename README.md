# Workshop 1 Backend - Equipment API

ระบบ API สำหรับจัดการข้อมูลอุปกรณ์ (Equipment) พัฒนาด้วย Node.js และ Express

## ตารางสรุป API Endpoints

| Method | Endpoint | คำอธิบาย | ตัวอย่าง Query / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | หน้าแรกของเซิร์ฟเวอร์ | - |
| `GET` | `/api/equipment` | ดึงรายการอุปกรณ์ทั้งหมด หรือกรองตามหมวดหมู่/ชื่อ | `?category=computer` หรือ `?name=เมาส์` |
| `GET` | `/api/equipment/count` | นับจำนวนรายการอุปกรณ์ทั้งหมด | - |
| `GET` | `/api/equipment/:id` | ดึงข้อมูลอุปกรณ์ตามรหัส ID | `/api/equipment/101` |
| `POST` | `/api/equipment` | เพิ่มรายการอุปกรณ์ใหม่ | `{"name": "คีย์บอร์ด", "quantity": 5, "category": "accessory"}` |
| `GET` | `/api/health` | ตรวจสอบสถานะการทำงานของเซิร์ฟเวอร์ | - |