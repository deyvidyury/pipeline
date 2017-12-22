var IF_ID = {};
IF_ID.PC = 0;
IF_ID.OP  = '000';
IF_ID.rA  = '000';
IF_ID.rB  = '000';
IF_ID.rC  = '000';
IF_ID.imm = '0000';
IF_ID.Pstomp = 0;
IF_ID.update = function(){
    IF_ID.Pstomp = CTL3.Pstomp;
    IF_ID.PC = PROGRAMCOUNTER.value;

    if(INSTRUCTION_MEMORY[PROGRAMCOUNTER.value] === undefined){
        IF_ID.OP  = '000';
        IF_ID.rA  = '000';
        IF_ID.rB  = '000';
        IF_ID.rC  = '000';
        IF_ID.imm = '0000';
    } else {
        if (!IF_ID.Pstomp) {
            IF_ID.OP  = INSTRUCTION_MEMORY[IF_ID.PC].slice(0,3);
            IF_ID.rA  = INSTRUCTION_MEMORY[IF_ID.PC].slice(3,6);
            IF_ID.rB  = INSTRUCTION_MEMORY[IF_ID.PC].slice(6,9);
            IF_ID.rC  = INSTRUCTION_MEMORY[IF_ID.PC].slice(13);
            IF_ID.imm = INSTRUCTION_MEMORY[IF_ID.PC].slice(9,13);
        } else {
            IF_ID.OP  = '000';
            IF_ID.rA  = '000';
            IF_ID.rB  = '000';
            IF_ID.rC  = '000';
            IF_ID.imm = '0000';
        };
    }
}

var ID_EX = {}
ID_EX.OP = '000';
ID_EX.rT = '000';
ID_EX.s1 = '000';
ID_EX.s2 = '000';
ID_EX.PC = 0;
ID_EX.operand0 = 0;
ID_EX.operand2 = 0;
ID_EX.operand1 = 0;
ID_EX.Pstomp = 0;

ID_EX.update = function(){
    ID_EX.Pstomp = CTL3.Pstomp;
    ID_EX.PC = IF_ID.PC;
    if(!ID_EX.Pstomp){
        ID_EX.OP = CTL7.OP_OUT;
        ID_EX.rT = CTL7.rT_OUT;
        ID_EX.s1 = IF_ID.rB;
        ID_EX.s2 = MUXs2.out;
        ID_EX.operand0 = MUXop0.out;
        ID_EX.operand2 = REGISTERFILE.SRC2_DATA;
        ID_EX.operand1 = REGISTERFILE.SRC1_DATA;
    } else {
        ID_EX.OP = '000';
        ID_EX.rT = '000';
        ID_EX.s1 = '000';
        ID_EX.s2 = '000';
        ID_EX.operand0 = 0;
        ID_EX.operand2 = 0;
        ID_EX.operand1 = 0;
    }
};


var EX_MEM = {};
EX_MEM.OP = '000';
EX_MEM.rT = '000';
EX_MEM.PC = 0;
EX_MEM.storeData = '0000000000000000';
EX_MEM.aluOutput = '0000000000000000';
EX_MEM.update = function(){
    EX_MEM.OP = ID_EX.OP;
    EX_MEM.rT = ID_EX.rT;
    EX_MEM.PC = ID_EX.PC;
    EX_MEM.storeData = MUXalu2.out;
    EX_MEM.aluOutput = ALU.out;
};

var MEM_WB = {};
MEM_WB.rT = '000';
MEM_WB.rfWriteData = '0000000000000000';
MEM_WB.update = function(){
    MEM_WB.rT = EX_MEM.rT;
    MEM_WB.rfWriteData = MUXout.out;
};

var WB_END = {};
WB_END.rT = '000';
WB_END.rfWriteData = '0000000000000000';
WB_END.update = function(){
    WB_END.rT = MEM_WB.rT;
    WB_END.rfWriteData = MEM_WB.rfWriteData;
}
