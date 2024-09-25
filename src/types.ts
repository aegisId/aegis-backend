export interface UserPostRequest {
  wallet_address: string;
  twitter_username: string;
  is_Verified: Boolean;
  wallets_last_sequence_no: Number;
  wallets_last_version_no: Number;
  wallet_score: Number;
  kyc_points: Number;
  biometric_points: Number;
  social_points: Number;
  on_chain_points: Number;
}
