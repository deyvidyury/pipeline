function draw() {

  // MUXpc
  $("#muxpc .in").html(MUXpc.in);
  $("#muxpc .signal").html(MUXpc.signal);
  $("#muxpc .out").html(MUXpc.out);

  // Program counter
  $("#program-counter").html(PROGRAMCOUNTER.value);

  // Instruction Memory
  $("#instruction-memory").html(INSTRUCTION_MEMORY.join('<br>'));

  // Register File
  $("#r0").html((REGISTERFILE.registers[0] + '').toString(16));
  $("#r1").html((REGISTERFILE.registers[1] + '').toString(16));
  $("#r2").html((REGISTERFILE.registers[2] + '').toString(16));
  $("#r3").html((REGISTERFILE.registers[3] + '').toString(16));
  $("#r4").html((REGISTERFILE.registers[4] + '').toString(16));
  $("#r5").html((REGISTERFILE.registers[5] + '').toString(16));
  $("#r6").html((REGISTERFILE.registers[6] + '').toString(16));
  $("#r7").html((REGISTERFILE.registers[7] + '').toString(16));

  // Interface IF/ID
  $("#if-id .op").html((IF_ID.OP_IN+'').toString(3));
  $("#if-id .rA").html((IF_ID.rA_IN+'').toString(3));
  $("#if-id .rB").html((IF_ID.rB_IN+'').toString(3));
  $("#if-id .imm").html((IF_ID.imm_IN+'').toString(4));
  $("#if-id .rC").html((IF_ID.rC_IN+'').toString(3));
  $("#if-id .pc").html(IF_ID.PC_IN);

  $("#if-id-out .op").html((IF_ID.OP_OUT + '').toString(3));
  $("#if-id-out .rA").html((IF_ID.rA_OUT + '').toString(3));
  $("#if-id-out .rB").html((IF_ID.rB_OUT + '').toString(3));
  $("#if-id-out .imm").html((IF_ID.imm_OUT + '').toString(4));
  $("#if-id-out .rC").html((IF_ID.rC_OUT + '').toString(3));
  $("#if-id-out .pc").html(IF_ID.PC_OUT);

  // CTL7
  $("#ctl7 .op").html(CTL7.OP);
  $("#ctl7 .rA").html(CTL7.rA);
  $("#ctl7 .rB").html(CTL7.rB);
  $("#ctl7 .rC").html(CTL7.rC);
  $("#ctl7 .OP-id-ex").html(CTL7.OP_ID_EX);
  $("#ctl7 .rT-id-ex").html(CTL7.rT_ID_EX);
  $("#ctl7 .pstall").html(CTL7.Pstall);

  // MUXs2
  $("#muxs2 .rA").html(MUXs2.in[0]);
  $("#muxs2 .rC").html(MUXs2.in[1]);
  $("#muxs2 .signal").html(MUXs2.signal);
  $("#muxs2 .out").html(MUXs2.out);

  // CTL6
  $(".ctl6-op").html(CTL6.OP);
  $(".ctl6-muxs2").html(CTL6.MUXs2);
  $(".ctl6-muxop0").html(CTL6.MUXop0);

  // Left-shift-6
  $(".left-shift-6").html(dec2bin(LEFT_SHIFT_6.value).toString(16));

  // Sign-ext-7
  $(".sign-ext-7").html(dec2bin(SIGN_EXT_7.value).toString(16));

  // MUXop0
  $(".muxop0-signal").html(MUXop0.signal);
  $(".muxop0-out").html(MUXop0.out);

  // Interface ID/EX
  $("#id-ex .op").html(ID_EX.OP_IN);
  $("#id-ex .rT").html(ID_EX.rT_IN);
  $("#id-ex .s1").html(ID_EX.s1_IN);
  $("#id-ex .s2").html(ID_EX.s2_IN);
  $("#id-ex .pc").html((ID_EX.PC_IN));
  $("#id-ex .operand0").html((ID_EX.operand0_IN + '').toString(16));
  $("#id-ex .operand2").html((ID_EX.operand2_IN + '').toString(16));
  $("#id-ex .operand1").html((ID_EX.operand1_IN + '').toString(16));

  $("#id-ex-out .op").html(ID_EX.OP_OUT);
  $("#id-ex-out .rT").html(ID_EX.rT_OUT);
  $("#id-ex-out .s1").html(ID_EX.s1_OUT);
  $("#id-ex-out .s2").html(ID_EX.s2_OUT);
  $("#id-ex-out .pc").html((ID_EX.PC_OUT));
  $("#id-ex-out .operand0").html((ID_EX.operand0_OUT + '').toString(16));
  $("#id-ex-out .operand2").html((ID_EX.operand2_OUT + '').toString(16));
  $("#id-ex-out .operand1").html((ID_EX.operand1_OUT + '').toString(16));

  // Interface EX/MEM
  $("#ex-mem .op").html(EX_MEM.OP_IN);
  $("#ex-mem .rT").html(EX_MEM.rT_IN);
  $("#ex-mem .pc").html((EX_MEM.PC_IN));
  $("#ex-mem .store-data").html((EX_MEM.storeData_IN + '').toString(16));
  $("#ex-mem .alu-output").html((EX_MEM.aluOutput_IN + '').toString(16));

  // Interface MEM/WB
  $("#mem-wb .rT").html(MEM_WB.rT_IN);
  $("#mem-wb .rf-write-data").html((MEM_WB.rfWriteData_IN+'').toString(16));

  // Interface WB/END
  $("#wb-end .rT").html(WB_END.rT_IN);
  $("#wb-end .rf-write-data").html((WB_END.rfWriteData_IN+'').toString(16));
}