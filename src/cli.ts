#!/usr/bin/env node
import fs from 'fs'

import meow from 'meow'
import logSymbols from 'log-symbols'
import { isNpm, isYarn } from 'is-npm'

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

const typeSpecified = input[0] || (isNpm ? 'npm' : isYarn ? 'yarn' : 'unknown')
const typeChecked = fs.existsSync('package-lock.json') ? 'npm' : fs.existsSync('yarn.lock') ? 'yarn' : 'unknown'

if (!typeChecked && !input[0]) {
  if (!flags.quiet) {
    console.log(`${logSymbols.success} Feel free to use NPM or Yarn`)
  }

  process.exit(0)
} else if (typeSpecified === typeChecked) {
  if (!flags.quiet) {
    console.log(`${logSymbols.success} You are using ${typeChecked}`)
  }

  process.exit(0)
} else {
  if (!flags.quiet) {
    console.log(`${logSymbols.error} You are not using ${typeChecked}`)
  }

  process.exit(2)
}
