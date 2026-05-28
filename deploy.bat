@echo off
cd /d C:\Users\iamar\Projetos\Treinatech

if exist .git\index.lock (
    del .git\index.lock
    echo Lock removido.
)

git add -A

set /p msg="Mensagem do commit: "
git commit -m "%msg%"
git push

echo.
echo Deploy enviado! Aguarde 1-2 minutos para o Vercel publicar.
pause
