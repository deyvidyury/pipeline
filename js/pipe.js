// Implementation of Risc 16 pipeline
/*
 * Each stage will be modeled as a function. As last command in each function, the next stage will be called.
 * Control Modules and Muxes will be modeled as objects (state machines). As control modules and muxes are used and control several parts of the circuit, they will be global objects
 */
/*
OP_CODES:
add:  000 0
addi: 001 1
nand: 010 2
lui:  011 3
sw:   100 4
lw:   101 5
beq:  110 6
jalr: 111 7
*/

// Stages
// At the end of each stage, the interface registes must be set.

// Fetch instruction
function fetchStage(){
  // Atualiza registradores IF/ID
  IF_ID.update();
}

function decodeStage(){
  // atualiza CTL7
  CTL7.update();

  // atualiza CTL6
  CTL6.update();

  // atualiza left-shift-6
  LEFT_SHIFT_6.update();

  // atualiza sign-ext-7
  SIGN_EXT_7.update();

  // update MUXs2
  MUXs2.update([IF_ID.rA_OUT,IF_ID.rC_OUT],CTL6.MUXs2);

  // update MUXop0
  MUXop0.update([LEFT_SHIFT_6.value,SIGN_EXT_7.value],CTL6.MUXop0);

  // atualiza register file
  REGISTERFILE.update();

  // atualiza registradores ID_EX
  ID_EX.update();
}

function executeStage(){
    // Set CTR5
    CTL5.update();
    // Set CTL4
    CTL4.update();
    // Set CTL3
    CTL3.update();
    // Update alu2
    MUXalu2.update([ID_EX.operand2_OUT,WB_END.rfWriteData_OUT,MEM_WB.rfWriteData_OUT,EX_MEM.aluOutput_OUT],CTL5.MUXalu2);
    // Update alu1
    MUXalu1.update([EX_MEM.aluOutput_OUT,MEM_WB.rfWriteData_OUT,WB_END.rfWriteData_OUT,ID_EX.operand1_OUT],CTL5.MUXalu1);
    //update MUXimm
    MUXimm.update([ID_EX.operand0_OUT,ID_EX.PC_OUT+1,MUXalu2.out],CTL4.MUXimm);
    // Execute ALU
    ALU.update();
    // Update EX_MEM registers
    EX_MEM.update();
}

function memoryStage(){
    // Set CTR2
    CTL2.update();
    // Execute DATAMEMORY
    DATAMEMORY.update();
    // Update MUXout
    MUXout.update([DATAMEMORY.DATA_OUT,EX_MEM.aluOutput_OUT],CTL2.MUXout);
    // Update MEM_WB registers
    MEM_WB.update();
}

function writebackStage(){
    // Set CTR1
    CTL1.update();
    // Update WB_END registers
    WB_END.update();
}
