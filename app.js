import prompt from 'prompt-sync';
const ler = prompt();

// Lista que armazenará os itens cadastrados para venda
let itensAVenda = [];

// Subcategorias disponíveis para os itens
const subcategorias = [
    "Bebidas",
    "Comidas",
    "Limpeza",
    "Higiene",
    "Eletrodomésticos",
    "Livros",
    "outros"
];

// Função que lê um número positivo e faz a validação
function lerNumeroPositivo(mensagem) {
    const entrada = ler(mensagem);
    const numero = Number(entrada);
    if (isNaN(numero) || numero < 0) {
        console.log("Por favor, insira um número válido e positivo.");
        return null;
    }
    return numero;
}

// Função que permite o usuário escolher uma subcategoria
function escolherSubcategoria() {
    console.log("Escolha a subcategoria do item:");
    for (let i = 0; i < subcategorias.length; i++) {
        console.log(`${i + 1} - ${subcategorias[i]}`);
    }
    const escolha = lerNumeroPositivo("Digite o número da subcategoria: ");
    if (escolha === null || escolha < 1 || escolha > subcategorias.length) {
        console.log("Subcategoria inválida. Tente novamente.");
        return null;
    }
    return subcategorias[escolha - 1];
}

// Função para cadastrar um novo item para venda
function cadastrarItem() {
    const subcategoria = escolherSubcategoria();
    if (subcategoria === null) return;

    const id = itensAVenda.length + 1; // Gera ID automático
    const nome = ler("Digite o nome do item: ").trim();
    if (!nome) {
        console.log("O nome do item não pode ser vazio.");
        return;
    }

    const preco = lerNumeroPositivo("Digite o preço do item (R$): ");
    if (preco === null) return;

    const quantidadeDisponivel = lerNumeroPositivo("Digite a quantidade inicial disponível para venda: ");
    if (quantidadeDisponivel === null) return;

    // Cria o objeto item
    const novoItemAVenda = { id, nome, preco, quantidadeDisponivel, subcategoria };
    itensAVenda.push(novoItemAVenda); // Adiciona à lista

    console.log(`Item cadastrado com sucesso na subcategoria "${subcategoria}"!`);
}

// Função para exibir todos os itens cadastrados para venda
function listarItensAVenda() {
    if (itensAVenda.length === 0) {
        console.log("Nenhum item cadastrado ainda para venda.");
        return;
    }
    console.log("\n=== Lista de Itens à Venda ===");
    for (const item of itensAVenda) {
        const total = (item.preco * item.quantidadeDisponivel).toFixed(2); // Valor total
        console.log(`ID: ${item.id} | Nome: ${item.nome} | Preço: R$${item.preco.toFixed(2)} | Quantidade Disponível: ${item.quantidadeDisponivel} | Subcategoria: ${item.subcategoria} | Valor Total Estimado: R$${total}`);
    }
}

// Função para registrar uma entrada de itens
function registrarEntrada() {
    const id = lerNumeroPositivo("Digite o ID do item para registrar entrada: ");
    if (id === null) return;

    const item = itensAVenda.find(p => p.id === id);
    if (!item) {
        console.log("Item não encontrado.");
        return;
    }

    const quantidade = lerNumeroPositivo("Quantidade a adicionar: ");
    if (quantidade === null || quantidade === 0) {
        console.log("Quantidade inválida.");
        return;
    }

    item.quantidadeDisponivel += quantidade;
    console.log("Quantidade disponível atualizada com sucesso.");
}

// Função para registrar uma venda de itens
function registrarVenda() {
    const id = lerNumeroPositivo("Digite o ID do item para registrar a venda: ");
    if (id === null) return;

    const item = itensAVenda.find(p => p.id === id);
    if (!item) {
        console.log("Item não encontrado.");
        return;
    }

    const quantidade = lerNumeroPositivo("Quantidade a vender: ");
    if (quantidade === null || quantidade === 0) {
        console.log("Quantidade inválida.");
        return;
    }

    if (quantidade > item.quantidadeDisponivel) {
        console.log("Quantidade disponível insuficiente para a venda.");
        return;
    }

    item.quantidadeDisponivel -= quantidade;
    console.log("Quantidade disponível atualizada após a venda.");
}

// Função para apagar um item pelo ID
function apagarItem() {
    const id = lerNumeroPositivo("Digite o ID do item para apagar: ");
    if (id === null) return;

    const index = itensAVenda.findIndex(p => p.id === id);
    if (index === -1) {
        console.log("Item não encontrado.");
        return;
    }

    itensAVenda.splice(index, 1); // Remove o item
    console.log("Item removido com sucesso.");
}

// Função para buscar itens por nome (parcial ou completo)
function buscarItem() {
    const nome = ler("Digite o nome do item a buscar: ").toLowerCase();
    const encontrados = itensAVenda.filter(p => p.nome.toLowerCase().includes(nome));

    if (encontrados.length === 0) {
        console.log("Nenhum item encontrado com esse nome.");
        return;
    }

    console.log("Itens encontrados:");
    for (const item of encontrados) {
        console.log(`ID: ${item.id} | Nome: ${item.nome} | Quantidade Disponível: ${item.quantidadeDisponivel}`);
    }
}

// Função que exibe um resumo geral das vendas
function resumoVendas() {
    let totalItens = itensAVenda.length;
    let totalUnidadesDisponiveis = itensAVenda.reduce((soma, p) => soma + p.quantidadeDisponivel, 0);
    let valorTotalEst = itensAVenda.reduce((soma, p) => soma + p.preco * p.quantidadeDisponivel, 0);

    console.log("\n=== Resumo de Vendas ===");
    console.log(`Total de itens cadastrados: ${totalItens}`);
    console.log(`Total de unidades disponíveis para venda: ${totalUnidadesDisponiveis}`);
    console.log(`Valor total estimado dos itens à venda: R$${valorTotalEst.toFixed(2)}`);
}

// Função que remove todos os itens (com confirmação)
function limparItens() {
    const confirm = ler("Tem certeza que deseja apagar TODOS os itens à venda? (sim/não): ").toLowerCase();
    if (confirm === "sim") {
        itensAVenda = []; // Limpa a lista
        console.log("Todos os itens foram removidos!");
    } else {
        console.log("Ação cancelada.");
    }
}

// Função principal que exibe o menu e controla o fluxo do programa
function menu() {
    let opcao = "";
    do {
        console.log("\n=== MENU DE GERENCIAMENTO DE VENDAS ===");
        console.log("1 - Cadastrar novo item");
        console.log("2 - Listar itens à venda");
        console.log("3 - Registrar entrada de itens");
        console.log("4 - Registrar venda de itens");
        console.log("5 - Apagar item");
        console.log("6 - Buscar item por nome");
        console.log("7 - Ver resumo de vendas");
        console.log("8 - Limpar todos os itens");
        console.log("0 - Sair");
        opcao = ler("Escolha uma opção: ").trim();

        // Verifica qual opção o usuário escolheu e chama a função correspondente
        if (opcao === "1") cadastrarItem();
        else if (opcao === "2") listarItensAVenda();
        else if (opcao === "3") registrarEntrada();
        else if (opcao === "4") registrarVenda();
        else if (opcao === "5") apagarItem();
        else if (opcao === "6") buscarItem();
        else if (opcao === "7") resumoVendas();
        else if (opcao === "8") limparItens();
        else if (opcao === "0") console.log("Encerrando o programa. Até breve!");
        else console.log("Opção inválida. Tente novamente.");

    } while (opcao !== "0"); // Continua até o usuário escolher sair
}

// Inicia o programa
menu();
