function getBrowserCrypto(): Crypto {
  const browserCrypto = globalThis.crypto;

  if (!browserCrypto) {
    throw new Error('Web Crypto API is not available in the current environment.');
  }

  return browserCrypto;
}

export function buildUUID(): string {
  return getBrowserCrypto().randomUUID().replaceAll('-', '');
}

let unique = 0;
export function buildShortUUID(prefix = ''): string {
  const time = Date.now();
  const randomBuffer = new Uint32Array(1);

  getBrowserCrypto().getRandomValues(randomBuffer);

  const randomValue = randomBuffer[0];
  const random = (randomValue ?? 0) % 1_000_000_000;

  unique++;
  return `${prefix}_${random}${unique}${String(time)}`;
}
