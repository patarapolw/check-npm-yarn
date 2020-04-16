# check-npm-yarn

CLI to check NPM or Yarn if specified, or look for package-lock.json or yarn.lock

```txt
  Usage
    $ check-npm-yarn <type>
    ✔ You are using <type>
  
  Options
    --quiet  Silence output (useful for scripts)
  
  Exits with code 0 if the project uses <type>, otherwise code 2
```

This is supposed to be used as a pre-install script, as follows in `package.json`.

```json
{
  "scripts": {
    "preinstall": "if command -v check-npm-yarn > /dev/null; then check-npm-yarn; fi"
  }
}
```

Or

```json
{
  "scripts": {
    "preinstall": "npx check-npm-yarn"
  }
}
```

## Caveat

- [preinstall npm hook doesn’t execute when installing a specific package](https://npm.community/t/preinstall-npm-hook-doesnt-execute-when-installing-a-specific-package/2505)
  - So, I created another cli script, `nsi`. Try this,

```sh
npm install -g check-npm-yarn
nsi packageA packageB packageC ...
```

## How

This uses <https://github.com/sindresorhus/is-npm>
