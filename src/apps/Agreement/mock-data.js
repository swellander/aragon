// https://gist.github.com/sohkai/7b3385a08ca49ce39935d5b76bf8ef82#example

const disputableApp = {
  active: true,
  appAddress: '0x5c6620c49f9aecf74bd483054f2d0ace0d375f96', // this will allow you to find more details from the `apps()` observable
  collateralToken: '0x3AF6b2f907F0c55F279e0ED65751984E6cdC4a42',
  actionAmount: '100000000000000000000',
  challengeAmount: '200000000000000000000',
  challengeDuration: 172800,
}

const signature = {
  versionId: '1',
  date: 1594076738116,
  transaction:
    '0x3f175da3d499fa6be0c4f4b73eebdde8386dfbd64ae5f858c53f667f1405a959',
}

const signer = {
  lastSignedVersionId: '1',
  signatures: [signature],
}

const version = {
  id: '1',
  title: 'Test Agreement',
  content: 'ipfs:Qmb5CHbQQQx6YXkPE6HodeXVmtCRgpSgkj9EkW9xs6jDHj', // decoded URI for content, usually in the form of 'ipfs:...'
  arbitrator: '0x06a3FA06F9Bfa8d945C367D183d1562bCe0500DB',
  aragonAppFeesCashier: '0x45C8e37ef5bB4C6681351282D7d0CedA58BB7EB0',
  effectiveFrom: 1594076738116,
}

const agreement = {
  appAddress: '0x5c6620c49f9aecf74bd483054f2d0ace0d375f96',
  connectedApps: [disputableApp],
  currentVersion: version,
  signers: {
    '0x0090aed150056316e37fe6dfa10dc63e79d173b6': signer,
  },
  stakingPool: '0x190B8fed21E1Efd6515E4cC9B3D07eF44Af81865',
  versions: [version],
}

export default [agreement, agreement, agreement]
