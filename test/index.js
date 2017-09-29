const { expect } = require('chai');

const flatten = require('../index.js');

describe('mongo-flatten', () => {
    describe('Simple two level nesting', () => {
        it('should show correct structure', () => {
            const dummy = {
                sample: {
                    levelTwo: 'sample levelTwo!'
                }
            };

            const result = flatten(dummy);

            expect(JSON.stringify(result)).to.equal(
                JSON.stringify({ 'sample.levelTwo': 'sample levelTwo!' })
            );
        });
    });

    describe('Documents with arrays', () => {
        it('should flatten arrays with correct indices', () => {
            const dummy = {
                sample: {
                    levelTwo: 'sample levelTwo!'
                },
                arr: ['one', 'two', 'three']
            };

            const result = flatten(dummy);

            expect(JSON.stringify(result)).to.equal(
                JSON.stringify({
                    'sample.levelTwo': 'sample levelTwo!',
                    'arr.0': 'one',
                    'arr.1': 'two',
                    'arr.2': 'three'
                })
            );
        });
    });

    describe('Documents with collections (arrays of documents)', () => {
        it('should flatten arrays with correct indices', () => {
            const dummy = {
                sample: {
                    levelTwo: 'sample levelTwo!'
                },
                arr: ['one', 'two', 'three'],
                collection: [
                    {
                        id: 1
                    },
                    {
                        id: 2
                    }
                ]
            };

            const result = flatten(dummy);

            expect(JSON.stringify(result)).to.equal(
                JSON.stringify({
                    'sample.levelTwo': 'sample levelTwo!',
                    'arr.0': 'one',
                    'arr.1': 'two',
                    'arr.2': 'three',
                    'collection.0.id': 1,
                    'collection.1.id': 2
                })
            );
        });
    });

    describe('It should properly handle Date objects', () => {
        it('should not give [object Object] for Date', () => {
            const dummy = {
                d: new Date(1506673237148)
            };

            const result = flatten(dummy);

            expect(JSON.stringify(result)).to.equal(
                JSON.stringify({ d: '1506673237148' })
            );
        });
    });
});
