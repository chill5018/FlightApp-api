module.exports = {
  "env": {
    "node": true,
    "mocha": true
  },
  "extends": "eslint-config-riipen",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8
  },
  "rules": {
    "import/no-extraneous-dependencies": 0,
    "import/imports-first": "off",
    "import/no-named-as-default-member": "off"
  },
  "overrides": [
    {
      "files": ["*-test.js","*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ],
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  }
};
