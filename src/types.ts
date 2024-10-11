export interface UserModel {
  wallet_address: string;
  twitter_username: string | undefined;
  is_twitter_verified: string | undefined;
  discord_username: string | undefined;
  is_discord_verified: string | undefined;
  telegram_username: string | undefined;
  is_telegram_verified: string | undefined;
  wallets_last_sequence_no: number | undefined;
  wallets_last_version_no: number | undefined;
  wallet_score: number | undefined;
  kyc_points: number | undefined;
  biometric_points: number | undefined;
  social_points: number | undefined;
  on_chain_points: number | undefined;
}
