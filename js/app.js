$(document).ready(function(){
    // Tick
    draw();
    var ticks = 0;
    function tick(){
        // $("#program-counter").html((PROGRAMCOUNTER.value+'').toString(16));
        // Call stages backwards
        writebackStage();
        memoryStage();
        executeStage();
        decodeStage();
        fetchStage();

        // // Draw REGISTERFILE
        // $("#r0").html((REGISTERFILE.registers[0]+'').toString(16));
        // $("#r1").html((REGISTERFILE.registers[1]+'').toString(16));
        // $("#r2").html((REGISTERFILE.registers[2]+'').toString(16));
        // $("#r3").html((REGISTERFILE.registers[3]+'').toString(16));
        // $("#r4").html((REGISTERFILE.registers[4]+'').toString(16));
        // $("#r5").html((REGISTERFILE.registers[5]+'').toString(16));
        // $("#r6").html((REGISTERFILE.registers[6]+'').toString(16));
        // $("#r7").html((REGISTERFILE.registers[7]+'').toString(16));
        
        MUXpc.update([ID_EX.PC + 1 + ID_EX.operand0,MUXalu1.out,PROGRAMCOUNTER.value + 1],CTL3.MUXpc);
        PROGRAMCOUNTER.update();
        
        ticks++;
        if(ticks >= INSTRUCTION_MEMORY.length + 5){
            clearInterval(clock);
        }

        draw();
    }

    var clock;
    $("#run").click(function(){
        clock = setInterval(tick,1000);
    });
    $("#step").click(function(){
        tick();
    });
    $("#stop").click(function(){
        ticks = 0;
        clearInterval(clock);
    });

    // $("#program-counter").html((PROGRAMCOUNTER.value+'').toString(16));
    // $("#instruction-memory").html(INSTRUCTION_MEMORY.join('<br>'));
    //
    // $("#if-id .op").html(IF_ID.OP);
    // $("#if-id .rA").html(IF_ID.rA);
    // $("#if-id .rB").html(IF_ID.rB);
    // $("#if-id .imm").html(IF_ID.imm);
    // $("#if-id .rC").html(IF_ID.rC);
    // $("#if-id .pc").html((IF_ID.PC+'').toString(16));


});
