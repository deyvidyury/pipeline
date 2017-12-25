function MUX(arr_in,signal){
  this.in = arr_in.slice();
  this.signal = signal;
  this.out = this.in[this.signal];
}
MUX.prototype = {
	update: function(arr_in,signal){
		this.in = arr_in.slice();
  	this.signal = signal;
		this.out = this.in[this.signal];
	}
};

var MUXalu1 = new MUX([EX_MEM.aluOutput_OUT,MEM_WB.rfWriteData_OUT,WB_END.rfWriteData_OUT,ID_EX.operand1_OUT],CTL5.MUXalu1);
var MUXpc = new MUX([ID_EX.PC_OUT + 1 + ID_EX.operand0_OUT,MUXalu1.out,PROGRAMCOUNTER.value + 1],CTL3.MUXpc);
// Teste
// var MUXpc = new MUX([0,0,PROGRAMCOUNTER.value + 1],2);

var MUXs2 = new MUX([IF_ID.rA_OUT,IF_ID.rC_OUT],CTL6.MUXs2);
var MUXop0 = new MUX([LEFT_SHIFT_6.value,SIGN_EXT_7.value],CTL6.MUXop0);
var MUXalu2 = new MUX([ID_EX.operand2_OUT,WB_END.rfWriteData_OUT,MEM_WB.rfWriteData_OUT,EX_MEM.aluOutput_OUT],CTL5.MUXalu2);

var MUXimm = new MUX([ID_EX.operand0_OUT,ID_EX.PC_OUT+1,MUXalu2.out],CTL4.MUXimm);
var MUXout = new MUX([DATAMEMORY.DATA_OUT,EX_MEM.aluOutput_OUT],CTL2.MUXout);