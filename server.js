import express from "express";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('สวัสดีครับ workshop1 backend');
});

// 1. ปรับข้อมูลตั้งต้นเหลือ 3 รายการ (id 101-103) และมี category "computer" 2 รายการ
const equipment = [
    { id: 101, name: "คอมพิวเตอร์", quantity: 3, category: "computer" },
    { id: 102, name: "เมาส์", quantity: 22, category: "accessory" },
    { id: 103, name: "โน้ตบุ๊ก HP", quantity: 10, category: "computer" }
];

// 2. แก้ไขการกรอง category ให้ไม่สนตัวพิมพ์เล็ก-ใหญ่ และดักค่าว่าง (?category=)
app.get('/api/equipment', (req, res) => {
    const cat = req.query.category;
    const name = req.query.name;

    // กรณีส่ง ?category= มาแบบไม่มีค่า
    if (cat !== undefined && cat.trim() === '') {
        return res.status(400).json({
            message: 'กรุณาระบุ category ที่ต้องการค้นหา'
        });
    }

    let result = equipment;

    if (cat) {
        result = result.filter(
            item => item.category.toLowerCase() === cat.trim().toLowerCase()
        );
    }

    if (name) {
        result = result.filter(
            item => item.name.toLowerCase().includes(name.trim().toLowerCase())
        );
    }

    res.status(200).json(result);
});

// 3. เพิ่มการตรวจสอบ validation ของ name, quantity และคำนวณ id 104
app.post("/api/equipment", (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: 'ข้อมูลไม่ถูกต้อง'
        });
    }

    const { name, quantity, category } = req.body;

    // ตรวจสอบ name ห้ามว่าง
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            message: 'ชื่ออุปกรณ์ (name) ต้องไม่เป็นค่าว่าง'
        });
    }

    // ตรวจสอบ quantity ต้องเป็นตัวเลขและไม่ติดลบ
    if (typeof quantity !== 'number' || Number.isNaN(quantity) || quantity < 0) {
        return res.status(400).json({
            message: 'จำนวน (quantity) ต้องเป็นตัวเลขที่ไม่ติดลบ'
        });
    }

    // ตรวจสอบ category ห้ามว่าง
    if (typeof category !== 'string' || category.trim() === '') {
        return res.status(400).json({
            message: 'หมวดหมู่ (category) ต้องไม่เป็นค่าว่าง'
        });
    }

    // หา id ล่าสุดแล้วบวก 1 (จะได้ 104)
    const nextId = equipment.length > 0 ? Math.max(...equipment.map(item => item.id)) + 1 : 101;

    const newEquipment = {
        id: nextId,
        name: name.trim(),
        quantity: quantity,
        category: category.trim(),
    };

    equipment.push(newEquipment);
    res.status(201).json(newEquipment);
});

// 4. เปลี่ยน key จาก count เป็น total
app.get("/api/equipment/count", (req, res) => {
    res.status(200).json({ total: equipment.length });
});

app.get("/api/equipment/getNum", (req, res) => {
    res.status(200).json({ num: equipment.length });
});

// 5. เพิ่มการตรวจสอบ id ต้องเป็นตัวเลข (ถ้าส่ง /abc จะได้ 400)
app.get("/api/equipment/:id", (req, res) => {
    const idParam = req.params.id;
    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: 'รูปแบบ ID ไม่ถูกต้อง (ต้องเป็นตัวเลขจำนวนเต็ม)'
        });
    }

    const result = equipment.find(item => item.id === id);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({
            message: 'ไม่พบอุปกรณ์'
        });
    }
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// 6. Error-handling Middleware สำหรับดัก JSON รูปแบบผิด (คืนค่า 400 แทน 500)
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            message: 'รูปแบบ JSON ไม่ถูกต้อง'
        });
    }
    next(err);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});