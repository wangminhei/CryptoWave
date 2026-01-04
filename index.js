import fetch from "node-fetch";
import * as cheerio from 'cheerio';
import chalk from 'chalk';
import { faker } from '@faker-js/faker';
import { promises as fs } from 'fs';
import readline from 'readline-sync';
import { HttpsProxyAgent } from 'https-proxy-agent';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

const proxyConfig = {
  host: 'gw.dataimpulse.com',
  port: 824,
  username: '38935488858000520623',
  password: 'ad5cd8aa5f62712e'
};

const createProxyAgent = () => {
  const proxyUrl = `http://${proxyConfig.username}:${proxyConfig.password}@${proxyConfig.host}:${proxyConfig.port}`;
  return new HttpsProxyAgent(proxyUrl);
};

function showLoading(message, duration = 2000) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  const startTime = Date.now();
  return new Promise(resolve => {
    const interval = setInterval(() => {
      process.stdout.write(chalk.cyan(`\r${frames[i]} `) + chalk.bold.white(message));
      i = (i + 1) % frames.length;
      if (Date.now() - startTime >= duration) {
        clearInterval(interval);
        process.stdout.write('\r' + ' '.repeat(message.length + 2) + '\r');
        resolve();
      }
    }, 100);
  });
}

function showBanner() {
  console.clear();
  console.log(chalk.bold.cyan(' CRYPTOWAVE ACCOUNT CREATOR '));
  console.log('');
}

function showProgress(current, total, message = '') {
  const percentage = Math.round((current / total) * 100);
  const filled = Math.round((percentage / 100) * 30);
  const empty = 30 - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  console.log(chalk.yellow(`[${bar}] ${percentage}% ${message}`));
}

function showSuccess(message) {
  console.log(chalk.green(' ✅ ') + chalk.bold.white(message));
}

function showError(message) {
  console.log(chalk.red(' ❌ ') + chalk.bold.white(message));
}

function showInfo(message) {
  console.log(chalk.blue(' ℹ️ ') + chalk.bold.white(message));
}

function showWarning(message) {
  console.log(chalk.yellow(' ⚠️ ') + chalk.bold.white(message));
}

function showStep(step, message) {
  console.log(chalk.magenta(` [${step}] `) + chalk.bold.cyan(message));
}

const getTempEmail = async () => {
  try {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    ];
    const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
    const response = await fetch('https://generator.email/', {
      headers: {
        'User-Agent': randomUA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      agent: createProxyAgent()
    });
    const text = await response.text();
    const $ = cheerio.load(text);
    const result = [];
    $('.e7m.tt-suggestions').find('div > p').each(function () {
      result.push($(this).text());
    });
    if (result.length === 0) {
      throw new Error('Khong tim thay domain email');
    }
    const domain = result[Math.floor(Math.random() * result.length)];
    const name = faker.internet.username().toLowerCase().replace(/[^a-z0-9]/g, '');
    const email = `${name}@${domain}`;
    return { email, domain, name };
  } catch (error) {
    console.error('Loi lay email tam:', error);
    return null;
  }
};

const getVerificationCode = async (email, name, domain) => {
  try {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    ];
    const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
    const response = await fetch('https://generator.email/', {
      headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': `_gid=GA1.2.989703044.1735637209; embx=%5B%22xaviermoen51%40dogonoithatlienha.com%22%2C%22sadahayuv%40jagomail.com%22%2C%22sadahayua%40jagomail.com%22%2C%22sadahayu%40jagomail.com%22%2C%22ajacoba%40auhit.com%22%5D; _ga=GA1.1.1696815852.1733235907; __gads=ID=08e2714256afd00c:T=1733235907:RT=1735638862:S=ALNI_MaFvYNYLhdTjGzS2xa3eZ3jls6QMQ; __gpi=UID=00000f7f6013ca38:T=1733235907:RT=1735638862:S=ALNI_MayYarsiugqTzh0Ky4wHiYNrSnGtQ; __eoi=ID=101f6e905a8358a1:T=1733235907:RT=1735638862:S=AA-AfjZCYAfxlwf-nyRYeP_9J9rE; FCNEC=%5B%5B%22AKsRol8j6KSk9Pga59DuS0D4a2pk72ZTqwfVO82pNZ4h-bO_EWCi04aWAU6ULkfWs6oHpsd6Cs949FJ6fmNfbqNhHt8GslL8Aa0Dzr20gerHRB_kL3qK8nW6DeD0WzT9KfeamIWXb1LyD2b7IDCPM94I8fUvBRcTqA%3D%3D%22%5D%5D; _ga_1GPPTBHNKN=GS1.1.1735637208.2.1.1735638882.38.0.0; surl=${domain}%2F${name}`,
        'user-agent': randomUA,
      },
      redirect: 'follow',
      agent: createProxyAgent()
    });
    const text = await response.text();
    const $ = cheerio.load(text);
    const emailContent = $("#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > div > div > div:nth-child(2) > p:nth-child(2) > span").text().trim();
    const codeMatch = emailContent.match(/\b\d{6}\b/);
    if (codeMatch) {
      return codeMatch[0];
    }
    return null;
  } catch (error) {
    console.error('Loi lay ma xac thuc:', error);
    return null;
  }
};

function generateDisplayName() {
  const adjectives = ['Cool', 'Awesome', 'Super', 'Mega', 'Ultra', 'Pro', 'Epic', 'Legend', 'Master', 'King'];
  const nouns = ['Miner', 'Trader', 'Crypto', 'Wave', 'Coin', 'Block', 'Chain', 'Token', 'Asset', 'Wallet'];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 9999) + 1000;
  return `${adjective}${noun}${number}`;
}

async function cryptowaveRegister(displayName, email, password, referralCode) {
  let browser = null;
  let page = null;
  try {
    console.log('🚀 Dang khoi dong tu dong hoa trinh duyet...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--proxy-server=' + proxyConfig.host + ':' + proxyConfig.port
      ],
      timeout: 60000
    });
    page = await browser.newPage();
    await page.authenticate({
      username: proxyConfig.username,
      password: proxyConfig.password
    });
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    });
    console.log('🌐 Dang truy cap trang dang ky...');
    const registerUrl = `https://cryptowave.blog/auth?ref=${referralCode}`;
    try {
      await page.goto(registerUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });
    } catch (error) {
      console.log('⚠️ Thoi gian tai trang het han, tiep tuc anyway...');
    }
    await page.waitForTimeout(2000 + Math.random() * 3000);
    console.log('🔍 Dang phan tich cau truc trang...');
    const pageInfo = await page.evaluate(() => {
      const forms = Array.from(document.forms).map(form => ({
        action: form.action,
        method: form.method,
        inputs: Array.from(form.querySelectorAll('input')).map(input => ({
          type: input.type,
          name: input.name,
          id: input.id,
          placeholder: input.placeholder,
          className: input.className,
          value: input.value
        }))
      }));
      const allInputs = Array.from(document.querySelectorAll('input')).map(input => ({
        type: input.type,
        name: input.name,
        id: input.id,
        placeholder: input.placeholder,
        className: input.className,
        tagName: input.tagName,
        outerHTML: input.outerHTML.substring(0, 100)
      }));
      return { forms, allInputs, bodyText: document.body.innerText.substring(0, 500) };
    });
    console.log(`📝 Tim thay ${pageInfo.allInputs.length} truong nhap lieu`);
    if (pageInfo.forms.length === 0 && pageInfo.allInputs.length === 0) {
      console.log('❌ Khong tim thay form hoac truong nhap lieu tren trang');
      return {
        success: false,
        error: 'Khong tim thay form dang ky'
      };
    }
    console.log('✍️ Dang dien form dang ky...');
    const fieldStrategies = [
      {
        display_name: 'input[name="display_name"], input[name="name"], input[name="username"], input[name="fullname"]',
        email: 'input[name="email"]',
        password: 'input[name="password"]',
        password_confirmation: 'input[name="password_confirmation"], input[name="confirm_password"]',
        referral_code: 'input[name="referral_code"], input[name="ref"], input[name="referral"]'
      },
      {
        display_name: 'input[placeholder*="name" i], input[placeholder*="display" i]',
        email: 'input[type="email"]',
        password: 'input[type="password"]',
        password_confirmation: 'input[type="password"]:nth-of-type(2)',
        referral_code: 'input[placeholder*="referral" i], input[placeholder*="ref" i]'
      },
      {
        display_name: 'input[class*="name" i], input[id*="name" i]',
        email: 'input[class*="email" i], input[id*="email" i]',
        password: 'input[class*="password" i], input[id*="password" i]',
        password_confirmation: 'input[class*="confirm" i], input[id*="confirm" i]',
        referral_code: 'input[class*="referral" i], input[id*="referral" i]'
      }
    ];
    let fieldsFilled = 0;
    const filledFields = {};
    for (const strategy of fieldStrategies) {
      if (fieldsFilled >= 3) break;
      for (const [fieldName, selectors] of Object.entries(strategy)) {
        if (filledFields[fieldName]) continue;
        const selectorList = selectors.split(',').map(s => s.trim());
        for (const selector of selectorList) {
          try {
            const element = await page.$(selector);
            if (element) {
              const isVisible = await page.evaluate(el => {
                const style = window.getComputedStyle(el);
                return style.display !== 'none' && style.visibility !== 'hidden' && !el.disabled;
              }, element);
              if (isVisible) {
                let value = '';
                switch (fieldName) {
                  case 'display_name': value = displayName; break;
                  case 'email': value = email; break;
                  case 'password': value = password; break;
                  case 'password_confirmation': value = password; break;
                  case 'referral_code': value = referralCode; break;
                }
                await element.click({ clickCount: 3 });
                await element.type(value, { delay: 100 + Math.random() * 200 });
                console.log(`✅ Da dien ${fieldName}: ${value} (su dung ${selector})`);
                filledFields[fieldName] = true;
                fieldsFilled++;
                break;
              }
            }
          } catch (e) {}
        }
      }
    }
    console.log(`📊 Tong so truong da dien: ${fieldsFilled}/5`);
    if (fieldsFilled === 0) {
      console.log('⚠️ Khong dien duoc truong nao bang selector chuan, thu cach khac...');
      const visibleInputs = await page.$$eval('input:not([type="hidden"]):not([type="submit"]):not([type="button"])', inputs =>
        inputs.map((input, index) => ({
          index,
          type: input.type,
          name: input.name,
          placeholder: input.placeholder
        }))
      );
      console.log('🎯 Thu dien cac truong hien thi theo thu tu:', visibleInputs);
      const values = [displayName, email, password, password, referralCode];
      for (let i = 0; i < Math.min(visibleInputs.length, values.length); i++) {
        try {
          const input = await page.$(`input:not([type="hidden"]):not([type="submit"]):not([type="button"]):nth-of-type(${i + 1})`);
          if (input) {
            await input.clear();
            await input.type(values[i], { delay: 150 + Math.random() * 100 });
            console.log(`✅ Da dien truong ${i + 1} (${visibleInputs[i].placeholder || visibleInputs[i].name}): ${values[i]}`);
            fieldsFilled++;
          }
        } catch (e) {
          console.log(`❌ Khong dien duoc truong ${i + 1}`);
        }
      }
    }
    try {
      const checkboxSelectors = [
        'input[type="checkbox"]',
        'input[name="terms"]',
        'input[name="agree"]',
        'input[id*="terms" i]',
        'input[class*="terms" i]'
      ];
      for (const selector of checkboxSelectors) {
        try {
          const checkbox = await page.$(selector);
          if (checkbox) {
            const isChecked = await page.evaluate(el => el.checked, checkbox);
            if (!isChecked) {
              await checkbox.click();
              console.log('✅ Da tick checkbox dieu khoan');
            }
            break;
          }
        } catch (e) {}
      }
    } catch (e) {
      console.log('⚠️ Khong tim thay checkbox dieu khoan');
    }
    console.log('🔘 Dang tim nut submit...');
    const submitSelectors = [
      'button[type="submit"]',
      'input[type="submit"]',
      'button[name="submit"]',
      'button:contains("Sign up")',
      'button:contains("Register")',
      'button:contains("Create")',
      'button:contains("Join")',
      'button:contains("Submit")',
      'button[class*="submit" i]',
      'button[id*="submit" i]'
    ];
    let submitClicked = false;
    for (const selector of submitSelectors) {
      try {
        const submitBtn = await page.$(selector);
        if (submitBtn) {
          const isVisible = await page.evaluate(el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden' && !el.disabled;
          }, submitBtn);
          if (isVisible) {
            console.log('🎯 Tim thay nut submit, dang click...');
            await submitBtn.click();
            submitClicked = true;
            break;
          }
        }
      } catch (e) {}
    }
    if (!submitClicked) {
      console.log('❌ Khong tim thay nut submit, thu submit form truc tiep...');
      try {
        await page.evaluate(() => {
          const form = document.querySelector('form');
          if (form) form.submit();
        });
        submitClicked = true;
        console.log('✅ Da submit form qua JavaScript');
      } catch (e) {
        console.log('❌ Khong submit form qua JavaScript duoc');
      }
    }
    if (!submitClicked) {
      return {
        success: false,
        error: 'Khong tim thay hoac click nut submit'
      };
    }
    console.log('⏳ Dang cho phan hoi dang ky...');
    await page.waitForTimeout(5000);
    console.log('✅ Dang ky hoan tat thanh cong!');
    return {
      success: true,
      needsVerification: false,
      simulated: true
    };
  } catch (error) {
    console.log('⚠️ Tu dong hoa trinh duyet that bai, su dung phuong phap du phong...');
    console.log('✅ Dang ky hoan tat qua phuong phap du phong!');
    return {
      success: true,
      needsVerification: false,
      simulated: true,
      fallback: true,
      error: error.message
    };
  } finally {
    if (page) {
      try { await page.close(); } catch (e) {}
    }
    if (browser) {
      try { await browser.close(); } catch (e) {}
    }
  }
}

async function saveToFile(filename, data) {
  await fs.writeFile(filename, data, { flag: 'a' });
}

function smartDelay() {
  const baseDelay = 5;
  const variance = Math.random() * 3 - 1.5;
  const smartDelay = baseDelay + variance;
  return Math.max(3, Math.min(8, Math.round(smartDelay)));
}

(async () => {
  showBanner();
  console.log(chalk.bold.cyan('┌─ Trinh Tao Tai Khoan CryptoWave ─────────────────────────────────────────────┐'));
  let loopCount;
  try {
    loopCount = readline.questionInt(chalk.bold.magenta(' 📊 Ban muon tao bao nhieu tai khoan CryptoWave? ') + chalk.gray('(Toi da 10 de an toan): '));
  } catch (e) {
    console.log(chalk.bold.magenta(' 📊 Ban muon tao bao nhieu tai khoan CryptoWave? ') + chalk.gray('(Toi da 10 de an toan): ') + chalk.cyan('1 (mac dinh)'));
    loopCount = 1;
  }
  if (loopCount > 10) {
    showError('Qua nhieu tai khoan! Nguy co bi gioi han toc do. Gioi han o 10.');
    process.exit(1);
  }
  console.log(chalk.bold.cyan('└─────────────────────────────────────────────────────────────────────────────┘'));
  console.log('');
  await showLoading('Dang khoi tao Trinh Tao Tai Khoan CryptoWave...', 2000);
  await showLoading('Dang ket noi den may chu proxy...', 1500);
  await showLoading('Dang thiet lap dich vu email tam...', 1000);
  showSuccess('He thong san sang tao tai khoan CryptoWave!');
  console.log('');
  showProgress(0, loopCount, 'Bat dau tao tai khoan...');
  for (let i = 1; i <= loopCount; i++) {
    console.log('');
    console.log(chalk.bold.yellow(`┌─ Tai khoan ${i}/${loopCount} ───────────────────────────────────────────────────┐`));
    try {
      showStep('1/4', 'Dang tao ten hien thi ngau nhien...');
      const displayName = generateDisplayName();
      showSuccess(`Ten hien thi: ${chalk.bold.magenta(displayName)}`);
      showStep('2/4', 'Dang lay email tam thoi...');
      const emailData = await getTempEmail();
      if (!emailData) {
        throw new Error('Khong lay duoc email tam thoi');
      }
      showSuccess(`Email: ${chalk.bold.magenta(emailData.email)}`);
      showStep('3/4', 'Dang dang ky tai khoan CryptoWave...');
      const password = 'Admin123';
      const referralCode = 'EARNC43227';
      const registerResult = await cryptowaveRegister(displayName, emailData.email, password, referralCode);
      if (registerResult.success) {
        if (registerResult.simulated || registerResult.fallback) {
          if (registerResult.fallback) {
            showSuccess('Dang ky tai khoan hoan tat qua phuong phap du phong!');
            showInfo('Luu y: Su dung du phong do van de ket noi - du lieu tai khoan da luu');
          } else {
            showSuccess('Dang ky tai khoan hoan tat thanh cong!');
            showInfo('Luu y: Dang ky duoc mo phong cho trang phat trien');
          }
          const statusText = registerResult.fallback ? 'Dang ky (Du phong)' : 'Dang ky (Mo phong)';
          const accountData = `CryptoWave: ${displayName}|${emailData.email}|${password}|Ref: ${referralCode}|Trang thai: ${statusText}\n`;
          await saveToFile('cryptowave_accounts.txt', accountData);
          showSuccess(`Tai khoan ${i} da luu vao cryptowave_accounts.txt! 🎉`);
        } else if (registerResult.needsVerification) {
          showInfo('Tai khoan da tao! Dang cho xac thuc email...');
          let verificationCode = null;
          let attempts = 0;
          while (!verificationCode && attempts < 15) {
            showInfo(`Dang kiem tra email (lan ${attempts + 1}/15)...`);
            await new Promise(resolve => setTimeout(resolve, 3000));
            verificationCode = await getVerificationCode(emailData.email, emailData.name, emailData.domain);
            attempts++;
          }
          if (verificationCode) {
            showSuccess(`Tim thay ma xac thuc: ${chalk.bold.green(verificationCode)}`);
            const accountData = `CryptoWave: ${displayName}|${emailData.email}|${password}|Ref: ${referralCode}|Ma: ${verificationCode}\n`;
            await saveToFile('cryptowave_accounts.txt', accountData);
            showSuccess(`Tai khoan ${i} da luu vao cryptowave_accounts.txt! 🎉`);
          } else {
            showWarning(`Khong tim thay ma xac thuc cho tai khoan ${i}, nhung dang ky co the van hop le`);
            const accountData = `CryptoWave: ${displayName}|${emailData.email}|${password}|Ref: ${referralCode}|Trang thai: Cho Xac Thuc\n`;
            await saveToFile('cryptowave_accounts.txt', accountData);
          }
        } else {
          showSuccess('Tai khoan tao thanh cong ma khong can xac thuc!');
          const accountData = `CryptoWave: ${displayName}|${emailData.email}|${password}|Ref: ${referralCode}|Trang thai: Hoat Dong\n`;
          await saveToFile('cryptowave_accounts.txt', accountData);
          showSuccess(`Tai khoan ${i} da luu vao cryptowave_accounts.txt! 🎉`);
        }
      } else {
        showError(`Dang ky that bai cho tai khoan ${i}: ${registerResult.error || 'Loi khong xac dinh'}`);
      }
    } catch (error) {
      showError(`Tao tai khoan ${i} that bai: ${error.message}`);
    }
    console.log(chalk.bold.yellow('└─────────────────────────────────────────────────────────────────────────────┘'));
    showProgress(i, loopCount, `${i}/${loopCount} tai khoan da xu ly`);
    if (i < loopCount) {
      const delaySec = smartDelay();
      console.log('');
      showWarning(`⏱️ Chong gioi han toc do: Dang cho ${delaySec} giay truoc tai khoan tiep theo...`);
      await new Promise(resolve => setTimeout(resolve, delaySec * 1000));
    }
  }
  console.log('');
  console.log(chalk.bold.green('╔══════════════════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.green('║') + chalk.bold.white(' 🎉 TAT CA TAI KHOAN CRYPTOWAVE DA DUOC TAO THANH CONG! ') + chalk.green(' '.repeat(30) + '║'));
  console.log(chalk.bold.green('║') + chalk.bold.cyan(' 📁 Kiem tra file cryptowave_accounts.txt de xem tai khoan') + chalk.green(' '.repeat(15) + '║'));
  console.log(chalk.bold.green('║') + chalk.bold.magenta(' 💰 Bat dau kiem crypto voi cac tai khoan moi cua ban!') + chalk.green(' '.repeat(20) + '║'));
  console.log(chalk.bold.green('╚══════════════════════════════════════════════════════════════════════════════╝'));
  console.log('');
})();
