$(document).ready(function(){
    // Tick
    draw();
    var ticks = 0;
    function tick(){
        // Call stages backwards
        // writebackStage();
        // memoryStage();
        // executeStage();
        // decodeStage();
        // fetchStage();

        fetchStage();
        decodeStage();
        executeStage();
        memoryStage();
        writebackStage();
        
        MUXpc.update([ID_EX.PC_OUT + 1 + ID_EX.operand0_OUT,MUXalu1.out,PROGRAMCOUNTER.value + 1],CTL3.MUXpc);
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
});
