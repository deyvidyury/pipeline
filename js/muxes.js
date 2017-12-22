function MUX(arr_in,signal){
  this.in = arr_in.slice(0);
  this.signal = signal;
  this.out = this.in[this.signal];
}
MUX.prototype = {
	update: function(arr_in,signal){
		this.in = arr_in.slice(0);
  	this.signal = signal;
		this.out = this.in[this.signal];
	}
};

var MUXalu1 = new MUX([EX_MEM.aluOutput,MEM_WB.rfWriteData,WB_END.rfWriteData,ID_EX.operand1],CTL5.MUXalu1);
var MUXpc = new MUX([ID_EX.PC + 1 + ID_EX.operand0,MUXalu1.out,PROGRAMCOUNTER.value + 1],CTL3.MUXpc);
// Teste
// var MUXpc = new MUX([0,0,PROGRAMCOUNTER.value + 1],2);

var MUXs2 = new MUX([IF_ID.rA,IF_ID.rC],CTL6.MUXs2);
var MUXop0 = new MUX([LEFT_SHIFT_6.value,SIGN_EXT_7.value],CTL6.MUXop0);
var MUXalu2 = new MUX([ID_EX.operand2,WB_END.rfWriteData,MEM_WB.rfWriteData,EX_MEM.aluOutput],CTL5.MUXalu2);

var MUXimm = new MUX([ID_EX.operand0,ID_EX.PC+1,MUXalu2.out],CTL4.MUXimm);
var MUXout = new MUX([DATAMEMORY.DATA_OUT,EX_MEM.aluOutput],CTL2.MUXout);