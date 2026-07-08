/**
 * AES-GCM encryption at rest using the Web Crypto API.
 *
 * All personal data (journal, case notes, cycle logs, japa counts,
 * vocabulary, dream logs, integration check-ins) is encrypted with
 * AES-256-GCM before being stored in localStorage. The key is derived
 * from the user's passphrase using PBKDF2 with 100,000 iterations.
 *
 * No plaintext personal data ever leaves the browser. No server, no
 * account, no cloud, no telemetry.
 */

const PBKDF2_ITERATIONS = 100_000;
const SALT_LENGTH = 16;       // bytes
const IV_LENGTH = 12;         // bytes (AES-GCM standard)
const KEY_LENGTH = 256;       // bits

/**
 * Derive an AES-GCM key from a passphrase + salt using PBKDF2.
 * The salt is stored alongside the encrypted data (not secret — its
 * purpose is to prevent rainbow-table attacks).
 */
export async function deriveKey(
  passphrase: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase) as BufferSource,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: KEY_LENGTH },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypt a plaintext string using AES-GCM.
 * Returns a base64-encoded blob containing salt + iv + ciphertext.
 */
export async function encrypt(
  plaintext: string,
  passphrase: string,
  existingSalt?: Uint8Array
): Promise<string> {
  const salt = existingSalt ?? crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const key = await deriveKey(passphrase, salt);
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const enc = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    enc.encode(plaintext) as BufferSource
  );
  // Pack salt + iv + ciphertext into a single Uint8Array
  const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(ciphertext), salt.length + iv.length);
  // Base64 encode for localStorage storage
  return bytesToBase64(combined);
}

/**
 * Decrypt a base64-encoded blob back to plaintext.
 * Throws if the passphrase is wrong (AES-GCM authentication fails).
 */
export async function decrypt(
  blob: string,
  passphrase: string
): Promise<string> {
  const combined = base64ToBytes(blob);
  const salt = combined.slice(0, SALT_LENGTH);
  const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const ciphertext = combined.slice(SALT_LENGTH + IV_LENGTH);
  const key = await deriveKey(passphrase, salt);
  const dec = new TextDecoder();
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    ciphertext as BufferSource
  );
  return dec.decode(plaintext);
}

/**
 * Generate a random salt (for first-run vault setup).
 */
export function generateSalt(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
}

// ---------- Base64 helpers (for Uint8Array <-> string) ----------

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Simple SHA-256 hash for passphrase verification (not for security —
 * just to check if the passphrase is correct before attempting decryption).
 * The first-run hash is stored at vault-setup; on unlock, we hash the
 * entered passphrase and compare.
 */
export async function hashPassphrase(passphrase: string, salt: Uint8Array): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase + ":" + bytesToBase64(salt)) as BufferSource,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return bytesToBase64(new Uint8Array(bits));
}
