
export function log(target, name, descriptor) {

    // obtain the original function
    let fn = descriptor.value;

    // create a new function that sandwiches
    // the call to our original function between
    // two logging statements
    let newFn  = function() {
        console.log('starting %s', name);
        fn.apply(target, arguments);
        console.log('ending %s', name);
    };

    // we then overwrite the origin descriptor value
    // and return the new descriptor
    descriptor.value = newFn;
    return descriptor;
}
