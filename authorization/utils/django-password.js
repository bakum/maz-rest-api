const crypto = require('crypto');

/**
 * Verifies a plain password against Django's pbkdf2_sha256$iterations$salt$hash format.
 */
exports.verifyDjangoPassword = (plainPassword, storedHash) => {
    if (!plainPassword || !storedHash) {
        return false;
    }

    const parts = storedHash.split('$');
    if (parts.length !== 4) {
        return false;
    }

    const [algorithm, iterationsStr, salt, expectedHash] = parts;
    if (algorithm !== 'pbkdf2_sha256') {
        return false;
    }

    const iterations = parseInt(iterationsStr, 10);
    if (!Number.isFinite(iterations) || iterations <= 0) {
        return false;
    }

    const derivedHash = crypto
        .pbkdf2Sync(plainPassword, salt, iterations, 32, 'sha256')
        .toString('base64');

    if (derivedHash.length !== expectedHash.length) {
        return false;
    }

    return crypto.timingSafeEqual(
        Buffer.from(derivedHash),
        Buffer.from(expectedHash)
    );
};
