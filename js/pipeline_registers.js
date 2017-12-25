var IF_ID = {};
IF_ID.PC_IN = 0;
IF_ID.OP_IN  = '000';
IF_ID.rA_IN  = '000';
IF_ID.rB_IN  = '000';
IF_ID.rC_IN  = '000';
IF_ID.imm_IN = '0000';

IF_ID.OP_OUT = IF_ID.OP_IN;
IF_ID.rA_OUT = IF_ID.rA_IN;
IF_ID.rB_OUT = IF_ID.rB_IN;
IF_ID.rC_OUT = IF_ID.rC_IN
IF_ID.imm_OUT = IF_ID.imm_IN;
IF_ID.PC_OUT = IF_ID.PC_IN;

IF_ID.Pstomp = 0;
IF_ID.update = function(){

    // Update out values
    IF_ID.OP_OUT = IF_ID.OP_IN;
    IF_ID.rA_OUT = IF_ID.rA_IN;
    IF_ID.rB_OUT = IF_ID.rB_IN;
    IF_ID.rC_OUT = IF_ID.rC_IN
    IF_ID.imm_OUT = IF_ID.imm_IN;
    IF_ID.PC_OUT = IF_ID.PC_IN;

    IF_ID.Pstomp = CTL3.Pstomp;
    IF_ID.PC_IN = PROGRAMCOUNTER.value;

    if(INSTRUCTION_MEMORY[PROGRAMCOUNTER.value] === undefined){
        IF_ID.OP_IN = '000';
        IF_ID.rA_IN = '000';
        IF_ID.rB_IN = '000';
        IF_ID.rC_IN = '000';
        IF_ID.imm_IN = '0000';
    } else {
        if (!IF_ID.Pstomp) {
            IF_ID.OP_IN  = INSTRUCTION_MEMORY[IF_ID.PC_IN].slice(0,3);
            IF_ID.rA_IN  = INSTRUCTION_MEMORY[IF_ID.PC_IN].slice(3,6);
            IF_ID.rB_IN  = INSTRUCTION_MEMORY[IF_ID.PC_IN].slice(6,9);
            IF_ID.rC_IN  = INSTRUCTION_MEMORY[IF_ID.PC_IN].slice(13);
            IF_ID.imm_IN = INSTRUCTION_MEMORY[IF_ID.PC_IN].slice(9,13);
        } else {
            IF_ID.OP_IN  = '000';
            IF_ID.rA_IN  = '000';
            IF_ID.rB_IN  = '000';
            IF_ID.rC_IN  = '000';
            IF_ID.imm_IN = '0000';
        };
    }
}

var ID_EX = {}
ID_EX.OP_IN = '000';
ID_EX.rT_IN = '000';
ID_EX.s1_IN = '000';
ID_EX.s2_IN = '000';
ID_EX.PC_IN = 0;
ID_EX.operand0_IN = 0;
ID_EX.operand2_IN = 0;
ID_EX.operand1_IN = 0;

ID_EX.OP_OUT = ID_EX.OP_IN;
ID_EX.rT_OUT = ID_EX.rT_IN;
ID_EX.s1_OUT = ID_EX.s1_IN;
ID_EX.s2_OUT = ID_EX.s2_IN;
ID_EX.PC_OUT = ID_EX.PC_IN;
ID_EX.operand0_OUT = ID_EX.operand0_IN;
ID_EX.operand2_OUT = ID_EX.operand2_IN;
ID_EX.operand1_OUT = ID_EX.operand1_IN;

ID_EX.Pstomp = 0;

ID_EX.update = function(){
    // Update out values
    ID_EX.OP_OUT = ID_EX.OP_IN;
    ID_EX.rT_OUT = ID_EX.rT_IN;
    ID_EX.s1_OUT = ID_EX.s1_IN;
    ID_EX.s2_OUT = ID_EX.s2_IN;
    ID_EX.PC_OUT = ID_EX.PC_IN;
    ID_EX.operand0_OUT = ID_EX.operand0_IN;
    ID_EX.operand2_OUT = ID_EX.operand2_IN;
    ID_EX.operand1_OUT = ID_EX.operand1_IN;

    ID_EX.Pstomp = CTL3.Pstomp;
    ID_EX.PC_IN = IF_ID.PC_OUT;
    if(!ID_EX.Pstomp){
        ID_EX.OP_IN = CTL7.OP_OUT;
        ID_EX.rT_IN = CTL7.rT_OUT;
        ID_EX.s1_IN = IF_ID.rB;
        ID_EX.s2_IN = MUXs2.out;
        ID_EX.operand0_IN = MUXop0.out;
        ID_EX.operand2_IN = REGISTERFILE.SRC2_DATA;
        ID_EX.operand1_IN = REGISTERFILE.SRC1_DATA;
    } else {
        ID_EX.OP_IN = '000';
        ID_EX.rT_IN = '000';
        ID_EX.s1_IN = '000';
        ID_EX.s2_IN = '000';
        ID_EX.operand0_IN = 0;
        ID_EX.operand2_IN = 0;
        ID_EX.operand1_IN = 0;
    }
};


var EX_MEM = {};
EX_MEM.OP_IN = '000';
EX_MEM.rT_IN = '000';
EX_MEM.PC_IN = 0;
EX_MEM.storeData_IN = 0;
EX_MEM.aluOutput_IN = 0;

EX_MEM.OP_OUT = EX_MEM.OP_IN;
EX_MEM.rT_OUT = EX_MEM.rT_IN;
EX_MEM.PC_OUT = EX_MEM.PC_IN;
EX_MEM.storeData_OUT = EX_MEM.storeData_IN;
EX_MEM.aluOutput_OUT = EX_MEM.aluOutput_IN;

EX_MEM.update = function(){
    // Update out values
    EX_MEM.OP_OUT = EX_MEM.OP_IN;
    EX_MEM.rT_OUT = EX_MEM.rT_IN;
    EX_MEM.PC_OUT = EX_MEM.PC_IN;
    EX_MEM.storeData_OUT = EX_MEM.storeData_IN;
    EX_MEM.aluOutput_OUT = EX_MEM.aluOutput_IN;

    EX_MEM.OP_IN = ID_EX.OP_OUT;
    EX_MEM.rT_IN = ID_EX.rT_OUT;
    EX_MEM.PC_IN = ID_EX.PC_OUT;
    EX_MEM.storeData_IN = MUXalu2.out;
    EX_MEM.aluOutput_IN = ALU.out;
};

var MEM_WB = {};
MEM_WB.rT_IN = '000';
MEM_WB.rfWriteData_IN = 0;

MEM_WB.rT_OUT = MEM_WB.rT_IN;
MEM_WB.rfWriteData_OUT = MEM_WB.rfWriteData_IN;

MEM_WB.update = function(){
    // update out values
    MEM_WB.rT_OUT = MEM_WB.rT_IN;
    MEM_WB.rfWriteData_OUT = MEM_WB.rfWriteData_IN;

    MEM_WB.rT_IN = EX_MEM.rT_OUT;
    MEM_WB.rfWriteData_IN = MUXout.out;
};

var WB_END = {};
WB_END.rT_IN = '000';
WB_END.rfWriteData_IN = 0;

WB_END.rT_OUT = MEM_WB.rT_IN;
WB_END.rfWriteData_OUT = WB_END.rfWriteData_IN;

WB_END.update = function(){
    // Update out values
    WB_END.rT_OUT = MEM_WB.rT_IN;
    WB_END.rfWriteData_OUT = WB_END.rfWriteData_IN;
    
    WB_END.rT_IN = MEM_WB.rT_OUT;
    WB_END.rfWriteData_IN = MEM_WB.rfWriteData_OUT;
}
