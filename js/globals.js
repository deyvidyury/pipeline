// PStall signal
var PSTALL = 0;

// PStomp Signal
var PSTOMP = 0;

// Program counter register
var PROGRAMCOUNTER = {};
PROGRAMCOUNTER.value = 0;
PROGRAMCOUNTER.update = function(){
    if(INSTRUCTION_MEMORY[PROGRAMCOUNTER.value] !== undefined){
        PROGRAMCOUNTER.value = MUXpc.out;
    } else {
        PROGRAMCOUNTER.value = PROGRAMCOUNTER.value;
    }
}

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
// var INSTRUCTION_MEMORY =   ['0010010000000011'];

// Register FIles
var REGISTERFILE = {};
// 8 registers
REGISTERFILE.registers = [0,0,0,0,0,0,0,0];

// addresses input
REGISTERFILE.SRC1 = 0;
REGISTERFILE.SRC2 = 0;
REGISTERFILE.TGT = 0;
// data input
REGISTERFILE.TGT_DATA = 0;

REGISTERFILE.WErf = 0;

// data output
REGISTERFILE.SRC2_DATA = 0;
REGISTERFILE.SRC1_DATA = 0;

REGISTERFILE.update = function(){
    REGISTERFILE.SRC1 = bin2dec(IF_ID.rB_OUT);
    REGISTERFILE.SRC2 = bin2dec(MUXs2.out);
    REGISTERFILE.TGT = bin2dec(MEM_WB.rT_OUT);


    REGISTERFILE.WErf = CTL1.WErf; // Off = 0; On = 1

    if(REGISTERFILE.WErf){
        REGISTERFILE.TGT_DATA = MEM_WB.rfWriteData_OUT;
        REGISTERFILE[REGISTERFILE.RGT] = REGISTERFILE.TGT_DATA;
    }

    // data output
    REGISTERFILE.SRC2_DATA = REGISTERFILE.registers[REGISTERFILE.SRC2];
    REGISTERFILE.SRC1_DATA = REGISTERFILE.registers[REGISTERFILE.SRC1];
}

// Data memory
var DATAMEMORY = {};
// data input
DATAMEMORY.DATA_IN = '0000000000000000';
DATAMEMORY.ADDR = '0000000000000000';
DATAMEMORY.WEdmem = 0;

// data output
DATAMEMORY.DATA_OUT = '0000000000000000';

// Function to update the instruction memory in case WEdmem is 1
DATAMEMORY.update = function(){
    // data input
    DATAMEMORY.DATA_IN = EX_MEM.storeData_OUT;
    DATAMEMORY.ADDR = EX_MEM.aluOutput_OUT;
    DATAMEMORY.WEdmem = CTL2.WEdmem;

    // data output
    if(DATAMEMORY.WEdmem){
        //DATAMEMORY.DATA_OUT = INSTRUCTION_MEMORY[REGISTERFILE.ADDR];
        DATAMEMORY.DATA_OUT = DATAMEMORY.DATA_IN;
        // Update INSTRUCTION_MEMORY
    } else {
        DATAMEMORY.DATA_OUT = '0000000000000000';
    }
};

var ALU = {};
// IN
ALU.SRC2 = 0;
ALU.SRC1 = 0;

// FUNC
ALU.Func = 'ADD';
// OUT
ALU.out = 0; // To be implemented

// SIGNALS
ALU.EQ = 0;
ALU.update = function(){
    // IN
    ALU.SRC2 = MUXimm.out;
    ALU.SRC1 = MUXalu1.out;

    // FUNC
    ALU.Func = CTL3.FUNCalu;

    // OUT
    // ALU.out = '?'; // To be implemented
    if(ALU.Fun === 'ADD'){
      ALU.out = BinSum(ALU.SCR1,ALU.SCR2);
    } else if (ALU.Fun === 'NAND'){
      ALU.out = Nand(ALU.SCR1,ALU.SCR2);
    } else if (ALU.Fun === 'PASS1') {
      ALU.out = ALU.SRC1;
    } else if (ALU.Fun === 'COMP'){
      if (ALU.SRC2 === ALU.SCR1){
        ALU.out = '0000000000000000';
      }
    }

    // SIGNALS
    ALU.EQ = (ALU.SRC2 === ALU.SRC1) ? 1 : 0;
};




// Auxiliary registers
var LEFT_SHIFT_6 = {};
LEFT_SHIFT_6.value = 0; // Apply corrent operation
LEFT_SHIFT_6.update = function(){
    // LEFT_SHIFT_6.value = LEFT_SHIFT_6.toString(16); // Apply corrent operation
    LEFT_SHIFT_6.value = ''.concat((IF_ID.rB_OUT+'').toString(3), (IF_ID.imm_OUT+'').toString(4), (IF_ID.rC_OUT+'').toString(3) , '000000');
    LEFT_SHIFT_6.value = bin2dec(LEFT_SHIFT_6.value);
};

var SIGN_EXT_7 = {};
SIGN_EXT_7.value = 0; // Apply corrent operation
SIGN_EXT_7.update = function(){
    SIGN_EXT_7.value = ''.concat((IF_ID.imm_OUT+'').toString(4), (IF_ID.rC_OUT+'').toString(3)); // Apply corrent operation
    if(SIGN_EXT_7.value.charAt(0) === '0'){
        SIGN_EXT_7.value = '000000000' + SIGN_EXT_7.value;
    } else {
        SIGN_EXT_7.value = '111111111' + SIGN_EXT_7.value;
    }
    SIGN_EXT_7.value = bin2dec(SIGN_EXT_7.value);
};
