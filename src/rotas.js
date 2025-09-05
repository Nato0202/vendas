import itemController from './controller/itemController.js';

export function adicionarRotas(api) {
    api.use(itemController);
}
