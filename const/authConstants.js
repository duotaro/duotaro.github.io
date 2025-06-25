// セキュリティ向上のため、カスタムユーザーIDシステムは無効化
// Firebase匿名認証のみを使用することで、なりすましを防止
export const ALLOWED_USER_IDS = [];

// Firebase匿名認証のみを使用（セキュリティ向上）
export const ALLOW_FIREBASE_AUTH = true;

// エラーメッセージ
export const UNAUTHORIZED_MESSAGE = 'このユーザーIDは許可されていません。個人用アプリのため、指定されたIDのみアクセス可能です。';