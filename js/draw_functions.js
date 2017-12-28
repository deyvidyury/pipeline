// window.requestAnimFrame = (function(){
//   return  window.requestAnimationFrame       || 
//           window.webkitRequestAnimationFrame || 
//           window.mozRequestAnimationFrame    || 
//           window.oRequestAnimationFrame      || 
//           window.msRequestAnimationFrame     || 
//           function(callback){
//             window.setTimeout(callback, 1000 / 60);
//           };
// })();


// function drawCanvas() {
//   // var canvas = document.getElementById("myCanvas");
//   // var ctx = canvas.getContext("2d");	
//   ctx.font = "12px sans-serif";
//   ctx.textBaseline = "middle";
//   ctx.textAlign = "center";

//   ctx.strokeStyle = "#CCC";
//   ctx.fillStyle = "#CCC";
//   // DASHED LINES
//   dashedControlMUXrf(ctx);
//   dashedControlDatamemory(ctx);
//   dashedControlMUXalu2(ctx);
//   dashedControlMUXalu1(ctx);
//   dashedControlMUXtgt(ctx);
//   dashedControlMUXpc(ctx);
//   dashedControlRegisterFile(ctx);

//   MUXpc(ctx);
//   lineMuxPc(ctx);
//   programCounter(ctx);
//   plus1(ctx);
//   adder(ctx);
//   linePcInstructionMemory(ctx);
//   linePCplus1(ctx);
//   linePLus1MUXpc(ctx);
//   linePlus1AddMUXtgt(ctx);
//   lineAddPC(ctx);
//   lineSignExt7Add(ctx);
//   instructionMemory(ctx);
//   signExt7(ctx);
//   instructionRegister(ctx);
//   lineInstructionMemoryInstructionRegister(ctx);
//   lineInstructionRegisterSignExt7(ctx);
//   registerFile(ctx);
//   MUXrf(ctx);
//   MUXtgt(ctx);
//   lineMUXrfRegisterFile(ctx);
//   lineInstructionRegisterLeft6Sign7(ctx);
//   leftShitf6(ctx);
//   signExtend7(ctx);
//   dataMemory(ctx);
//   MUXalu1(ctx);
//   MUXalu2(ctx);
//   alu(ctx);
//   control(ctx);
//   lineOpControl(ctx);
//   linerAMUXrf(ctx);
//   linerARegisterFile(ctx);
//   linerBRegisterFile(ctx);
//   linerCMUXrf(ctx);
//   lineLeftShift6MUXalu1(ctx);
//   lineSignExtend7MUXalu2(ctx);
//   lineRegisterFileMUXalu1(ctx);
//   lineRegisterFileMUXalu2(ctx);
//   lineRegisterFileDataMemory(ctx);
//   lineMUXalu2ALU(ctx);
//   lineMUXalu1ALU(ctx);
//   lineALUDataMemoryMUXpcMUXtgt(ctx);
//   lineDataMemoryMUXtgt(ctx);
//   lineALUControl(ctx);
//   lineMUXtgtRegisterFile(ctx);

// }

function strokeTrapeze(c, x, y, w, h) {
  var s = w / 6;
  c.beginPath();
  c.moveTo(x + 0.5, y + 0.5);
  c.lineTo(x + s + 0.5, y + h + 0.5);
  c.lineTo(x + w - s + 0.5, y + h + 0.5);
  c.lineTo(x + w + 0.5, y + 0.5);
  c.closePath();
  c.fillStyle = '#FFF';
  c.fill();
  c.stroke();
  c.fillStyle = "#000";
}

function Rect (c, x, y, w, h) {
  c.beginPath();
  c.moveTo(x + 0.5, y + 0.5);
  c.lineTo(x + w + 0.5, y + 0.5);
  c.lineTo(x + w + 0.5, y + h + 0.5);
  c.lineTo(x + 0.5, y + h + 0.5);
  c.lineTo(x + 0.5, y + 0.5);
  c.stroke();
};

function line(ctx, x1, y1, x2, y2, size) {
  ctx.save()
  ctx.beginPath();
  ctx.lineWidth = size;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function arrow(c, x1, y1, x2, y2, size, dash) {
  c.save();

  // Rotate the context to point along the path
  var dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy);
  c.translate(x2, y2);
  c.rotate(Math.atan2(dy, dx));


  c.lineCap = "round";
  if (dash == null) {
    // Line
    c.beginPath();
    c.moveTo(0 - size, 0);
    c.lineTo(-len, 0);
  } else {
    c.dashedLine(0 - size, 0, -len, 0, dash);
  }
  c.stroke();

  // arrowhead
  c.beginPath();
  c.moveTo(0, 0);
  c.lineTo(-size, -size);
  c.lineTo(-size, size);
  c.closePath();
  //c.fill();

  c.restore();
  c.stroke();
}

CanvasRenderingContext2D.prototype.dashedLine = function (x1, y1, x2, y2, dashLen) {
  if (dashLen === undefined) dashLen = 2;
  this.moveTo(x1, y1);

  var dX = x2 - x1;
  var dY = y2 - y1;
  var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
  var dashX = dX / dashes;
  var dashY = dY / dashes;

  var q = 0;
  while (q++ < dashes) {
    x1 += dashX;
    y1 += dashY;
    this[q % 2 === 0 ? 'moveTo' : 'lineTo'](x1, y1);
  }
  this[q % 2 === 0 ? 'moveTo' : 'lineTo'](x2, y2);
};

CanvasRenderingContext2D.prototype.dot = function (x, y, size) {
  this.beginPath();
  this.arc(x, y, size, 0, 2 * Math.PI, true);
  this.stroke();
};

function dashedControlMUXrf(ctx) {
  arrow(ctx, 70, 470, 298, 376, 3, 3);   // Line from CONTROL to Mux 3
  ctx.font = "9px sans-serif";
  ctx.save();
  ctx.font = "#FFF";
  ctx.fillText("MUXrf", 298, 386);
  ctx.restore();
  ctx.fillText("MUXrf", 298, 386);
  ctx.font = "12px sans-serif";
};

function dashedControlRegisterFile(ctx) {
  arrow(ctx, 70, 470, 335, 342, 3, 3);   // Line from CONTROL to REGISTER FILE
  ctx.font = "9px sans-serif";
  ctx.fillText("WErf", 335, 355);
  ctx.font = "12px sans-serif";
};

function dashedControlDatamemory(ctx) {
  arrow(ctx, 70, 470, 475, 173, 3, 3);   // Line from CONTROL to DATA MEMORY
  ctx.font = "9px sans-serif";
  ctx.fillText("WEdmem", 475, 183);
  ctx.font = "12px sans-serif";
};

function dashedControlMUXalu2(ctx) {
  arrow(ctx, 70, 470, 405, 410, 3, 3);   // Line from CONTROL to MUX 5
  ctx.font = "9px sans-serif";
  ctx.fillText("MUXalu2", 402, 419);
  ctx.font = "12px sans-serif";
};

function dashedControlMUXalu1(ctx) {
  arrow(ctx, 70, 470, 495, 410, 3, 3);   // Line from CONTROL to MUX 4
  ctx.font = "9px sans-serif";
  ctx.fillText("MUXalu1", 495, 420);
  ctx.font = "12px sans-serif";
};

function dashedControlMUXtgt(ctx) {
  arrow(ctx, 70, 470, 385, 155, 3, 3);   // Line from CONTROL to MUX 4
  ctx.font = "9px sans-serif";
  ctx.fillText("MUXtgt", 385, 167);
  ctx.font = "12px sans-serif";
};

function dashedControlMUXpc(ctx) {
  ctx.fillText("MUXpc", 40, 420);
  ctx.dashedLine(30.5, 470.5, 15.5, 470.5, 3);		// Line from Control to MUXpc
  ctx.dashedLine(15.5, 470.5, 15.5, 45.5, 3);
  ctx.stroke();
  arrow(ctx, 15.5, 45.5, 90.5, 45.5, 5, 3);
};

function dashedControlALU(ctx) {
  arrow(ctx, 108, 480.5, 415.5, 480.5, 5, 3); // Line from control to ALU
  ctx.fillText("FUNCalu", 300, 470);
};

function MUXpc(ctx) {
  ctx.lineWidth = 1;
  strokeTrapeze(ctx, 90, 40, 40, 10);	// MUXpc
};

function lineMuxPc(ctx) {
  ctx.lineWidth = 5;
  arrow(ctx, 110.5, 52.5, 110.5, 65.5, 2); // line from mux to PC
  ctx.lineWidth = 1;
};

function programCounter(ctx) {
  ctx.strokeRect(40, 70, 140, 30);	// PC
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("Program Counter", 110, 85);  // Erase Text Program Counter
  ctx.restore();
  ctx.fillText("Program Counter", 110, 85);  // Text Program Counter
};

function plus1(ctx) {
  ctx.strokeRect(210, 70, 30, 30);	// +1
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("+1", 225, 85);      // Text +1
  ctx.restore();
  ctx.fillText("+1", 225, 85);      // Text +1
};

function adder(ctx) {
  ctx.strokeRect(260, 70, 60, 30);	//ADD
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("ADD", 290, 85);     // Text ADD
  ctx.restore();
  ctx.fillText("ADD", 290, 85);     // Text ADD
};

function linePcInstructionMemory(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();				// Line from PC to Instruction Memory
  ctx.moveTo(55.5, 100.5);
  ctx.lineTo(55.5, 190.5);
  ctx.stroke();
  arrow(ctx, 55.5, 190.5, 66.5, 190.5, 2);
  ctx.lineWidth = 1;
};

function linePCplus1(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();				// Line from PC to +1
  ctx.moveTo(55.5, 115.5);
  ctx.lineTo(225.5, 115.5);
  ctx.stroke();
  ctx.closePath();
  arrow(ctx, 225.5, 115.5, 225.5, 104.5, 2);
  ctx.dot(55, 116, 3);
  ctx.lineWidth = 1;
};

function linePLus1MUXpc(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();				// Line from +1 to mux
  ctx.moveTo(225.5, 70.5);
  ctx.lineTo(225.5, 30.5);
  ctx.lineTo(120.5, 30.5);
  ctx.stroke();
  arrow(ctx, 120.5, 30.5, 120.5, 36.5, 0.25);
  ctx.lineWidth = 1;
};

function linePlus1AddMUXtgt(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();				// Line from +1 to ADD
  ctx.moveTo(225.5, 50.5);
  ctx.lineTo(250.5, 50.5);
  ctx.lineTo(250.5, 115.5);
  ctx.lineTo(280.5, 115.5);
  ctx.stroke();
  ctx.closePath();
  arrow(ctx, 280.5, 115.5, 280.5, 104.5, 2);
  ctx.dot(281, 115, 2);
  ctx.moveTo(280.5, 115.5);			// Line From +1 to Mux 2
  ctx.lineTo(400.5, 115.5);
  ctx.stroke();
  arrow(ctx, 400.5, 115.5, 400.5, 141.5, 0.25);
  ctx.lineWidth = 1;
};

function linePluas1Add(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();				// Line from +1 to ADD
  ctx.moveTo(225.5, 50.5);
  ctx.lineTo(250.5, 50.5);
  ctx.lineTo(250.5, 115.5);
  ctx.lineTo(280.5, 115.5);
  ctx.stroke();
  arrow(ctx, 280.5, 115.5, 280.5, 104.5, 2);
  ctx.lineWidth = 1;
};

function linePlus1MUXtgt(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();				// Line from +1 to ADD
  ctx.moveTo(225.5, 70.5);
  ctx.lineTo(225.5, 50.5);
  ctx.lineTo(250.5, 50.5);
  ctx.lineTo(250.5, 115.5);
  ctx.lineTo(400.5, 115.5);
  ctx.stroke();
  arrow(ctx, 400.5, 115.5, 400.5, 141.5, 0.25);
  ctx.lineWidth = 1;
};

function lineAddPC(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();				// Line from ADD to PC
  ctx.moveTo(280.5, 70.5);
  ctx.lineTo(280.5, 20.5);
  ctx.lineTo(110.5, 20.5);
  ctx.stroke();
  arrow(ctx, 110.5, 20.5, 110.5, 36.5, 0.25);
  ctx.lineWidth = 1;
};

function lineSignExt7Add(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();				// Line from Sign-Ext-7 to ADD
  ctx.moveTo(300.5, 100.5);
  arrow(ctx, 300.5, 158.5, 300.3, 104.5, 2);
  ctx.stroke();
  ctx.lineWidth = 1;
};

function instructionMemory(ctx) {
  ctx.strokeRect(70, 130, 150, 120); // Instruction Memory
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("INSTRUCTION", 145, 183); // Text INSTRUCTION
  ctx.fillText("MEMORY", 145, 197);      // TEXT MEMORY
  ctx.restore();
  ctx.fillText("INSTRUCTION", 145, 183); // Text INSTRUCTION
  ctx.fillText("MEMORY", 145, 197);      // TEXT MEMORY
};

function signExt7(ctx) {
  ctx.strokeRect(230, 160, 100, 30);	//Sign-Ext-7
  ctx.save();
  ctx.fillStyle = "#FFF"
  ctx.fillText("Sign-Ext-7", 280, 175);
  ctx.restore();
  ctx.fillText("Sign-Ext-7", 280, 175);
};

function instructionRegister(ctx) {
  ctx.strokeRect(70, 280, 30, 30);	// Instruction register OP

  ctx.strokeRect(100, 280, 30, 30);	// Instruction register rA

  ctx.strokeRect(130, 280, 30, 30);	// Instruction register rB

  ctx.strokeRect(160, 280, 30, 30);	// Instruction register
  ctx.strokeRect(190, 280, 30, 30);	// Instruction register rC
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("OP", 85, 295);
  ctx.fillText("rA", 115, 295);
  ctx.fillText("rB", 145, 295);
  ctx.fillText("rC", 205, 295);
  ctx.restore();
  ctx.fillText("OP", 85, 295);
  ctx.fillText("rA", 115, 295);
  ctx.fillText("rB", 145, 295);
  ctx.fillText("rC", 205, 295);
};

function lineInstructionMemoryInstructionRegister(ctx) {
  ctx.lineWidth = 5;
  arrow(ctx, 145.5, 252.5, 145.5, 276.5, 2);		// Line from Instruction Menory to Instruction register
  ctx.lineWidth = 1;
};

function lineInstructionRegisterSignExt7(ctx) {
  ctx.beginPath();				// Line from Instruction register to Sign-Ext-7
  ctx.moveTo(160.5, 275.5);
  ctx.lineTo(165.5, 270.5);
  ctx.lineTo(215.5, 270.5);
  ctx.lineTo(220.5, 275.5);
  ctx.moveTo(190.5, 270.5);
  ctx.lineTo(190.5, 260.5);
  ctx.lineTo(260.5, 260.5);
  ctx.stroke();
  arrow(ctx, 260.5, 260.5, 260.5, 190.5, 5);
};

function registerFile(ctx) {
  ctx.save();;
  ctx.fillStyle = "#FFF";
  ctx.strokeRect(340, 190, 150, 150);// Register file
  ctx.fillRect(340, 190, 150, 150);// Register file
  ctx.restore();
  ctx.fillText("REGISTER FILE", 415, 265);
}

function MUXtgt(ctx) {
  strokeTrapeze(ctx, 385, 145, 60, 15);// Mux 2 to Register File
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("TGT", 415, 200);     // TGT
  ctx.restore();
  ctx.fillText("TGT", 415, 200);     // TGT
};

function lineMUXtgtRegisterFile(ctx) {
  ctx.lineWidth = 5;
  arrow(ctx, 415.5, 162.5, 415.5, 186.5, 2);	// Line from Mux 2 to Register File
  ctx.lineWidth = 1;
};

function MUXrf(ctx) {
  ctx.save();
  ctx.translate(300, 375);
  ctx.rotate(-90 * Math.PI / 180);
  strokeTrapeze(ctx, 0, 0, 20, 5);	// Mux 3 To Register File
  ctx.restore();
};

function lineInstructionRegisterLeft6Sign7(ctx) {
  ctx.beginPath();
  ctx.moveTo(150.5, 315);			// Line from Instruction Register to Left-Shift-6 and Sign-Extend-7
  ctx.lineTo(155.5, 320.5);
  ctx.lineTo(215.5, 320.5);
  ctx.lineTo(220.5, 315.5);
  ctx.stroke();
  arrow(ctx, 190.5, 320.5, 190.5, 398.5, 5);
  ctx.moveTo(190.5, 380.5);
  ctx.lineTo(265.5, 380.5);
  ctx.stroke();
  arrow(ctx, 265.5, 380.5, 265.5, 398.5, 5);
}

function leftShitf6(ctx) {
  ctx.strokeRect(230, 400, 70, 30);	// Left-Shift-6
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("Left-Shift-6", 265, 415);
  ctx.fillRect(230, 400, 70, 30);
  ctx.restore();
  ctx.fillText("Left-Shift-6", 265, 415);
};

function signExtend7(ctx) {
  ctx.strokeRect(130, 400, 90, 30);	// Sign-Extend-7
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("Sign-Extend-7", 175, 415);
  ctx.fillRect(130, 400, 90, 30);
  ctx.restore();
  ctx.fillText("Sign-Extend-7", 175, 415);
};

function dataMemory(ctx) {
  ctx.strokeRect(480, 40, 130, 130);	// Data Memory
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("DATA", 545, 95);
  ctx.fillText("MEMORY", 545, 110);
  ctx.restore();
  ctx.fillText("DATA", 545, 95);
  ctx.fillText("MEMORY", 545, 110);
};

function MUXalu1(ctx) {
  strokeTrapeze(ctx, 410, 400, 40, 15); // Mux 4 to SCR2 ALU
};

function MUXalu2(ctx) {
  strokeTrapeze(ctx, 500, 400, 40, 15); // Mux 5 to SCR1 ALU
};

function alu(ctx) {
  ctx.save();
  ctx.translate(400, 440);			// ALU
  strokeTrapeze(ctx, 0, 0, 150, 60);
  ctx.clearRect(55, -1, 40, 2);
  ctx.beginPath();
  ctx.moveTo(55.5, 0.5);
  ctx.lineTo(75.5, 20.5);
  ctx.lineTo(95.5, 0.5);
  ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("SCR2", 430, 450);
  ctx.fillText("SCR1", 520, 450);
  ctx.restore();
  ctx.fillText("SCR2", 430, 450);
  ctx.fillText("SCR1", 520, 450);
};

function control(ctx) {
  ctx.beginPath();
  ctx.arc(70, 470, 40, 0, 2 * Math.PI);	// CONTROL
  ctx.stroke();
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.restore();
  ctx.fillText("CONTROL", 70, 470);
};

function lineOpControl(ctx) {
  arrow(ctx, 85.5, 310.5, 75.5, 430.5, 5);		// Line from Instuction Register OP to Control
};

function linerAMUXrf(ctx) {
  ctx.beginPath();
  ctx.moveTo(115.5, 310.5);		// Line from Instuction Register rA to Mux 3
  ctx.lineTo(115.5, 370.5);
  ctx.stroke();
  arrow(ctx, 115.5, 370.5, 300.5, 370.5, 3);
};

function linerARegisterFile(ctx) {
  ctx.beginPath();
  ctx.moveTo(115.5, 310.5);
  ctx.lineTo(115.5, 330.5);		// Line from Instuction Register rA to Register File
  ctx.lineTo(280.5, 330.5);
  ctx.lineTo(280.5, 230.5);
  ctx.stroke();
  arrow(ctx, 280.5, 230.5, 340.5, 230.5, 5);
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("TGT", 320, 220);
  ctx.restore();
  ctx.fillText("TGT", 320, 220);
};

function linerBRegisterFile(ctx) {
  ctx.beginPath();
  ctx.moveTo(145.5, 310.5);		// Line from Instuction Register rB to Register File
  ctx.lineTo(145.5, 340.5);
  ctx.lineTo(300.5, 340.5);
  ctx.lineTo(300.5, 265.5);
  ctx.stroke();
  arrow(ctx, 300.5, 265.5, 340.5, 265.5, 5);
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("SRC1", 320, 255);
  ctx.restore();
  ctx.fillText("SRC1", 320, 255);
};

function linerCMUXrf(ctx) {
  ctx.beginPath();
  ctx.moveTo(205.5, 310.5);		// Line from Instuction Register rC to Mux 3
  ctx.lineTo(205.5, 360.5);
  ctx.stroke();
  arrow(ctx, 205.5, 360.5, 300.5, 360.5, 3);
};

function lineMUXrfRegisterFile(ctx) {
  ctx.beginPath();
  ctx.moveTo(305.5, 365.5);		// Line from Mux 3 to Register File
  ctx.lineTo(320.5, 365.5);
  ctx.lineTo(320.5, 300.5);
  ctx.stroke();
  arrow(ctx, 320.5, 300.5, 340.5, 300.5, 5);
  ctx.lineWidth = 1;
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("SCR2", 320, 290);
  ctx.restore();
  ctx.fillText("SCR2", 320, 290);
};

function lineLeftShift6MUXalu1(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(265.5, 430.5);			// Line from Left-Shift-6 to Mux 4
  ctx.lineTo(265.5, 440.5);
  ctx.lineTo(340.5, 440.5);
  ctx.lineTo(340.5, 375.5);
  ctx.lineTo(510.5, 375.5);
  ctx.stroke();
  arrow(ctx, 510.5, 375.5, 510.5, 396.4, 2);
  ctx.lineWidth = 1;
};

function lineSignExtend7MUXalu2(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(175.5, 430.5);			// Line from Sign-Extend-7 to Mux 5
  ctx.lineTo(175.5, 450.5);
  ctx.lineTo(380.5, 450.5);
  ctx.lineTo(380.5, 385.5);
  ctx.lineTo(420.5, 385.5);
  ctx.stroke();
  arrow(ctx, 420.5, 385.5, 420.5, 396.5, 2);
  ctx.lineWidth = 1;
};

function lineRegisterFileMUXalu1(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(452.5, 340.5);		// Line from SRC1 - Register File to Mux 4
  ctx.lineTo(452.5, 360.5);
  ctx.lineTo(530.5, 360.5);
  ctx.stroke();
  arrow(ctx, 530.5, 360.5, 530.5, 396.5, 2);
  ctx.lineWidth = 1;
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("SCR1", 452, 330);
  ctx.restore();
  ctx.fillText("SCR1", 452, 330);
};

function lineRegisterFileMUXalu2(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(377.5, 340.5);		// Line from SRC2 - Register File to Mux 5
  ctx.lineTo(377.5, 360.5);
  ctx.lineTo(440.5, 360.5);
  ctx.stroke();
  arrow(ctx, 440.4, 360.5, 440.5, 396.5, 2);
  ctx.lineWidth = 1;
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("SCR2", 377, 330);
  ctx.restore();
  ctx.fillText("SCR2", 377, 330);
};

function lineRegisterFileDataMemory(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(377.5, 340.5);
  ctx.lineTo(377.5, 350.5);		// Line from SRC2 - Register File to Data Memory - DATA IN
  ctx.lineTo(520.5, 350.5);
  ctx.stroke();
  arrow(ctx, 520.5, 350.5, 520.5, 174.5, 2);
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("DATA IN", 520, 160);
  ctx.restore();
  ctx.fillText("DATA IN", 520, 160);
  ctx.dot(377.5, 350, 3);
  ctx.lineWidth = 1;
};

function lineMUXalu2ALU(ctx) {
  ctx.lineWidth = 5;
  arrow(ctx, 430.5, 417.5, 430.5, 436.5, 2);	// Line from Mux 5 to ALU SRC2
  ctx.lineWidth = 1;
};

function lineMUXalu1ALU(ctx) {
  ctx.lineWidth = 5;
  arrow(ctx, 520.5, 417.5, 520.5, 436.5, 2);	// Line from Mux 4 to ALU SRC2
  ctx.lineWidth = 1;
};

function lineALUDataMemoryMUXpcMUXtgt(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(475.5, 500.5);			// Line from ALU to DataMemory - ADDR
  ctx.lineTo(475.5, 515.5);
  ctx.lineTo(570.5, 515.5);
  ctx.stroke();
  ctx.dot(570, 515, 3);
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("ADDR", 570, 160);
  ctx.restore();
  ctx.fillText("ADDR", 570, 160);
  arrow(ctx, 570.5, 515.5, 570.5, 174.5, 2);
  ctx.moveTo(570.5, 515.5);			// Line from ALU to Mux 1
  ctx.lineTo(620.5, 515.5);
  ctx.lineTo(620.5, 10.5);
  ctx.lineTo(100.5, 10.5);
  ctx.stroke();
  arrow(ctx, 100.5, 10.5, 100.5, 36.5, 0.25);
  arrow(ctx, 415.5, 10.5, 415.5, 141.5, 0.25);// Line from ALU to Mux 2
  ctx.dot(415, 11, 3);
  ctx.lineWidth = 1;
};

function lineALUDataMemory(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(475.5, 500.5);
  ctx.lineTo(475.5, 515.5);
  ctx.lineTo(570.5, 515.5);
  ctx.stroke();
  arrow(ctx, 570.5, 515.5, 570.5, 174.5, 2);
  ctx.lineWidth = 1;
};

function lineALUMUXtgt(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(475.5, 500.5);
  ctx.lineTo(475.5, 515.5);
  ctx.lineTo(620.5, 515.5);
  ctx.lineTo(620.5, 10.5);
  ctx.lineTo(415.5, 10.5);
  ctx.stroke();
  arrow(ctx, 415.5, 10.5, 415.5, 141.5, 0.25);
  ctx.lineWidth = 1;
};

function lineALUMUXPc(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(475.5, 500.5);
  ctx.lineTo(475.5, 515.5);
  ctx.lineTo(620.5, 515.5);
  ctx.lineTo(620.5, 10.5);
  ctx.lineTo(100.5, 10.5);
  ctx.stroke();
  arrow(ctx, 100.5, 10.5, 100.5, 36.5, 0.25);
  ctx.lineWidth = 1;
};

function lineDataMemoryMUXtgt(ctx) {
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(545.5, 40.5);			// Line from Data Memory to Mux 2
  ctx.lineTo(545.5, 25.5);
  ctx.lineTo(430.5, 25.5);
  ctx.stroke();
  arrow(ctx, 430.5, 25.5, 430.5, 141.5, 0.25);
  ctx.lineWidth = 1;
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("DATA OUT", 545, 50);
  ctx.restore();
  ctx.fillText("DATA OUT", 545, 50);
};

function lineALUControl(ctx) {
  arrow(ctx, 420.5, 490.5, 105.5, 490.5, 5);	// Line from ALU to Control
  ctx.save();
  ctx.fillStyle = "#FFF";
  ctx.fillText("EQ!", 300, 500);
  ctx.restore();
  ctx.fillText("EQ!", 300, 500);
};

//++++++++++++++++++++++++++++++++++++++++++++++
// function sleep(callback, miliseconds){
// 	var currentTime = new Date().getTime();
// 	var anim = window.requestAnimationFrame(callback);
// 	while (currentTime + miliseconds >= new Date().getTime()) {
// 		window.cancelAnimationFrame;
//     }

// 	// if (currentTime + miliseconds >= new Date().getTime()){

// 	// }
// }

//+++++++++++++++++++++++++++++++++++++++++++++++

// var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
//                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

// window.requestAnimFrame = (function(){
//       return  window.requestAnimationFrame       || 
//               window.webkitRequestAnimationFrame || 
//               window.mozRequestAnimationFrame    || 
//               window.oRequestAnimationFrame      || 
//               window.msRequestAnimationFrame     || 
//               function(/* function */ callback, /* DOMElement */ element){
//                 window.setTimeout(callback, 1000 / 60);
//               };
//     })();

function sleep(miliseconds) {
  var currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) { }
}

//var d = new Date();
//var n = d.getTime();
//var id = setInterval(drawAdd,1000);
//var stade = 0;
function drawAdd() {
  ctx.save();
  ctx.strokeStyle = "#0F0";

  ctx.lineWidth = 2;

  console.log(n);
  n += d.getTime();

  switch (stade) {
    case 0:
      programCounter(ctx);
      linePcInstructionMemory(ctx);
      instructionMemory(ctx);
      stade++;
      break;
    case 1:
      linePcInstructionMemory(ctx);
      instructionRegister(ctx);
      break;

  }
  // programCounter(ctx);

  // plus1(ctx);
  // instructionMemory(ctx);
  // instructionRegister(ctx);
  // control(ctx);
  // registerFile(ctx);
  // alu(ctx);
  // MUXrf(ctx);
  // MUXalu1(ctx);
  // MUXalu2(ctx);
  // MUXtgt(ctx);
  // MUXpc(ctx);

  // ctx.lineWidth = 1;

  // linePcInstructionMemory(ctx);
  // linePCplus1(ctx);
  // lineInstructionMemoryInstructionRegister(ctx);	
  // linerARegisterFile(ctx);
  // linerBRegisterFile(ctx);
  // linerCMUXrf(ctx);
  // lineMUXrfRegisterFile(ctx);
  // lineOpControl(ctx);
  // lineRegisterFileMUXalu2(ctx);
  // lineRegisterFileMUXalu1(ctx);
  // lineMUXalu1ALU(ctx);
  // lineMUXalu2ALU(ctx);
  // lineALUMUXtgt(ctx);
  // lineMUXtgtRegisterFile(ctx);
  // lineMuxPc(ctx);
  // linePLus1MUXpc(ctx);
  // ctx.stroke();		

  ctx.restore();

};

function drawAddi(ctx) {
  ctx.save();
  ctx.strokeStyle = "#F00";

  ctx.lineWidth = 2;
  programCounter(ctx);
  plus1(ctx);
  instructionMemory(ctx);
  instructionRegister(ctx);
  control(ctx);
  registerFile(ctx);
  alu(ctx);
  signExtend7(ctx);
  MUXalu1(ctx);
  MUXalu2(ctx);
  MUXtgt(ctx);
  MUXpc(ctx);

  ctx.lineWidth = 1;

  linePcInstructionMemory(ctx);
  linePCplus1(ctx);
  lineMuxPc(ctx);
  linePLus1MUXpc(ctx);
  lineInstructionMemoryInstructionRegister(ctx);
  linerARegisterFile(ctx);
  linerBRegisterFile(ctx);
  lineInstructionRegisterLeft6Sign7(ctx);
  lineOpControl(ctx);
  lineSignExtend7MUXalu2(ctx);
  lineRegisterFileMUXalu1(ctx);
  lineMUXalu1ALU(ctx);
  lineMUXalu2ALU(ctx);
  lineALUMUXtgt(ctx);
  lineMUXtgtRegisterFile(ctx);

  ctx.stroke();
  ctx.restore();
};

function drawNand(ctx) {
  ctx.save();
  ctx.strokeStyle = "#00F";

  ctx.lineWidth = 2;
  programCounter(ctx);
  plus1(ctx);
  instructionMemory(ctx);
  instructionRegister(ctx);
  control(ctx);
  registerFile(ctx);
  alu(ctx);
  MUXrf(ctx);
  MUXalu1(ctx);
  MUXalu2(ctx);
  MUXtgt(ctx);
  MUXpc(ctx);

  ctx.lineWidth = 1;

  linePcInstructionMemory(ctx);
  linePCplus1(ctx);
  lineMuxPc(ctx);
  linePLus1MUXpc(ctx);
  lineInstructionMemoryInstructionRegister(ctx);
  linerARegisterFile(ctx);
  linerBRegisterFile(ctx);
  linerCMUXrf(ctx);
  lineMUXrfRegisterFile(ctx);
  lineOpControl(ctx);
  lineRegisterFileMUXalu2(ctx);
  lineRegisterFileMUXalu1(ctx);
  lineMUXalu1ALU(ctx);
  lineMUXalu2ALU(ctx);
  lineALUMUXtgt(ctx);
  lineMUXtgtRegisterFile(ctx);

  ctx.stroke();
  ctx.restore();
};

function drawLui(ctx) {
  ctx.save();
  ctx.strokeStyle = "#F80";

  ctx.lineWidth = 2;
  programCounter(ctx);
  plus1(ctx);
  instructionMemory(ctx);
  instructionRegister(ctx);
  control(ctx);
  registerFile(ctx);
  alu(ctx);
  leftShitf6(ctx);
  //MUXalu1(ctx);
  MUXalu2(ctx);
  MUXtgt(ctx);
  MUXpc(ctx);

  ctx.lineWidth = 1;

  linePcInstructionMemory(ctx);
  linePCplus1(ctx);
  lineMuxPc(ctx);
  linePLus1MUXpc(ctx);
  lineInstructionMemoryInstructionRegister(ctx);
  linerARegisterFile(ctx);
  //linerBRegisterFile(ctx);
  lineInstructionRegisterLeft6Sign7(ctx);
  lineOpControl(ctx);
  lineLeftShift6MUXalu1(ctx);
  //lineRegisterFileMUXalu1(ctx);
  lineMUXalu1ALU(ctx);
  //lineMUXalu2ALU(ctx);
  lineALUMUXtgt(ctx);
  lineMUXtgtRegisterFile(ctx);

  ctx.stroke();
  ctx.restore();
};

function drawLw(ctx) {
  ctx.save();
  ctx.strokeStyle = "#088";

  ctx.lineWidth = 2;
  programCounter(ctx);
  plus1(ctx);
  instructionMemory(ctx);
  instructionRegister(ctx);
  control(ctx);
  registerFile(ctx);
  alu(ctx);
  dataMemory(ctx);
  signExtend7(ctx);
  MUXalu1(ctx);
  MUXalu2(ctx);
  MUXtgt(ctx);
  MUXpc(ctx);

  ctx.lineWidth = 1;

  linePcInstructionMemory(ctx);
  linePCplus1(ctx);
  lineMuxPc(ctx);
  linePLus1MUXpc(ctx);
  lineInstructionMemoryInstructionRegister(ctx);
  linerARegisterFile(ctx);
  linerBRegisterFile(ctx);
  lineInstructionRegisterLeft6Sign7(ctx);
  lineOpControl(ctx);
  lineSignExtend7MUXalu2(ctx);
  lineRegisterFileMUXalu1(ctx);
  lineMUXalu1ALU(ctx);
  lineMUXalu2ALU(ctx);
  lineALUDataMemory(ctx);
  lineDataMemoryMUXtgt(ctx);
  lineMUXtgtRegisterFile(ctx);

  ctx.stroke();
  ctx.restore();
};

function drawSw(ctx) {
  ctx.save();
  ctx.strokeStyle = "#F88";

  ctx.lineWidth = 2;
  programCounter(ctx);
  plus1(ctx);
  instructionMemory(ctx);
  instructionRegister(ctx);
  MUXrf(ctx);
  control(ctx);
  registerFile(ctx);
  alu(ctx);
  dataMemory(ctx);
  signExtend7(ctx);
  MUXalu1(ctx);
  MUXalu2(ctx);
  MUXpc(ctx);

  ctx.lineWidth = 1;

  linePcInstructionMemory(ctx);
  linePCplus1(ctx);
  lineMuxPc(ctx);
  linePLus1MUXpc(ctx);
  lineInstructionMemoryInstructionRegister(ctx);
  linerAMUXrf(ctx);
  lineMUXrfRegisterFile(ctx);
  linerBRegisterFile(ctx);
  lineInstructionRegisterLeft6Sign7(ctx);
  lineOpControl(ctx);
  lineSignExtend7MUXalu2(ctx);
  lineRegisterFileDataMemory(ctx);
  lineRegisterFileMUXalu1(ctx);
  lineMUXalu1ALU(ctx);
  lineMUXalu2ALU(ctx);
  lineALUDataMemory(ctx);

  ctx.stroke();
  ctx.restore();
};

function drawBeq(ctx) {
  ctx.save();
  ctx.strokeStyle = "#F0A";

  ctx.lineWidth = 2;
  programCounter(ctx);
  plus1(ctx);
  adder(ctx);
  instructionMemory(ctx);
  instructionRegister(ctx);
  signExt7(ctx);
  control(ctx);
  registerFile(ctx);
  alu(ctx);
  MUXrf(ctx);
  MUXalu1(ctx);
  MUXalu2(ctx);
  MUXpc(ctx);

  ctx.lineWidth = 1;

  linePcInstructionMemory(ctx);
  linePCplus1(ctx);
  linePluas1Add(ctx);
  lineAddPC(ctx);
  lineMuxPc(ctx);
  linePLus1MUXpc(ctx);
  lineInstructionMemoryInstructionRegister(ctx);
  linerAMUXrf(ctx);
  linerBRegisterFile(ctx);
  lineInstructionRegisterSignExt7(ctx);
  lineSignExt7Add(ctx);
  lineMUXrfRegisterFile(ctx);
  lineOpControl(ctx);
  lineRegisterFileMUXalu2(ctx);
  lineRegisterFileMUXalu1(ctx);
  lineMUXalu1ALU(ctx);
  lineMUXalu2ALU(ctx);
  lineALUControl(ctx);

  ctx.stroke();
  ctx.restore();
};

function drawJalr(ctx) {
  ctx.save();
  ctx.strokeStyle = "#A0F";

  ctx.lineWidth = 2;
  programCounter(ctx);
  plus1(ctx);
  instructionMemory(ctx);
  instructionRegister(ctx);
  control(ctx);
  registerFile(ctx);
  alu(ctx);
  //MUXrf(ctx);
  //MUXalu1(ctx);
  MUXalu2(ctx);
  MUXtgt(ctx);
  MUXpc(ctx);

  ctx.lineWidth = 1;

  linePcInstructionMemory(ctx);
  linePCplus1(ctx);
  lineMuxPc(ctx);
  linePlus1MUXtgt(ctx);
  lineInstructionMemoryInstructionRegister(ctx);
  linerARegisterFile(ctx);
  linerBRegisterFile(ctx);
  //linerCMUXrf(ctx);
  //lineMUXrfRegisterFile(ctx);
  lineOpControl(ctx);
  //lineRegisterFileMUXalu2(ctx);
  lineRegisterFileMUXalu1(ctx);
  lineMUXalu1ALU(ctx);
  //lineMUXalu2ALU(ctx);
  lineALUMUXPc(ctx);
  lineMUXtgtRegisterFile(ctx);

  ctx.stroke();
  ctx.restore();
};

function cleanScreen(ctx) {
  ctx.clearRect(0, 0, 660, 525);
}