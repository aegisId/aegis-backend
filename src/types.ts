export interface UserModel {
  wallet_address: string;
  twitter_username: string;
  is_twitter_verified: string;
  discord_username: string;
  is_discord_verified: string;
  telegram_username: string;
  is_telegram_verified: string;
  wallets_last_sequence_no: number;
  wallets_last_version_no: number;
  wallet_score: number;
  kyc_points: number;
  biometric_points: number;
  social_points: number;
  on_chain_points: number;
}
