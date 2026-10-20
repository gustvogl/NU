# Nubank — projeto acadêmico

Banco digital de demonstração para PPDM2, com React, Supabase e Capacitor. Nome e cores do Nubank usados como referência visual; projeto independente, sem vínculo com a instituição.

**Todo dinheiro é fictício.** Pix funciona entre contas deste mesmo projeto. Não conecta a bancos, cartões, boletos ou operadoras reais.

## 1. Configure seu Supabase

1. Crie um projeto em [supabase.com](https://supabase.com/dashboard).
2. Abra **SQL Editor → New query**.
3. Copie TODO o conteúdo de **supabase/01-banco.sql**, cole e clique em **Run**.
4. Execute **supabase/02-verificar.sql** para conferir permissões e consistência.
5. Em **Authentication → Sign In / Providers → Email**, mantenha o provedor de e-mail ativo.
6. Para a apresentação, você pode desativar **Confirm email** no seu projeto de teste. Com a confirmação ativa, o aluno precisa confirmar o e-mail antes de entrar. O provedor de e-mail de teste do Supabase tem limites; configure SMTP próprio se precisar de mais mensagens.
7. Em **Project Settings → API** ou **Connect**, copie a **Project URL** e a chave **publishable**. A chave antiga **anon** também é aceita.

**Nunca coloque chave secret ou service_role no frontend.** Não exponha o schema nu_private na Data API.

## 2. Rode no computador

Instale [Node.js 22 LTS](https://nodejs.org/) (22.12 ou superior da linha 22).

Extraia o ZIP inteiro. Os arquivos package.json e COMECE-AQUI.md devem ficar na pasta aberta no VS Code.

Copie **.env.example** para um arquivo chamado **.env** e preencha:

```dotenv
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SUA_CHAVE_PUBLICA
```

No terminal dessa pasta:

```bash
npm ci
npm run dev
```

Abra a URL informada pelo terminal, normalmente http://localhost:5173.

No Windows, **INICIAR-WINDOWS.cmd** também instala as dependências e inicia o servidor. Se o .env não existir, ele abre o modelo no Bloco de Notas.

**Depois de alterar o .env, reinicie o servidor.** Sem configuração, a tela explica como conectar o Supabase; não exibe uma conta inventada.

Crie uma conta própria para o projeto. Cada conta recebe **R$ 1.000,00 fictícios uma única vez** para testes.

## 3. Envie ao GitHub

1. Crie um repositório no seu GitHub.
2. Envie o conteúdo extraído do ZIP; package.json deve estar na raiz do repositório.
3. Inclua package-lock.json, src, public, supabase, docs, android e os arquivos de configuração.
4. **Não envie .env, node_modules, dist, chaves de assinatura nem android/local.properties.**
5. Pode usar o GitHub Desktop: Add an existing repository, commit e Publish repository.

Enviar só o ZIP ao repositório não prepara o deploy: os arquivos precisam estar extraídos.

## 4. Publique na Vercel

1. Entre em [vercel.com/new](https://vercel.com/new) e importe o repositório.
2. Framework: **Vite**. Diretório raiz: a pasta de package.json.
3. Node.js: **22.x**.
4. Install Command: **npm ci**.
5. Build Command: **npm run build**.
6. Output Directory: **dist**.
7. Em Environment Variables, adicione:
   - **VITE_SUPABASE_URL**
   - **VITE_SUPABASE_PUBLISHABLE_KEY**
8. Clique em Deploy. Sempre faça **Redeploy** depois de alterar variáveis: o Vite as incorpora durante o build.

O arquivo vercel.json já inclui o redirecionamento de SPA e cabeçalhos básicos.

No Supabase, abra **Authentication → URL Configuration**:
- **Site URL:** sua URL de produção da Vercel.
- **Redirect URLs:** sua URL de produção e http://localhost:5173 para testes locais.
- Adicione URLs de preview específicas se for usar a recuperação de senha nesses previews.

A recuperação por e-mail no Android abre a Site URL configurada no Supabase. Senhas são do projeto, nunca da conta Nubank real.

## 5. Android — atividade de sessões seguras

O projeto Android já está incluído. Depois de preencher o .env:

```bash
npm run android:sync
npm run android:open
```

Instale o Android Studio, JDK 21 e o SDK indicado pelo projeto (Android 36). Use o Gradle do próprio projeto. Em seguida, rode em um emulador ou celular USB.

**O ZIP contém código-fonte; não contém APK compilado.** O Android não foi executado em emulador nesta entrega.

Roteiro da gravação em **docs/ROTEIRO-VIDEO.md**:
- Fazer login.
- Forçar parada nas configurações do Android.
- Abrir pelo ícone e mostrar o auto-login.
- Sair da conta, reabrir e mostrar que o login voltou a ser necessário.

Arrastar da lista de apps recentes nem sempre encerra o processo. Para demonstrar o requisito, use **Configurações → Apps → Banco Acadêmico → Forçar parada**.

## Funcionalidades incluídas

- Cadastro, login, recuperação e alteração de senha pelo Supabase Auth.
- AuthContext com splash, restauração, renovação e logout persistente.
- Tokens no Capacitor Preferences; senha não é persistida.
- Conta individual, saldo, entradas e saídas.
- Pix de teste entre usuários, consulta de destinatário e chaves por e-mail/aleatórias.
- Transferências atômicas, validação de saldo e prevenção de repetição da mesma operação.
- Extrato com filtros, paginação, exportação CSV e comprovante acadêmico.
- Adição explícita de saldo fictício.
- Pagamento de código de barras de teste e recarga simulada.
- Cartões fictícios, virtuais, bloqueio, limite compartilhado, compras e pagamento de fatura.
- Caixinhas com metas, depósitos e resgates.
- Empréstimo didático com cálculo de parcelas e pagamentos.
- Agendamentos processados ao abrir/atualizar o app após a data.
- Perfil, tema claro/escuro, ocultar saldo, notificações e solicitações de ajuda.
- Dados isolados por usuário com RLS e permissões explícitas.
- Layout para computador e celular, labels, foco e navegação por teclado.
- Contadores volátil e persistente para demonstrar a atividade.

A conta é atualizada ao abrir, ao voltar à janela e a cada 20 segundos enquanto estiver visível. Não depende de Realtime ou de um servidor próprio.

## Verificação

```bash
npm test
npm run build
```

Os testes usam PostgreSQL embarcado (PGlite) com papéis e RLS para executar o mesmo SQL do projeto. Não exigem chave secreta nem modificam seu Supabase.

Para o teste de navegador opcional:

```bash
npx playwright install chromium
npm run test:browser
```

Esse teste cria um build sem configuração, inicia servidores locais de teste e usa uma API de teste com PostgreSQL embarcado. Não acessa sua conta real.

**Validação necessária no seu projeto:** crie duas contas reais do seu Supabase, transfira entre elas e teste o Android. Testes automatizados locais não validam configuração, SMTP, entrega de e-mail ou o APK no celular.

## Problemas comuns

| Problema | Como resolver |
| --- | --- |
| Tela de configuração | Preencha as duas variáveis e reinicie / faça redeploy. |
| Função nu_ensure_account não encontrada | Execute 01-banco.sql inteiro no projeto correto e aguarde a atualização da API. |
| Permission denied | Confira o SQL completo e mantenha somente public exposto; nu_private não deve ser exposto. |
| E-mail não confirmado | Confirme no e-mail ou ajuste Confirm email no seu projeto de teste. |
| Não chega e-mail | Confira spam, limites de envio, SMTP e URL Configuration. |
| Chave Pix não encontrada | O destinatário precisa entrar no projeto e ter uma chave registrada nele. |
| Saldo insuficiente | Adicione saldo fictício ou use um valor menor. |
| Alterei .env e nada mudou | Reinicie o Vite ou faça novo deploy da Vercel. |
| Android mostra configuração antiga | Rode npm run android:sync e reinstale/atualize o app. |
| Android não abre | Use JDK 21, o SDK exigido e sincronize o Gradle no Android Studio. |
| Minha conta continua logada | É o comportamento pedido. Use Sair da conta para remover a sessão persistida. |

Leia também **docs/SEGURANCA.md** e **docs/VALIDACAO.md**.
