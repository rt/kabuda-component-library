import { models } from 'kabuda-liquid';
import chai from 'chai';
import User from './user';

const expect = chai.expect;

describe('#User', () => {
    let model;

    describe('#deserialize', () => {
        it('should deserialize properties', () => {
            model = new User({
            });

            expect(model).to.be.instanceof(models.Model);
            expect(model).to.be.instanceof(User);
            expect(model.roles).to.be.instanceof(Array);
            expect(model.permissions).to.be.instanceof(Array);
            expect(model.userId).to.be.null;
            expect(model.passwordHash).to.be.null;
            expect(model.passwordSalt).to.be.null;
        });
    });

    describe('#generatePasswordHash', () => {
        it('should generate password hash and salt', () => {
            model = new User();
            model.generatePasswordHash('password');

            expect(model.passwordHash).to.be.defined;
            expect(model.passwordSalt).to.be.defined;
        });
    });

    describe('#validatePassword', () => {
        it('should validate password', () => {
            model = new User();
            model.generatePasswordHash('password');
            expect(model.validatePassword('password')).to.be.true;
            expect(model.validatePassword('something')).to.be.false;
        });
    });

    describe('#isAnnonymous', () => {
        it('should be annonymous if no userId', () => {
            model = new User();
            expect(model.isAnnonymous()).to.be.true;
        });

        it('should not be annonymous if userId', () => {
            model = new User({
                userId: 1,
            });
            expect(model.isAnnonymous()).to.be.false;
        });
    });

    describe('#isInRole', () => {
        it('should be true if role exists', () => {
            model = new User({
                roles: ['admin'],
            });
            expect(model.isInRole('admin')).to.be.true;
        });

        it('should be false if role exists', () => {
            model = new User({
                roles: ['user'],
            });
            expect(model.isInRole('admin')).to.be.false;
        });
    });

    describe('#hasPermission', () => {
        it('should be true if permission exists', () => {
            model = new User({
                permissions: ['perm1', 'perm2', 'perm3'],
            });
            expect(model.hasPermission('perm2')).to.be.true;
        });

        it('should be false if permission exists', () => {
            model = new User({
                permissions: ['perm1', 'perm2', 'perm3'],
            });
            expect(model.isInRole('perm4')).to.be.false;
        });
    });

    describe('#toClient', () => {
        it('should be true if permission exists', () => {
            model = new User({
                passwordHash: 'hash',
                passwordSalt: 'salt',
            });
            const clientVersion = model.toClient();
            expect(clientVersion.passwordHash).to.be.null;
            expect(clientVersion.passwordSalt).to.be.null;
            expect(clientVersion).to.be.instanceof(User);
        });
    });
});
