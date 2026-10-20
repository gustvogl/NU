# Nubank acadêmico

Projeto completo de banco digital de demonstração com React + Supabase + Capacitor, preparado para GitHub e Vercel.

**Comece por [COMECE-AQUI.md](COMECE-AQUI.md).**

## Execução

```bash
npm ci
# Copie .env.example para .env e configure seu Supabase.
npm run dev
```

## Banco de dados

Execute [supabase/01-banco.sql](supabase/01-banco.sql) inteiro no SQL Editor do seu Supabase. Confira com [supabase/02-verificar.sql](supabase/02-verificar.sql).

## Testes

```bash
npm test
npm run build
```

O projeto implementa autenticação persistente, conta, Pix interno, extrato, cartões fictícios, fatura, caixinhas, pagamentos e empréstimos simulados.

Nome e cores são uma referência acadêmica ao Nubank. Não há vínculo com a instituição nem movimentação de dinheiro real. Use somente contas e senhas próprias deste projeto.
