import BN from 'bn.js'
// type Address = string // Ethereum address (lowercase)
// type BN = string // big number (that should be casted into a BigInt/BN.js object)
// type Date = number // date in milliseconds
// type Duration = number // duration in milliseconds

const DurationInMillis = 14400000
const DateInMillis = 1595326297118
const ipfsUri = 'QmXpcBiGZ7Uep2tmhxLhfA8ak1aYDUyevFSnpUa4Gc9kRn'

const genericAddress = '0x7c708ac7db979fa06705f8880f29f82cfc406993'
const antAddress = '0x960b236A07cf122663c4303350609A66A7B288C0'
const votingAddress = '0x773eae25e59abd6dccf33662b344be68f541c707'

const disputableApp = {
  active: true,
  appAddress: votingAddress, // this will allow you to find more details from the `apps()` observable
  collateralToken: {
    address: antAddress,
    decimals: 18, // usually 18 but may be lower (e.g. 6 for USDC)
    name: 'name', // string | null
    symbol: 'symbol', // string | null
  },
  actionAmount: new BN(100),
  challengeAmount: new BN(100),
  challengeDuration: DurationInMillis,
}

const signature = {
  settingVersionId: new BN(12345),
  date: DateInMillis,
}

const signer = {
  lastSignedVersionId: new BN(12345),
  signedFor: [signature],
}

const version = {
  id: new BN(12345),
  title: 'Agreement Title',
  contentUri: ipfsUri, // decoded URI for content, usually in the form of 'ipfs:...'
  content: 'blob', // content data, if it was fetch-able
  arbitrator: genericAddress,
  aragonAppFeesCashier: genericAddress,
  effectiveFrom: DateInMillis,
}

const agreement = {
  connectedApps: [disputableApp, disputableApp],
  currentVersion: version,
  signers: {
    addressKey: signer,
  },
  stakingPool: genericAddress,
  versions: [version, version],
}

export default [agreement, agreement, agreement]
