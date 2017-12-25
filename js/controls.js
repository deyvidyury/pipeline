// Control Modules
var CTL1 = {};
CTL1.rT = '000';
CTL1.WErf = 0;
CTL1.update = function(){
    CTL1.rT = MEM_WB.rT_OUT;
    CTL1.WErf = (CTL1.rT === '000') ? 0 : 1;   // Off = 0; On = 1
};

var CTL2 = {};
CTL2.OP = '000';
CTL2.WEdmem = 0;
CTL2.MUXout = 0;
CTL2.update = function(){
    CTL2.OP = EX_MEM.OP_OUT;
    CTL2.WEdmem = (CTL2.OP === '100') ? 1 : 0;
    CTL2.MUXout = (CTL2.OP === '101') ? 0 : 1;
};

var CTL3 = {};
CTL3.OP = '000';
CTL3.EQ = 0; // ALU must be defined later
CTL3.FUNCalu = 'ADD';
CTL3.MUXpc = 2;
CTL3.Pstomp = 0;
CTL3.update = function(){
    CTL3.OP = ID_EX.OP_OUT;
    CTL3.EQ = ALU.EQ; // ALU must be defined later
    // Signals for ALU
    // add,addi,lw,sw -> ADD
    // nand -> NAND
    // beq -> COMP
    // lui,jarl -> pass1
    if (CTL3.OP === '000' || CTL3.OP === '001' || CTL3.OP === '100' || CTL3.OP === '101') {
        CTL3.FUNCalu = 'ADD';
    } else if (CTL3.OP === '010') {
        CTL3.FUNCalu = 'NAND';
    } else if (CTL3.OP === '110'){
        CTL3.FUNCalu = 'COMP';
    } else if (CTL3.OP === '011' || CTL3.OP === '111') {
        CTL3.FUNCalu = 'PASS1';
    }
    // CTL3.FUNCalu = (CTL3.OP === '000' || CTL3.OP === '001' || CTL3.OP === '100' || CTL3.OP === '101') ?
    //                   'ADD' :
    //                   (CTL3.OP === '010') ?
    //                     'NAND' :
    //                     (CTL3.OP === '110') ?
    //                       'COMP' : (CTL3.OP === '011' || CTL3.OP === '111') ?
    //                       'PASS1';
    if(CTL3.OP === '110' && CTL3.EQ === 1){
        CTL3.MUXpc = 0;
        CTL3.Pstomp = 1;
    } else if(CTL3.OP === '111'){
        CTL3.MUXpc = 1;
        CTL3.Pstomp = 1;
    } else {
        CTL3.MUXpc = 2;
        CTL3.Pstomp = 0;
    }
};

var CTL4 = {};
CTL4.OP = '000';
CTL4.MUXimm = 0;
CTL4.update = function(){
    CTL4.OP = ID_EX.OP_OUT;
    if(CTL4.OP === '111'){
        CTL4.MUXimm = 1;
    } else if(CTL4.OP === '000' || CTL4.OP === '010') {
        CTL4.MUXimm = 2;
    } else {
        CTL4.MUXimm = 0;
    }
};

var CTL5 = {};
CTL5.s1 = '000';
CTL5.s2 = '000';
CTL5.rT_EX_MEM = '000';
CTL5.rT_MEM_WB = '000';
CTL5.rT_WB_END = '000';
CTL5.MUXalu2 = 0;
CTL5.MUXalu1 = 3;
CTL5.update = function(){
    CTL5.s1 = ID_EX.s1_OUT;
    CTL5.s2 = ID_EX.s2_OUT;
    CTL5.rT_EX_MEM = EX_MEM.rT_OUT;
    CTL5.rT_MEM_WB = MEM_WB.rT_OUT;
    CTL5.rT_WB_END = WB_END.rT_OUT;
    if((CTL5.s1 === CTL5.rT_EX_MEM || CTL5.s2 === CTL5.rT_EX_MEM) && CTL5.rT_EX_MEM !== '000'){
        CTL5.MUXalu2 = 3;
        CTL5.MUXalu1 = 0;
    } else if((CTL5.s1 === CTL5.rT_MEM_WB || CTL5.s2 === CTL5.rT_MEM_WB) && CTL5.rT_MEM_WB !== '000'){
        CTL5.MUXalu2 = 2;
        CTL5.MUXalu1 = 1;
    } else if((CTL5.s1 === CTL5.rT_WB_END || CTL5.s2 === CTL5.rT_WB_END) && CTL5.rT_WB_END !== '000'){
        CTL5.MUXalu2 = 1;
        CTL5.MUXalu1 = 2;
    } else {
        CTL5.MUXalu2 = 0;
        CTL5.MUXalu1 = 3;
    }
};

var CTL6 = {};
CTL6.OP = '000';
CTL6.MUXop0 = 0;
CTL6.MUXs2 = 0;
CTL6.update = function(){
    CTL6.OP = CTL7.OP_OUT;
    CTL6.MUXop0 = (CTL6.OP === '011') ? 0 : 1;
    CTL6.MUXs2 = (CTL6.OP !== '000' || CTL6.OP !== '010') ? 1 : 0;
}

var CTL7 = {};
CTL7.OP = '000';
CTL7.rA = '000';
CTL7.rB = '000';
CTL7.rC = '000';
CTL7.OP_ID_EX = '000';
CTL7.rT_ID_EX = '000';
CTL7.OP_OUT = '000';
CTL7.rT_OUT = '000';
CTL7.Pstall = 0;
CTL7.update = function(){
    CTL7.OP = IF_ID.OP_OUT;
    CTL7.rA = IF_ID.rA_OUT;
    CTL7.rB = IF_ID.rB_OUT;
    CTL7.rC = IF_ID.rC_OUT;
    CTL7.OP_ID_EX = ID_EX.OP_OUT;
    CTL7.rT_ID_EX = ID_EX.rT_OUT;
    CTL7.OP_OUT = CTL7.OP;
    CTL7.rT_OUT = CTL7.rA;
    if (CTL7.OP_ID_EX === '101' && (CTL7.rT_ID_EX === CTL7.rB || CTL7.rT_ID_EX === CTL7.rC)){
        CTL7.Pstall = 1;
    } else {
        CTL7.Pstall = 0;
    }
};
