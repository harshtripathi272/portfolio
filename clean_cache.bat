@echo off
echo Cleaning Next.js cache...
if exist .next rd /s /q .next
echo Cache cleaned. You can now run 'npm run dev' again.
pause
