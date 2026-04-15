const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('Scan this QR code to start the Bot!');
});

client.on('ready', () => {
    console.log('Aira Pro Utility Bot is Online! 🚀');
});

client.on('message', async msg => {
    const chat = await msg.getChat();
    const user = await msg.getContact();
    const input = msg.body.toLowerCase();

    // --- 1. THE MAIN MENU ---
    if (input === '.menu') {
        let menuText = `✨ *AIRA PRO UTILITY BOT* ✨\n\n` +
                       `Hello @${user.pushname || 'User'}, how can I help you today?\n\n` +
                       `*Available Services:*\n` +
                       `📍 *.loc* - Get Office Location\n` +
                       `📅 *.book* - Book an Appointment\n` +
                       `💳 *.price* - View Price List\n` +
                       `🆘 *.urgent* - Direct Alert to Admin\n` +
                       `ℹ️ *.info* - About our Services\n\n` +
                       `🚀 *Developed by Engineer Adam*`;
        
        await chat.sendMessage(menuText);
    }

    // --- 2. LOCATION FUNCTION ---
    else if (input === '.loc') {
        await msg.reply('📍 *Our Location:* https://maps.google.com/?q=YourLocation\nWorking Hours: 9 AM - 6 PM');
    }

    // --- 3. BOOKING LOGIC (Simple) ---
    else if (input.startsWith('.book')) {
        await msg.reply('✅ Your booking request has been noted! Our team will contact you shortly.');
        // Admin-ന് അലേർട്ട് അയക്കുന്നു
        client.sendMessage('YOUR_NUMBER@c.us', `📅 *New Booking Request* from ${user.number}`);
    }

    // --- 4. URGENT ALERT SYSTEM ---
    else if (input === '.urgent') {
        await msg.reply('🚨 *Alert Sent!* Adam will get back to you immediately.');
        client.sendMessage('YOUR_NUMBER@c.us', `🆘 *URGENT:* @${user.number} is requesting immediate attention!`);
    }

    // --- 5. PRICE LIST ---
    else if (input === '.price') {
        let priceList = `💰 *Our Price List:*\n\n` +
                        `• Basic Service: ₹499\n` +
                        `• Pro Engine: ₹999\n` +
                        `• AI Custom: ₹2499`;
        await msg.reply(priceList);
    }
});

client.initialize();
