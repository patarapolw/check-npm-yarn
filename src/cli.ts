#!/usr/bin/env node
import meow from 'meow'

import { checkNpmYarn } from './check'

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

checkNpmYarn(input[0], flags)
