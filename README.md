# CharacterForge

A simple web app to create DND 5e characters

## Self-Hosting Usage
Simply clone the repository, and run these commands (you can substitute whatever JS runtime/package manager you prefer to use)

```bash
npm install
npm run build
```

Then the output site will be in `dist/` where it can then be served by the web server of your choice, for example:
```bash
cd dist
python3 -m http.server
```

## License and Attributions
CharacterForge is licensed under the MIT license

Some data sourced from [5e.tools](https://5e.tools)