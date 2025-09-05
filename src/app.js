import express from 'express';
import cors from 'cors';
import { adicionarRotas } from './rotas.js';

const api = express();

api.use(express.json());
api.use(cors());

adicionarRotas(api);

api.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

api.listen(5030, () => console.log('API Vendas subiu com sucesso!'));
