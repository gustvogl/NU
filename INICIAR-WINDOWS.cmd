@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Instale o Node.js 22 LTS e execute este arquivo novamente.
 pause
 exit /b 1
)
if not exist ".env" (
 copy ".env.example" ".env" >nul
 echo Preencha a URL e a chave publica do seu Supabase no arquivo que abriu.
 echo Antes, execute supabase/01-banco.sql no SQL Editor.
 start /wait notepad ".env"
)
if not exist "node_modules" (
 call npm ci
 if errorlevel 1 (
  pause
  exit /b 1
 )
)
echo Abra no navegador a URL indicada abaixo.
call npm run dev
pause
