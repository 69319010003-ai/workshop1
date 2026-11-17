import express from "express";

const app = express();
app.use(express.json());
const PORT = 5000;

app.get('/', (req, res) => {
     res.send('ยินดีต้อนรับสู่ server3');
});

 
const students = [
  {
    stdId: "69319010001",
    stdName: "เวฟ",
    class: "ส1/1",
  },

  {
    stdId: "69319010002",
    stdName: "เอ๋ย",
    class: "ส1/1",
  },

 {
    stdId: "69319010003",
    stdName: "ปลื้ม",
    class: "ส1/1",
  },

  {
    stdId: "69319010004",
    stdName: "เครป",
    class: "ส1/1",
  },

  {
    stdId: "69319010005",
    stdName: "ไผ่",
    class: "ส1/1",
  },

  {
    stdId: "69319010016",
    stdName: "โน้ต",
    class: "ส1/1",
  },

  {
    stdId: "69319010017",
    stdName: "อิม",
    class: "ส1/1",
  },

   {
    stdId: "69319010025",
    stdName: "มิ้ว",
    class: "ส1/1",
  },

   {
    stdId: "69319010026",
    stdName: "คลีม",
    class: "ส1/1",
  },

   {
    stdId: "69319010028",
    stdName: "นิว",
    class: "ส1/1",
  },

   {
    stdId: "69319010031",
    stdName: "หมู",
    class: "ส1/2",
  },
  
];

 
app.get("/api/getStudent", (req, res) => {
  const reqClass = req.query.class;

  if (reqClass) {
    const result = students.filter((item) => item.class === reqClass);
    return res.status(200).json(result);
  }

  res.status(200).json(students);
});

 
app.get("/api/getStudent/count", (req, res) => {
  res.status(200).json({ count: students.length });
});

 
app.get("/api/getStudent/:stdId", (req, res) => {
  const { stdId } = req.params;
  const student = students.find((item) => item.stdId === stdId);

  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404).json({
      message: "ไม่พบรายชื่อนักเรียน",
    });
  }
});

 
app.post("/api/student", (req, res) => {
  const { stdId, stdName, class: studentClass } = req.body;

 
  if (!stdId || stdId.toString().length !== 11) {
    return res.status(400).json({
      message: "ข้อมูลไม่ถูกต้อง: stdId ต้องมี 11 ตัวอักษร",
    });
  }

  if (!stdName || !studentClass) {
    return res.status(400).json({
      message: "ข้อมูลไม่ถูกต้อง: กรุณากรอก stdName และ class ให้ครบถ้วน",
    });
  }

  const newStudent = {
    stdId: stdId.toString(),
    stdName: stdName,
    class: studentClass,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});


app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});