@echo off
title Crypto Wave
color 0A

cd %~dp0

echo Configuration files checked.

echo Checking dependencies...
if exist "..\node_modules" (
    echo Using node_modules from parent directory...
    cd ..
    CALL npm install puppeteer node-fetch cheerio chalk @faker-js/faker readline-sync https-proxy-agent puppeteer-extra puppeteer-extra-plugin-stealth
    cd %~dp0
) else (
    echo Installing dependencies in current directory...
    CALL npm install puppeteer node-fetch cheerio chalk @faker-js/faker readline-sync https-proxy-agent puppeteer-extra puppeteer-extra-plugin-stealth
)
echo Dependencies installation completed!
title Crypto Wave
echo Starting the bot...
node index.js

pause
exit
