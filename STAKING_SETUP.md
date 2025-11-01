# AIPG Staking UI Setup

## ✅ What's Done

- RainbowKit wallet connection
- Staking interface at `/staking`
- Stake/Unstake/Claim functionality
- Real-time APY display
- Beautiful UI matching your site design
- Added "Stake" link to navbar (cyan colored)

## 🔧 Setup Required

### 1. Get WalletConnect Project ID

1. Go to https://cloud.walletconnect.com
2. Create a free account
3. Create a new project
4. Copy your Project ID
5. Update `lib/wagmiConfig.js`:

```javascript
projectId: 'YOUR_ACTUAL_PROJECT_ID_HERE'
```

### 2. Test Locally

```bash
cd aipg-website-staking
npm install
npm run dev
```

Visit http://localhost:3000/staking

### 3. Deploy to Vercel

```bash
git add .
git commit -m "Add staking interface with RainbowKit"
git push origin main
```

Vercel will auto-deploy!

## 📁 New Files Created

- `app/staking/page.js` - Staking page
- `components/StakingInterface.jsx` - Main staking UI
- `hooks/useStaking.js` - Staking logic & contract calls
- `lib/stakingContracts.js` - Contract addresses & ABIs
- `lib/wagmiConfig.js` - Wagmi/RainbowKit config
- Updated `context/Providers.js` - Added RainbowKit providers
- Updated `components/Navbar.js` - Added "Stake" link
- Updated `app/globals.css` - Added RainbowKit styles

## 🎨 Features

- **Connect Wallet**: RainbowKit with MetaMask, Coinbase, WalletConnect, etc.
- **Stake**: Approve & stake AIPG tokens
- **Unstake**: Withdraw anytime (no lockup)
- **Claim**: Claim rewards whenever you want
- **Live Stats**: APY, staked balance, pending rewards, wallet balance
- **Beautiful UI**: Matches your site design with gradients & glassmorphism

## 🔗 Contract Addresses (Base Mainnet)

- **StakingVault**: `0x3ED14A6D5A48614D77f313389611410d38fd8277`
- **AIPG Token**: `0xa1c0deCaFE3E9Bf06A5F29B7015CD373a9854608`

## 🚀 Next Steps

1. Get WalletConnect Project ID
2. Test locally
3. Push to GitHub
4. Vercel auto-deploys
5. Share the link!

## 💡 Optional Enhancements

- Add transaction notifications (toast messages)
- Add loading animations
- Add "Exit" button (unstake all + claim in one tx)
- Add staking history/events
- Add referral system

