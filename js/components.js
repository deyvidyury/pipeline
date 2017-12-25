// Program Counter
var PROGRAMCOUNTER = {
    // init: 0, // To be changed on the very first time the program runs
    // value: (PROGRAMCOUNTER.init === 0) ? 0 : MUXpc.out
    // value: (PROGRAMCOUNTER.init === 0) ? 0 : 1
    init : 0,
    value :  (this.init) ? MUXpc.out : 0
};

// Instruction Memory
var INSTRUCTION_MEMORY =   ['1010010000000110',
                            '1010100010000010',
                            '0000010010000010',
                            '1100000010000001',
                            '1100000001111101',
                            '1110000000000000',
                            '0000000000000101',
                            '1111111111111111',
                            '0000000000000010'];


// Register FIles
var REGISTERFILE = {
  // 8 registers
  registers: [0,0,0,0,0,0,0,0],

  // addresses input
  SRC1: IF_ID.rB_OUT,
  SRC2: MUXs2.out,
  TGT: MEM_WB.rT_OUT,
  // data input
  TGT_DATA: MEM_WB.rfWriteData_OUT,

  WErf: CTL1.WErf,

  // data output
  SRC2_DATA: this.registers[this.SRC2],
  SRC1_DATA: this.registers[this.SRC1]

  // function to update instruciton memory
  // updateInstrutionMemory: function(){}
};

// Data memory
var DATAMEMORY = {
    // data input
    DATA_IN: EX_MEM.storeData_OUT,
    ADDR: EX_MEM.aluOutput_OUT,

    // data output
    DATA_OUT: INSTRUCTION_MEMORY[this.ADDR],

    // Function to update the instruction memory in case WEdmem is 1
}

var ALU = {
    // IN
    SRC2: MUXimm.out,
    SRC1: MUXalu1.out,

    // FUNC

    // OUT
    out: '?', // To be implemented

    // SIGNALS
    EQ: (this.SRC2 === this.SRC1) ? 1 : 0
}
