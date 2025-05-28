import express, { Request } from 'express';
import multer, { diskStorage } from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const PORT = 4000;
const SAVE_DIR = path.resolve(process.env.HOME!, 'Pictures');
fs.mkdirSync(SAVE_DIR, { recursive: true });

const upload = multer({
  storage: diskStorage({
    destination: (_, __, cb) => cb(null, SAVE_DIR),
    filename: (_, file, cb) => {
      const ts = Date.now();
      const ext = (file.originalname.match(/\.[a-z0-9]+$/i) || ['.jpg'])[0];
      cb(null, `${ts}_${file.originalname.replace(/\s+/g,'_')}${ext}`);
    }
  })
});
const app = express();
app.use(cors());                       // allow requests from the app

app.post('/api/upload', upload.single('file'), (req: Request & { file?: multer.File }, res) => {
  console.log('✅  Saved', req.file?.filename);
  res.json({ ok: true, filename: req.file?.filename });
});

app.listen(PORT, '0.0.0.0', () =>
  console.log(`📂  Server on http://0.0.0.0:${PORT}`)
); 