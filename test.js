
const babel = require('babel-core');
const assert = require('assert');
const diff =  require('diff');
const chalk = require('chalk');

const input = `
import A from 'a';

import('./a.js').then(({default: A}) => {});

import( /* webpackChunkName: "yadda" */ './a.js').then(({ default: A }) => {});

import( /* webpackPrefetch: true */ './a.js').then(({ default: A }) => {});

import( /* webpackPrefetch: true */ /* webpackChunkName: "A" */ './a.js').then(({ default: A }) => {});
`

const output = `
import A from 'a';

import( /* webpackChunkName: "A" */ './a.js').then(({ default: A }) => {});

import( /* webpackChunkName: "yadda" */ './a.js').then(({ default: A }) => {});

import( /* webpackPrefetch: true */ /* webpackChunkName: "A" */ './a.js').then(({ default: A }) => {});

import( /* webpackPrefetch: true */ /* webpackChunkName: "A" */ './a.js').then(({ default: A }) => {});
`;

const transformedCode = babel.transform(input, {
    plugins: [
        'syntax-dynamic-import',
        './'
    ]
}).code;

const failed = diff.diffChars(transformedCode, output).reduce((memo, item) => {
    const removed = item.removed;
    const added = item.added;
    const value = removed || added ? item.value.replace(' ', '⎵') : item.value;

    const color = removed ? 'red': (added ? 'green' : 'white');
    process.stdout.write(chalk[color](value));

    return memo || removed;
}, false);

if (failed) {
    console.error(chalk.bold.red('\nTest failed.\n'));
    process.exit(1);
} else {
    console.info(chalk.bold.green('\nTest passed.\n'));
    process.exit(0);
}
