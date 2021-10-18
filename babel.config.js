module.exports = {
  plugins: [
    [
      'babel-plugin-root-import',
      {
        'paths': [
          {
            rootPathPrefix: '@modules',
            rootPathSuffix: 'src/modules',
          },
          {
            rootPathPrefix: '@dto',
            rootPathSuffix: 'src/dto',
          },
          {
            rootPathPrefix: '@entities',
            rootPathSuffix: 'src/entities',
          },
        ]
      }
    ],
  ]
}
