# Validação da entrega

Verificações realizadas no ambiente de desenvolvimento:

- Instalação com versões exatas e package-lock.json.
- npm audit: zero vulnerabilidades conhecidas no momento da entrega.
- Build de produção do Vite.
- Geração e sincronização do projeto Android com Capacitor App e Preferences.
- 21 testes automatizados passaram.
- Testes Node com Supabase Auth e armazenamento de teste.
- Execução do SQL completo em PostgreSQL embarcado (PGlite), com papéis authenticated/anon e RLS.
- Testes de isolamento, privilégios, conta inicial única, transferência atômica, repetição de operação, saldo insuficiente, caixinhas, cartões, fatura, empréstimos, boletos de teste, recarga, chaves, perfil, solicitações e agendamentos.
- Navegador Chromium com SDK Supabase e API de teste que executa esse mesmo SQL no PGlite.
- Login, auto-login após recarga, Pix entre duas contas, caixinha, compra no cartão, fatura, extrato CSV e comprovante.
- Nove telas com 390 px de largura, sem ultrapassar a largura da página.
- Logout e nova abertura sem sessão.
- Inspeção visual em computador e celular.

## Limites da validação

Não foi configurado ou alterado um projeto Supabase seu. Os testes de banco usam uma instância local de teste e o teste de navegador substitui a API de Auth; eles não provam a entrega de e-mails ou a configuração de um projeto hospedado.

Não houve build Gradle do APK nem execução em celular/emulador. O fechamento forçado precisa ser demonstrado no dispositivo depois da configuração.

A conta, a Vercel e o repositório GitHub não foram publicados nesta entrega. O projeto está preparado para você conectar e publicar seguindo COMECE-AQUI.md.

## Conferência depois da configuração

1. Cadastre A e B com e-mails diferentes.
2. Entre em A, copie a chave e confira seus R$ 1.000 fictícios iniciais.
3. Entre em B em outra janela e envie R$ 25 para A.
4. Confira a saída de B, a entrada de A e o mesmo identificador da operação nos registros.
5. Reabra A e confira que o saldo permanece.
6. Force URL ou filtros com dados do outro usuário: as tabelas devem continuar retornando apenas os dados do titular.
7. Rode supabase/02-verificar.sql: consultas de inconsistência devem retornar zero linhas.
8. Teste cadastro com confirmação de e-mail e recuperação de senha.
9. Faça o roteiro no Android para validar a persistência nativa.
