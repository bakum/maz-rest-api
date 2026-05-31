const crypto = require('crypto');
const {verifyDjangoPassword} = require('../authorization/utils/django-password');

describe('verifyDjangoPassword', () => {
    const password = 'test-password';
    const salt = 'S4EhNLNS8WKZxwxyp4rPvu';
    const iterations = 260000;
    const hash = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256').toString('base64');
    const storedHash = `pbkdf2_sha256$${iterations}$${salt}$${hash}`;

    it('accepts the correct password', () => {
        expect(verifyDjangoPassword(password, storedHash)).toBe(true);
    });

    it('rejects a wrong password', () => {
        expect(verifyDjangoPassword('wrong-password', storedHash)).toBe(false);
    });

    it('rejects invalid hash format', () => {
        expect(verifyDjangoPassword(password, 'not-a-django-hash')).toBe(false);
    });

    it('rejects unsupported algorithms', () => {
        expect(verifyDjangoPassword(password, 'argon2$...')).toBe(false);
    });
});
