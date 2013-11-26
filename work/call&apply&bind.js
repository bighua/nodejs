var someuser = {
name: 'byvoid',
func: function() {
console.log(this.name);
},
says: function(act, obj) {
console.log(this.name + ' ' + act + ' ' + obj);
}
};
var foo = {
name: 'foobar'
};
someuser.func(); // byvoid
foo.func = someuser.func;
foo.func(); // foobar
name = 'global';
func = someuser.func;
func(); // global

// call
someuser.says.call(foo, 'love', 'U'); // foobar love U
// apply
someuser.says.apply(foo, ['love', 'U']); // foobar love U
// bind
bindFunc = someuser.func.bind(foo);
bindFunc();  // foobar
// bind params
bindParam = someuser.says.bind(foo, 'hate');
bindParam('Me');  // foobar hate U
// bind twice is unavialbe
bindFunc2 = bindFunc.bind(someuser);
bindFunc2(); // foobar
