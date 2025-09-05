import { connection } from './connection.js';

export async function listarItens() {
    const comando = `
        SELECT *
        FROM item
    `;
    const [registros] = await connection.query(comando);
    return registros;
}

export async function consultarItem(id) {
    const comando = `
        SELECT *
        FROM item
        WHERE id = ?
    `;
    const [registros] = await connection.query(comando, [id]);
    return registros[0];
}

export async function filtrarItem(nome) {
    const comando = `
        SELECT *
        FROM item
        WHERE nome LIKE ?
    `;
    const [registros] = await connection.query(comando, [`%${nome}%`]);
    return registros;
}

export async function adicionarItem(novoItem) {
    const comando = `
        INSERT INTO item (nome, preco, quantidadeDisponivel, subcategoria)
        VALUES (?, ?, ?, ?)
    `;
    const [info] = await connection.query(comando, [
        novoItem.nome,
        novoItem.preco,
        novoItem.quantidadeDisponivel,
        novoItem.subcategoria
    ]);
    return info.insertId;
}

export async function alterarItem(id, novosDados) {
    const comando = `
        UPDATE item
        SET nome = ?, preco = ?, quantidadeDisponivel = ?, subcategoria = ?
        WHERE id = ?
    `;
    await connection.query(comando, [
        novosDados.nome,
        novosDados.preco,
        novosDados.quantidadeDisponivel,
        novosDados.subcategoria,
        id
    ]);
}

export async function removerItem(id) {
    const comando = `
        DELETE FROM item
        WHERE id = ?
    `;
    await connection.query(comando, [id]);
}

export async function registrarEntrada(id, quantidade) {
    const comando = `
        UPDATE item
        SET quantidadeDisponivel = quantidadeDisponivel + ?
        WHERE id = ?
    `;
    await connection.query(comando, [quantidade, id]);
}

export async function registrarVenda(id, quantidade) {
    const comando = `
        UPDATE item
        SET quantidadeDisponivel = quantidadeDisponivel - ?
        WHERE id = ?
    `;
    await connection.query(comando, [quantidade, id]);
}
