#!/usr/bin/env node
import path from 'path'
import { spawnSync } from 'child_process'

import { checkNpmYarn, isNpm, isYarn, isPnpm } from './check'

let scriptIndex = 0

process.argv.map((arg, i) => {
  if (scriptIndex === 0 && path.basename(arg) === 'node') {
    scriptIndex = i + 1
  }
})

if (isNpm) {
  checkNpmYarn('npm')
  spawnSync('npm', [
    'install',
    ...process.argv.slice(scriptIndex + 1)
  ], {
    stdio: 'inherit'
  })
} else if (isYarn) {
  spawnSync('yarn', [
    'add',
    ...process.argv.slice(scriptIndex + 1)
  ], {
    stdio: 'inherit'
  })
} else if (isPnpm) {
  spawnSync('pnpm', [
    'add',
    ...process.argv.slice(scriptIndex + 1)
  ], {
    stdio: 'inherit'
  })
} else {
  console.log('Please run install using your favorite package manager.')
}
