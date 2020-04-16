#!/usr/bin/env node
import fs from 'fs'

import meow from 'meow'
import logSymbols from 'log-symbols'

const userAgent = (process.env.npm_config_user_agent || '').split('/')[0] || 'unknown'

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
let typeChecked = ''

const isNpm = fs.existsSync('package-lock.json')
const isYarn = fs.existsSync('yarn.lock')
const isPnpm = fs.existsSync('store.json') // https://pnpm.js.org/en/about-package-store#storejson

if (isPnpm) {
  // https://pnpm.js.org/en/limitations
  typeChecked = 'pnpm'
} else if (isNpm && !isYarn) {
  typeChecked = 'yarn'
} else if (isYarn && !isNpm) {
  typeChecked = 'npm'
}

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
