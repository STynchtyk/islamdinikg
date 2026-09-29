@echo off
cd /d "%~dp0"
set "ISLAMDINI_NODE=node"
where node >nul 2>nul
if errorlevel 1 set "ISLAMDINI_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
set "ISLAMDINI_PORT=4175"
start "IslamDini" /min "%ISLAMDINI_NODE%" server.js
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4175/"
