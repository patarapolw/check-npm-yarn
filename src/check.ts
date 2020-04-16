import fs from 'fs'

import logSymbols from 'log-symbols'

export const isNpm = fs.existsSync('package-lock.json')
export const isYarn = fs.existsSync('yarn.lock')
export const isPnpm = fs.existsSync('store.json') // https://pnpm.js.org/en/about-package-store#storejson

export function checkNpmYarn (inputAgent: string = '', opts: any = {}) {
  const typeSpecified = inputAgent || (process.env.npm_config_user_agent || '').split('/')[0] || 'unknown'
  let typeChecked = ''

  if (isPnpm) {
    // https://pnpm.js.org/en/limitations
    typeChecked = 'pnpm'
  } else if (isNpm && !isYarn) {
    typeChecked = 'npm'
  } else if (isYarn && !isNpm) {
    typeChecked = 'yarn'
  }

  if (!typeChecked && !inputAgent) {
    if (!opts.quiet) {
      console.log(`${logSymbols.success} Feel free to use NPM or Yarn`)
    }
  } else if (typeSpecified === typeChecked) {
    if (!opts.quiet) {
      console.log(`${logSymbols.success} You are using ${typeSpecified}`)
    }
  } else {
    if (!opts.quiet) {
      console.log(`${logSymbols.error} You are not using ${typeSpecified}`)
    }

    process.exit(2)
  }
}
