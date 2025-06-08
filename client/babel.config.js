// configure babel for jest testing (Create some DOM, to run our tests)

export default presets = [
    ['@babel/preset-env', { targets: { node: 'current' } }]
]