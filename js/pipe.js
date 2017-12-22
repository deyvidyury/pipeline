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

  $("#program-counter").html((PROGRAMCOUNTER.value+'').toString(16));
  // $("#instruction-memory").html(INSTRUCTION_MEMORY.join('<br>'));

  $("#if-id .op").html(IF_ID.OP);
  $("#if-id .rA").html(IF_ID.rA);
  $("#if-id .rB").html(IF_ID.rB);
  $("#if-id .imm").html(IF_ID.imm);
  $("#if-id .rC").html(IF_ID.rC);
  $("#if-id .pc").html((IF_ID.PC+'').toString(16));
  // PROGRAMCOUNTER.update();
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
  MUXs2.update([IF_ID.rA,IF_ID.rC],CTL6.MUXs2);

  // update MUXop0
  MUXop0.update([LEFT_SHIFT_6.value,SIGN_EXT_7.value],CTL6.MUXop0);

  // atualiza register file
  REGISTERFILE.update();

  // atualiza registradores ID_EX
  ID_EX.update();

  // Draw registers
  $("#id-ex .op").html(ID_EX.OP);
  $("#id-ex .rT").html(ID_EX.rT);
  $("#id-ex .s1").html(ID_EX.s1);
  $("#id-ex .s2").html(ID_EX.s2);
  $("#id-ex .pc").html((ID_EX.PC+'').toString(16));
  $("#id-ex .operand0").html((ID_EX.operand0+'').toString(16));
  $("#id-ex .operand2").html((ID_EX.operand2+'').toString(16));
  $("#id-ex .operand1").html((ID_EX.operand1+'').toString(16));

}

function executeStage(){
    // Set CTR5
    CTL5.update();
    // Set CTL4
    CTL4.update();
    // Set CTL3
    CTL3.update();
    // Update alu2
    MUXalu2.update([ID_EX.operand2,WB_END.rfWriteData,MEM_WB.rfWriteData,EX_MEM.aluOutput],CTL5.MUXalu2);
    // Update alu1
    MUXalu1.update([EX_MEM.aluOutput,MEM_WB.rfWriteData,WB_END.rfWriteData,ID_EX.operand1],CTL5.MUXalu1);
    //update MUXimm
    MUXimm.update([ID_EX.operand0,ID_EX.PC+1,MUXalu2.out],CTL4.MUXimm);
    // Execute ALU
    ALU.update();
    // Update EX_MEM registers
    EX_MEM.update();
    // Draw registers
    $("#ex-mem .op").html(EX_MEM.OP);
    $("#ex-mem .rT").html(EX_MEM.rT);
    $("#ex-mem .pc").html((EX_MEM.PC+'').toString(16));
    $("#ex-mem .store-data").html((EX_MEM.storeData+'').toString(16));
    $("#ex-mem .alu-output").html((EX_MEM.aluOutput+'').toString(16));
}

function memoryStage(){
    // Set CTR2
    CTL2.update();
    // Execute DATAMEMORY
    DATAMEMORY.update();
    // Update MUXout
    MUXout.update([DATAMEMORY.DATA_OUT,EX_MEM.aluOutput],CTL2.MUXout);
    // Update MEM_WB registers
    MEM_WB.update();
    // Draw registers
    $("#mem-wb .rT").html(MEM_WB.rT);
    $("#mem-wb .rf-Write-Data").html(MEM_WB.rfWriteData);
}

function writebackStage(){
    // Set CTR1
    CTL1.update();
    // Update WB_END registers
    WB_END.update();
    // Draw registers
    $("#wb-end .rT").html(WB_END.rT);
    $("#wb-end .rf-Write-Data").html(WB_END.rfWriteData);
}
