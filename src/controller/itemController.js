import express from 'express';
import * as repo from '../repositories/itemRepository.js';

const endpoint = express.Router();

endpoint.get('/item', async (req, res) => {
    try {
        const itens = await repo.listarItens();
        res.json(itens);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar itens' });
    }
});

endpoint.get('/item/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const item = await repo.consultarItem(id);
        if (!item) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao consultar item' });
    }
});

endpoint.get('/item/filtro/nome', async (req, res) => {
    try {
        const nome = req.query.nome;
        const itens = await repo.filtrarItem(nome);
        res.json(itens);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao filtrar itens' });
    }
});

endpoint.post('/item', async (req, res) => {
    try {
        const novoItem = req.body;
        const id = await repo.adicionarItem(novoItem);
        res.status(201).json({ newId: id });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar item' });
    }
});

endpoint.put('/item/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const novosDados = req.body;
        await repo.alterarItem(id, novosDados);
        res.json({ message: 'Item atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar item' });
    }
});

endpoint.delete('/item/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await repo.removerItem(id);
        res.json({ message: 'Item removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover item' });
    }
});

endpoint.patch('/item/:id/entrada', async (req, res) => {
    try {
        const id = req.params.id;
        const { quantidade } = req.body;
        await repo.registrarEntrada(id, quantidade);
        res.json({ message: 'Entrada registrada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar entrada' });
    }
});

endpoint.patch('/item/:id/venda', async (req, res) => {
    try {
        const id = req.params.id;
        const { quantidade } = req.body;
        await repo.registrarVenda(id, quantidade);
        res.json({ message: 'Venda registrada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar venda' });
    }
});

export default endpoint;
