function f() {
var A = function(c, obj) {

	c.apply(obj);
};
var d = new D();
A(C, d);

var C = function() {
	alert(this.Da());
};

}
var D = function() {

	this.Da = function() {
		return 'bb';
	};
};

