import express from 'express';
import router from './router/web_hook/cliente';
import routerGerente from './router/web_hook/gerente';
import routerProduto from './router/produto/produto';

const app = express();

app.use(express.json());
app.use('/cliente', router);
app.use('/gerente', routerGerente);
app.use('/produto', routerProduto);

export default app;