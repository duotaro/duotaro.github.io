// 許可されたユーザーID（個人用設定）
export const ALLOWED_USER_IDS = [
  // あなたのメインユーザーID
  'duotaro-main',
  
  // 必要に応じて追加のIDをここに記載
  // 'duotaro-mobile',
  // 'duotaro-work',
];

// Firebase匿名認証も許可するかどうか
export const ALLOW_FIREBASE_AUTH = true;

// エラーメッセージ
export const UNAUTHORIZED_MESSAGE = 'このユーザーIDは許可されていません。個人用アプリのため、指定されたIDのみアクセス可能です。';