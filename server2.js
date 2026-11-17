import express from "express";

const app = express();
const PORT = 7000; 

app.get('/', (req, res) => {
    res.send('สวัสดีครับ workshop1 backend Project ที่ 1');
});

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
    });
});

app.get('/api/formula1', (req, res) => {
    const x = parseFloat(req.query.x);
    const y = parseFloat(req.query.y);
    
    if (isNaN(x) || isNaN(y)) {
        return res.status(400).json({ 
            error: 'กรุณาส่งค่า x และ y เป็นตัวเลขผ่าน Query' 
        });
    }
    
    const distant = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    
    res.json({
        endpoint: '/api/formular1',
        topic: 'เรขาคณิตวิเคราะห์',
        inputs: { x, y },
        formula: 'd = sqrt(x^2 + y^2)',
        result: distant,
    });
});

app.get('/api/formula2/:n/:r', (req, res) => {
    const n = parseFloat(req.params.n);
    const r = parseFloat(req.params.r);

    if (isNaN(n) || isNaN(r)) {
        return res.status(400).json({
             error: 'กรุณาส่งค่า n และ r ใน Path เป็นตัวเลข' 
            });
    }

    const a1 = 2;  
    const an = a1 * Math.pow(r, n - 1);

    res.json({
        endpoint: '/api/formula2',
        topic: 'ลำดับเรขาคณิต',
        inputs: { n, r, a1_default: a1 },
        formula: 'an = a1 * r^(n - 1)',
        result: an
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});