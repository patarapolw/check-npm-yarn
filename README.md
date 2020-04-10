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
