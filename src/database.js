import MMKVStorage from 'react-native-mmkv-storage'

export default new MMKVStorage.Loader()
  .withEncryption()
  .initialize()
  // .clearStore()
