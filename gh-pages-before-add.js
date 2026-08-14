// gh-pages internally clones this repo's default branch as a fallback when
// the gh-pages branch doesn't exist yet, so the checkout inherits our
// .gitignore (which ignores the generated index.html). That makes `git add`
// silently skip index.html when publishing. Remove the inherited .gitignore
// before the add step so the rendered site actually gets committed.
'use strict';
const fs = require('fs');
const path = require('path');

module.exports = function (git) {
  const gitignorePath = path.join(git.cwd, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    fs.unlinkSync(gitignorePath);
  }
};
