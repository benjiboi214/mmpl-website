import { expect } from 'chai';
import app from '../../src/app';

describe('Sample Unit Test', () => {
    it('Sample Assertion', function() {
        expect(1).to.equal(1);
    });

    it('Secondary Unit on app', function() {
        expect(typeof(app.listen)).to.be.equal('function');
    });
});
