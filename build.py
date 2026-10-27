from pathlib import Path
root = Path(__file__).parent
files = ['stories.js', 'app.js', 'game.js']
(root / 'bundle.js').write_text('\n;\n'.join((root / name).read_text() for name in files))
