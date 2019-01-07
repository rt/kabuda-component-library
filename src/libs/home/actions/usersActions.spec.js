//import * as ActionTypes from '../constants/actionTypes';
//import * as ActionCreators from './usersActions';

//import sinon from 'sinon';
//import sinonChai from 'sinon-chai';
//import MockDate from 'mockdate';
//import chai, { expect } from 'chai';

//import Ajax from '../utils/ajax';

//describe('Actions', () => {
    //let dateModified;
    //before(() => {
        //MockDate.set(new Date());
        //dateModified = dateHelper.getFormattedDateTime();
    //});
    //after(() => MockDate.reset());

    //const appState = {
        //username: 'ryan',
        //password: 'pass',
        //gender: 'male',
        //displayResults: false,
        //dateModified: null,
    //};

    //it('should create an action to save a user', (done) => {
       
        //const stub = sinon.stub(Ajax, 'put').returns(new Promise((resolve, reject) => {
            //resolve();
        //}));
        
        //const expected = {
            //type: ActionTypes.SAVE_USER,
            ////dateModified,
            //settings: appState
        //};
        //const dispatch = sinon.spy((action) => {
            //// finally assert that the dispatch was called with our expected action
            ////expect(dispatch).to.have.been.calledWith(sinon.match((o) => {
            ////return o.type === ActionTypes.SAVE_USER;
            ////}));
            //expect(dispatch).to.have.been.calledWith(expected);
            //done();
        //});
        

        //// we expect this to return a function since it is a thunk
        //expect(typeof (ActionCreators.saveUser(appState))).to.equal('function');
        //// then we simulate calling it with dispatch as the store would do
        //ActionCreators.saveUser(appState)(dispatch);

        //expect(stub).to.have.been.calledWith('/users', 1, {username: appState.username, password: appState.password});
        
    //});

    //it('should create an action to check username', () => {
        //const fieldName = 'username';
        //const value = 'susan';
        //const actual = ActionCreators.checkUsername(appState, fieldName, value);
        //const expected = {
            //type: ActionTypes.CHECK_USERNAME,
            //dateModified,
            //settings: appState,
            //fieldName,
            //value
        //};

        //expect(actual).to.deep.equal(expected); // Notice use of deep because it's a nested object
        //// expect(actual).to.equal(expected); // Fails. Not deeply equal
    //});
//});
