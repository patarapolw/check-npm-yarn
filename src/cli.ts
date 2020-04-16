#!/usr/bin/env node
import fs from 'fs'

import meow from 'meow'
import logSymbols from 'log-symbols'

const userAgent = (process.env.npm_config_user_agent || '').split('/') || 'unknown'

const { input, flags } = meow(`
  Usage
    $ check-npm-yarn <type>
    ✔ You are using <type>
  
  Options
    --quiet  Silence output (useful for scripts)
  
  Exits with code 0 if the project uses <type>, otherwise code 2
`, {
  flags: {
    quiet: {
      type: 'boolean'
    }
  }
})

const typeSpecified = input[0] || userAgent
const typeChecked = fs.existsSync('package-lock.json') ? 'npm'
  : fs.existsSync('yarn.lock') ? 'yarn'
    : fs.existsSync('store.json') ? 'pnpm' // https://pnpm.js.org/en/about-package-store#storejson
      : ''

if (!typeChecked && !input[0]) {
  if (!flags.quiet) {
    console.log(`${logSymbols.success} Feel free to use NPM or Yarn`)
  }

  process.exit(0)
} else if (typeSpecified === typeChecked) {
  if (!flags.quiet) {
    console.log(`${logSymbols.success} You are using ${typeSpecified}`)
  }

  process.exit(0)
} else {
  if (!flags.quiet) {
    console.log(`${logSymbols.error} You are not using ${typeSpecified}`)
  }

  process.exit(2)
}
